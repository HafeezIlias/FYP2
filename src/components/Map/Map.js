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
    });
    
    // Toggle all hikers button can be implemented here
    document.getElementById('toggle-all-hikers')?.addEventListener('click', () => {
      // Implement toggle functionality
      // For example, fit bounds to show all hikers
      this.fitToAllHikers();
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
    if (!this.hikers) return;
    
    const hiker = this.hikers.find(h => h.id === hikerId);
    if (hiker && this.map) {
      this.map.setView([hiker.lat, hiker.lon], 15);
      this.trackingHikerId = hikerId;
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
    this.map.setView(targetCenter, targetZoom);
  }

  /**
   * Fit the map to show all hikers
   */
  fitToAllHikers() {
    if (!this.hikers || this.hikers.length === 0) return;

    const bounds = L.latLngBounds(this.hikers.map(h => [h.lat, h.lon]));
    this.map.fitBounds(bounds, { padding: [50, 50] });
  }

  /**
   * Update the map with current hiker data
   * @param {Array} hikers - Array of hiker objects
   * @param {Function} onMarkerClick - Callback for marker click events
   */
  updateMap(hikers, onMarkerClick) {
    if (!this.map || !this.markerLayer) return;
    
    this.hikers = hikers;
    this.markerLayer.clearLayers();
    this.hikerMarkers = {};
    
    hikers.forEach(hiker => {
      // Create or update marker with enhanced label
      const marker = L.marker([hiker.lat, hiker.lon], {
        icon: this.createCustomMarkerIcon(hiker),
        zIndexOffset: hiker.sos ? 1000 : 0 // SOS markers on top
      }).addTo(this.markerLayer);
      
      if (onMarkerClick) {
        marker.on('click', () => onMarkerClick(hiker));
      }
      
      this.hikerMarkers[hiker.id] = marker;
    });
    
    // Follow tracked hiker if needed
    if (this.trackingHikerId !== null) {
      this.centerOnHiker(this.trackingHikerId);
    }
  }
}

export default MapComponent; 