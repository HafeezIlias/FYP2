/**
 * Map Component - Handles map display and interactions
 */
class MapComponent {
  /**
   * Initialize the Map component
   * @param {string} containerId - The ID of the container element
   * @param {Array} initialCenter - Initial [lat, lon] coordinates for map center
   * @param {number} initialZoom - Initial zoom level
   */
  constructor(containerId = 'map', initialCenter = [3.139, 101.6869], initialZoom = 12) {
    this.map = null;
    this.markerLayer = null;
    this.hikerMarkers = {};
    this.trackingHikerId = null;
    this.containerId = containerId;
    this.initialCenter = initialCenter;
    this.initialZoom = initialZoom;
    this.preserveCurrentView = true; // Add flag to preserve current view
  }

  /**
   * Initialize the map
   */
  init() {
    // Create the map
    this.map = L.map(this.containerId).setView(this.initialCenter, this.initialZoom);
    
    // Add the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Create a layer group for markers
    this.markerLayer = L.layerGroup().addTo(this.map);

    // Initialize map controls
    this.initControls();

    return this;
  }

  /**
   * Initialize map controls
   */
  initControls() {
    // Center map button
    document.getElementById('center-map')?.addEventListener('click', () => {
      this.centerMap();
      this.trackingHikerId = null;
      // View preservation is handled in centerMap method
    });
    
    // Toggle all hikers button can be implemented here
    document.getElementById('toggle-all-hikers')?.addEventListener('click', () => {
      this.fitToAllHikers();
      // View preservation is handled in fitToAllHikers method
    });
    
    // Add event listener to detect user-initiated map movements
    this.map.on('moveend', (e) => {
      // If this move was triggered by user interaction and not programmatically
      if (e.hard !== true) {
        // User has manually moved the map, so we should preserve their view
        this.preserveCurrentView = true;
        // Cancel any active tracking when user manually moves the map
        if (this.trackingHikerId !== null && e.target._zoom !== 15) {
          console.log('User moved map, canceling tracking');
          this.trackingHikerId = null;
        }
      }
    });
  }

  /**
   * Create a custom marker for a hiker
   * @param {Object} hiker - The hiker object
   * @returns {Object} Leaflet divIcon
   */
  createCustomMarkerIcon(hiker) {
    const sosClass = hiker.sos ? ' sos' : '';
    const handledClass = (hiker.sos && hiker.sosHandled) ? ' handled' : '';
    const emergencyClass = (hiker.sos && hiker.sosEmergencyDispatched) ? ' emergency' : '';
    
    let statusIcon = '';
    if (hiker.sos) {
      if (hiker.sosEmergencyDispatched) {
        statusIcon = '<i class="fas fa-ambulance sos-marker-icon"></i>';
      } else if (hiker.sosHandled) {
        statusIcon = '<i class="fas fa-check-circle sos-marker-icon"></i>';
      }
    }
    
    const markerHtml = `
      <div class="marker-label${sosClass}${handledClass}${emergencyClass}">
        ${hiker.name}
        ${statusIcon}
      </div>
      <div class="custom-marker${sosClass}${handledClass}${emergencyClass}"></div>
    `;
    
    return L.divIcon({
      html: markerHtml,
      className: 'hiker-marker-container',
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  }

  /**
   * Center the map on a specific hiker
   * @param {string|number} hikerId - The ID of the hiker to center on
   */
  centerOnHiker(hikerId) {
    if (!this.hikers) {
      console.warn('No hikers data available for centering');
      return;
    }
    
    const hiker = this.hikers.find(h => h.id === hikerId);
    if (!hiker) {
      console.warn(`Hiker with ID ${hikerId} not found`);
      return;
    }
    
    if (this.map) {
      try {
        const lat = parseFloat(hiker.lat);
        const lon = parseFloat(hiker.lon);
        
        if (isNaN(lat) || isNaN(lon)) {
          console.warn(`Invalid coordinates for hiker ${hikerId}:`, hiker.lat, hiker.lon);
          return;
        }
        
        console.log(`Centering map on hiker ${hikerId} at ${lat},${lon}`);
        this.preserveCurrentView = false; // Disable view preservation when explicitly centering
        this.map.setView([lat, lon], 15);
        this.trackingHikerId = hikerId;
        this.preserveCurrentView = true; // Re-enable view preservation after centering
      } catch (error) {
        console.error(`Error centering on hiker ${hikerId}:`, error);
      }
    }
  }

  /**
   * Center the map to its initial position or specified coordinates and zoom
   * @param {Array} [center] - Optional center coordinates [lat, lon]
   * @param {number} [zoom] - Optional zoom level
   */
  centerMap(center, zoom) {
    const targetCenter = center || this.initialCenter;
    const targetZoom = zoom || this.initialZoom;
    this.preserveCurrentView = false; // Disable view preservation for explicit center
    this.map.setView(targetCenter, targetZoom);
    this.trackingHikerId = null; // Stop tracking any hiker
    this.preserveCurrentView = true; // Re-enable view preservation
  }

  /**
   * Fit the map to show all hikers
   */
  fitToAllHikers() {
    if (!this.hikers || this.hikers.length === 0) {
      console.warn('No hikers data available for fitting bounds');
      return;
    }

    // Filter out hikers with invalid coordinates
    const validHikers = this.hikers.filter(h => {
      const lat = parseFloat(h.lat);
      const lon = parseFloat(h.lon);
      return !isNaN(lat) && !isNaN(lon);
    });
    
    if (validHikers.length === 0) {
      console.warn('No hikers with valid coordinates for fitting bounds');
      return;
    }

    try {
      const bounds = L.latLngBounds(validHikers.map(h => [parseFloat(h.lat), parseFloat(h.lon)]));
      console.log('Fitting map to bounds:', bounds);
      this.preserveCurrentView = false; // Disable view preservation for fitting bounds
      this.map.fitBounds(bounds, { padding: [50, 50] });
      this.preserveCurrentView = true; // Re-enable view preservation
    } catch (error) {
      console.error('Error fitting bounds to hikers:', error);
    }
  }

  /**
   * Update the map with current hiker data
   * @param {Array} hikers - Array of hiker objects
   * @param {Function} onMarkerClick - Callback for marker click events
   */
  updateMap(hikers, onMarkerClick) {
    if (!this.map || !this.markerLayer) {
      console.error('Map not initialized');
      return;
    }
    
    // Store current view before updating
    const currentCenter = this.map.getCenter();
    const currentZoom = this.map.getZoom();
    
    this.hikers = hikers;
    
    // Keep track of current hiker IDs
    const currentHikerIds = new Set();
    
    console.log('Updating map with hikers:', hikers);
    
    hikers.forEach(hiker => {
      // Ensure lat and lon are valid numbers
      const lat = parseFloat(hiker.lat);
      const lon = parseFloat(hiker.lon);
      
      // Skip invalid coordinates
      if (isNaN(lat) || isNaN(lon)) {
        console.warn(`Invalid coordinates for hiker ${hiker.id}:`, hiker.lat, hiker.lon);
        return;
      }
      
      currentHikerIds.add(hiker.id);
      
      // Check if marker already exists
      const existingMarker = this.hikerMarkers[hiker.id];
      
      if (existingMarker) {
        // Update existing marker position and icon
        existingMarker.setLatLng([lat, lon]);
        existingMarker.setIcon(this.createCustomMarkerIcon(hiker));
        existingMarker.setZIndexOffset(hiker.sos ? 1000 : 0);
      } else {
        // Create new marker
        console.log(`Creating marker for ${hiker.id} at ${lat},${lon}`);
        
        try {
          const marker = L.marker([lat, lon], {
            icon: this.createCustomMarkerIcon(hiker),
            zIndexOffset: hiker.sos ? 1000 : 0 // SOS markers on top
          }).addTo(this.markerLayer);
          
          if (onMarkerClick) {
            marker.on('click', () => onMarkerClick(hiker));
          }
          
          this.hikerMarkers[hiker.id] = marker;
        } catch (error) {
          console.error(`Error creating marker for hiker ${hiker.id}:`, error);
        }
      }
    });
    
    // Remove markers for hikers that no longer exist
    Object.keys(this.hikerMarkers).forEach(hikerId => {
      if (!currentHikerIds.has(Number(hikerId)) && !currentHikerIds.has(hikerId)) {
        this.markerLayer.removeLayer(this.hikerMarkers[hikerId]);
        delete this.hikerMarkers[hikerId];
      }
    });
    
    // Only adjust view if we're not preserving the current view
    if (!this.preserveCurrentView) {
      // If we have at least one hiker, fit bounds if no tracking
      if (hikers.length > 0 && this.trackingHikerId === null) {
        try {
          this.fitToAllHikers();
        } catch (error) {
          console.error('Error fitting bounds to hikers:', error);
        }
      }
      
      // Follow tracked hiker if needed
      if (this.trackingHikerId !== null) {
        this.centerOnHiker(this.trackingHikerId);
      }
    } else if (currentCenter && currentZoom) {
      // Restore previous view if preserving
      this.map.setView(currentCenter, currentZoom, { animate: false });
    }
  }

  /**
   * Get the map instance
   * @returns {Object} The Leaflet map instance
   */
  getMap() {
    return this.map;
  }

  /**
   * Get a hiker marker by ID
   * @param {string|number} hikerId - The ID of the hiker
   * @returns {Object|null} The Leaflet marker or null if not found
   */
  getHikerMarker(hikerId) {
    return this.hikerMarkers?.[hikerId] || null;
  }
}

export default MapComponent; 