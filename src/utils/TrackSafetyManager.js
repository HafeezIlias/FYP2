/**
 * TrackSafetyManager - Utility for creating and managing hiking tracks with safety corridors
 * Allows admins to define safe paths and monitor if hikers stay within acceptable distance
 */
class TrackSafetyManager {
  /**
   * Initialize the Track Safety Manager
   * @param {Object} map - Reference to the map object for visualization
   */
  constructor(map = null) {
    this.map = map;
    this.tracks = [];
    this.activeTrackId = null;
    this.isCreatingTrack = false;
    this.tempTrackPoints = [];
    this.saveCallback = null;
    
    // Load saved tracks from localStorage if available
    this.loadTracks();
  }

  /**
   * Set the map reference for visualization
   * @param {Object} map - The map object
   */
  setMap(map) {
    this.map = map;
    this.displayAllTracks();
  }

  /**
   * Start creating a new track
   * @param {Function} saveCallback - Called when track is saved
   */
  startTrackCreation(saveCallback = null) {
    this.isCreatingTrack = true;
    this.tempTrackPoints = [];
    this.saveCallback = saveCallback;
    
    if (this.map) {
      // Change cursor to indicate track creation mode
      // Leaflet doesn't have getCanvas() like Mapbox GL
      // Instead, we'll modify the container's style or add a class
      const mapContainer = this.map.getContainer();
      if (mapContainer) {
        mapContainer.style.cursor = 'crosshair';
      }
      
      // Add click listener for adding track points
      this.map.on('click', this.handleMapClick.bind(this));
    }
    
    return this;
  }

  /**
   * Handle map click during track creation
   * @param {Object} e - Click event
   */
  handleMapClick(e) {
    if (!this.isCreatingTrack) return;
    
    // Get clicked coordinates - use Leaflet's e.latlng instead of Mapbox's e.lngLat
    const point = [e.latlng.lng, e.latlng.lat];
    this.tempTrackPoints.push(point);
    
    // Visualize current track being created
    this.displayTempTrack();
    
    // Show a temporary marker at the clicked point for feedback
    this.showTemporaryMarker(point);
  }

  /**
   * Show a temporary marker at a clicked point
   * @param {Array} point - [lng, lat] coordinates
   */
  showTemporaryMarker(point) {
    if (!this.map) return;
    
    // Create a pulsing marker at the clicked point
    const marker = L.circleMarker(
      [point[1], point[0]], // Convert [lng, lat] to [lat, lng] for Leaflet
      {
        radius: 8,
        fillColor: '#ffcc00',
        color: 'white',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.8
      }
    ).addTo(this.map);
    
    // Create pulsing effect by changing radius
    let size = 8;
    let growing = false;
    
    const pulseInterval = setInterval(() => {
      if (growing) {
        size += 1;
        if (size >= 15) growing = false;
      } else {
        size -= 1;
        if (size <= 8) growing = true;
      }
      
      marker.setRadius(size);
    }, 50);
    
    // Remove the marker after 1 second
    setTimeout(() => {
      clearInterval(pulseInterval);
      this.map.removeLayer(marker);
    }, 1000);
  }

  /**
   * Display the temporary track being created
   */
  displayTempTrack() {
    if (!this.map || this.tempTrackPoints.length < 1) return;
    
    // Remove existing temp track layer if exists
    if (this.tempTrackLayer) {
      this.map.removeLayer(this.tempTrackLayer);
    }
    
    // Create polyline for the temp track
    this.tempTrackLayer = L.polyline(
      this.tempTrackPoints.map(point => [point[1], point[0]]), // Convert [lng, lat] to [lat, lng] for Leaflet
      {
        color: '#00bfff',
        weight: 4,
        opacity: 0.8,
        dashArray: '5, 10'
      }
    ).addTo(this.map);
    
    // Remove existing waypoint markers
    if (this.tempMarkers) {
      this.tempMarkers.forEach(marker => {
        this.map.removeLayer(marker);
      });
    }
    
    // Create array for temporary markers
    this.tempMarkers = [];
    
    // Add points for each waypoint
    this.tempTrackPoints.forEach((point, index) => {
      const marker = L.circleMarker(
        [point[1], point[0]], // Convert [lng, lat] to [lat, lng] for Leaflet
        {
          radius: 6,
          fillColor: '#ffffff',
          color: '#00bfff',
          weight: 2,
          opacity: 1,
          fillOpacity: 1
        }
      ).addTo(this.map);
      
      this.tempMarkers.push(marker);
    });
  }

  /**
   * Save the current track being created
   * @param {string} name - Name of the track
   * @param {number} safetyWidth - Width of the safety corridor in meters
   * @param {string} description - Description of the track
   */
  saveTrack(name, safetyWidth, description = '') {
    if (this.tempTrackPoints.length < 2) {
      console.warn('Cannot save track with less than 2 points');
      return false;
    }
    
    const trackId = `track_${Date.now()}`;
    const newTrack = {
      id: trackId,
      name,
      description,
      safetyWidth,
      points: this.tempTrackPoints,
      createdAt: new Date().toISOString()
    };
    
    this.tracks.push(newTrack);
    this.saveTracks();
    this.displayTrack(newTrack);
    
    // Reset track creation
    this.isCreatingTrack = false;
    this.tempTrackPoints = [];
    
    // Remove temp track visualization
    if (this.map) {
      // Reset cursor style
      const mapContainer = this.map.getContainer();
      if (mapContainer) {
        mapContainer.style.cursor = '';
      }
      
      this.map.off('click', this.handleMapClick.bind(this));
      
      // Remove temporary track layer
      if (this.tempTrackLayer) {
        this.map.removeLayer(this.tempTrackLayer);
        this.tempTrackLayer = null;
      }
      
      // Remove temporary markers
      if (this.tempMarkers && this.tempMarkers.length > 0) {
        this.tempMarkers.forEach(marker => {
          this.map.removeLayer(marker);
        });
        this.tempMarkers = [];
      }
    }
    
    // Call save callback if provided
    if (this.saveCallback) {
      this.saveCallback(newTrack);
      this.saveCallback = null;
    }
    
    return trackId;
  }

  /**
   * Cancel track creation
   */
  cancelTrackCreation() {
    this.isCreatingTrack = false;
    this.tempTrackPoints = [];
    
    // Remove temp track visualization
    if (this.map) {
      // Reset cursor style
      const mapContainer = this.map.getContainer();
      if (mapContainer) {
        mapContainer.style.cursor = '';
      }
      
      this.map.off('click', this.handleMapClick.bind(this));
      
      // Remove temporary track layer
      if (this.tempTrackLayer) {
        this.map.removeLayer(this.tempTrackLayer);
        this.tempTrackLayer = null;
      }
      
      // Remove temporary markers
      if (this.tempMarkers && this.tempMarkers.length > 0) {
        this.tempMarkers.forEach(marker => {
          this.map.removeLayer(marker);
        });
        this.tempMarkers = [];
      }
    }
    
    this.saveCallback = null;
  }

  /**
   * Display a single track on the map
   * @param {Object} track - Track object to display
   */
  displayTrack(track) {
    if (!this.map || !track || track.points.length < 2) return;
    
    // Clean up existing track elements if present
    if (track.elements) {
      if (track.elements.trackLine) this.map.removeLayer(track.elements.trackLine);
      if (track.elements.corridor) this.map.removeLayer(track.elements.corridor);
      if (track.elements.waypoints) {
        track.elements.waypoints.forEach(marker => this.map.removeLayer(marker));
      }
    }
    
    // Initialize track elements object
    track.elements = {
      waypoints: []
    };
    
    // Create the track polyline
    track.elements.trackLine = L.polyline(
      track.points.map(point => [point[1], point[0]]), // Convert [lng, lat] to [lat, lng] for Leaflet
      {
        color: '#3388ff',
        weight: 4,
        opacity: 0.8
      }
    ).addTo(this.map);
    
    // Create a safety corridor around the track
    const corridorPoints = this.createCorridorPolygon(track.points, track.safetyWidth);
    
    track.elements.corridor = L.polygon(
      corridorPoints.map(point => [point[1], point[0]]), // Convert [lng, lat] to [lat, lng] for Leaflet
      {
        color: '#3388ff',
        weight: 1,
        opacity: 0.4,
        fillColor: '#3388ff',
        fillOpacity: 0.2
      }
    ).addTo(this.map);
    
    // Add waypoint markers
    track.points.forEach((point, index) => {
      // Only add markers for first, last, and every 3rd point to avoid clutter
      if (index === 0 || index === track.points.length - 1 || index % 3 === 0) {
        const color = index === 0 ? '#00ff00' : 
                     index === track.points.length - 1 ? '#ff0000' : '#3388ff';
        
        const marker = L.circleMarker(
          [point[1], point[0]], // Convert [lng, lat] to [lat, lng] for Leaflet
          {
            radius: 5,
            fillColor: color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 1
          }
        ).addTo(this.map);
        
        track.elements.waypoints.push(marker);
      }
    });
  }

  /**
   * Create a corridor polygon around a track line with the specified width
   * @param {Array} points - Array of [lng, lat] coordinates defining the track
   * @param {number} width - Width of the corridor in meters
   * @returns {Array} Array of corridor points forming a polygon
   */
  createCorridorPolygon(points, widthMeters) {
    if (points.length < 2) return [];
    
    // Convert width from meters to approximate degrees
    // This is a simplification and not accurate for all latitudes
    // For a production app, you would use a proper geospatial library
    const lat = points[0][1]; // Use the latitude of the first point
    // Approximate conversion at this latitude (rough estimate)
    const metersPerDegreeLat = 111320; // approximate meters per degree latitude
    const metersPerDegreeLng = 111320 * Math.cos(lat * Math.PI / 180);
    
    const widthLat = widthMeters / metersPerDegreeLat;
    const widthLng = widthMeters / metersPerDegreeLng;
    
    // For each segment, calculate perpendicular offset points
    const corridorPoints = [];
    
    // Generate left side of corridor (going forward)
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      
      // Calculate perpendicular direction (90 degrees to track direction)
      const dx = p2[0] - p1[0];
      const dy = p2[1] - p1[1];
      const length = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize and rotate 90 degrees
      const perpX = -dy / length;
      const perpY = dx / length;
      
      // Add offset point to left side
      corridorPoints.push([
        p1[0] + perpX * widthLng,
        p1[1] + perpY * widthLat
      ]);
    }
    
    // Add last point offset
    const lastIdx = points.length - 1;
    const secondLastIdx = points.length - 2;
    const dx = points[lastIdx][0] - points[secondLastIdx][0];
    const dy = points[lastIdx][1] - points[secondLastIdx][1];
    const length = Math.sqrt(dx * dx + dy * dy);
    const perpX = -dy / length;
    const perpY = dx / length;
    
    corridorPoints.push([
      points[lastIdx][0] + perpX * widthLng,
      points[lastIdx][1] + perpY * widthLat
    ]);
    
    // Generate right side of corridor (going backward)
    for (let i = points.length - 1; i > 0; i--) {
      const p1 = points[i];
      const p2 = points[i - 1];
      
      const dx = p1[0] - p2[0];
      const dy = p1[1] - p2[1];
      const length = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize and rotate -90 degrees
      const perpX = dy / length;
      const perpY = -dx / length;
      
      // Add offset point to right side
      corridorPoints.push([
        p1[0] + perpX * widthLng,
        p1[1] + perpY * widthLat
      ]);
    }
    
    // Close the polygon
    corridorPoints.push(corridorPoints[0]);
    
    return corridorPoints;
  }

  /**
   * Display all tracks on the map
   */
  displayAllTracks() {
    if (!this.map) return;
    
    // Clear existing track layers
    this.clearTrackLayers();
    
    // Display each track
    this.tracks.forEach(track => {
      this.displayTrack(track);
    });
  }

  /**
   * Clear all track layers from the map
   */
  clearTrackLayers() {
    if (!this.map) return;
    
    this.tracks.forEach(track => {
      if (track.elements) {
        if (track.elements.trackLine) this.map.removeLayer(track.elements.trackLine);
        if (track.elements.corridor) this.map.removeLayer(track.elements.corridor);
        if (track.elements.waypoints) {
          track.elements.waypoints.forEach(marker => this.map.removeLayer(marker));
        }
      }
    });
  }

  /**
   * Edit an existing track
   * @param {string} trackId - ID of the track to edit
   * @param {Function} saveCallback - Called when track is saved
   */
  editTrack(trackId, saveCallback = null) {
    const trackIndex = this.tracks.findIndex(t => t.id === trackId);
    if (trackIndex === -1) return false;
    
    this.activeTrackId = trackId;
    this.isCreatingTrack = true;
    this.tempTrackPoints = [...this.tracks[trackIndex].points];
    this.saveCallback = saveCallback;
    
    // Display current track points for editing
    this.displayTempTrack();
    
    if (this.map) {
      // Change cursor to indicate track creation mode
      const mapContainer = this.map.getContainer();
      if (mapContainer) {
        mapContainer.style.cursor = 'crosshair';
      }
      
      this.map.on('click', this.handleMapClick.bind(this));
    }
    
    return true;
  }

  /**
   * Delete a track
   * @param {string} trackId - ID of the track to delete
   */
  deleteTrack(trackId) {
    const trackIndex = this.tracks.findIndex(t => t.id === trackId);
    if (trackIndex === -1) return false;
    
    const track = this.tracks[trackIndex];
    
    // Remove track visualization from map
    if (this.map && track.elements) {
      if (track.elements.trackLine) this.map.removeLayer(track.elements.trackLine);
      if (track.elements.corridor) this.map.removeLayer(track.elements.corridor);
      if (track.elements.waypoints) {
        track.elements.waypoints.forEach(marker => this.map.removeLayer(marker));
      }
    }
    
    // Remove track from array
    this.tracks.splice(trackIndex, 1);
    
    // Save updated tracks
    this.saveTracks();
    
    return true;
  }

  /**
   * Save tracks to localStorage
   */
  saveTracks() {
    try {
      localStorage.setItem('hikerTrackerTracks', JSON.stringify(this.tracks));
    } catch (error) {
      console.error('Error saving tracks to localStorage:', error);
    }
  }

  /**
   * Load tracks from localStorage
   */
  loadTracks() {
    try {
      const savedTracks = localStorage.getItem('hikerTrackerTracks');
      if (savedTracks) {
        this.tracks = JSON.parse(savedTracks);
      }
    } catch (error) {
      console.error('Error loading tracks from localStorage:', error);
      this.tracks = [];
    }
  }

  /**
   * Check if a hiker is within a safe corridor of any track
   * @param {Object} hikerPosition - {lng, lat} object of hiker position
   * @returns {Object} Result with safety information
   */
  checkHikerSafety(hikerPosition) {
    if (!hikerPosition || this.tracks.length === 0) {
      return {
        isOnTrack: false,
        trackId: null,
        trackName: null,
        distanceFromTrack: Infinity,
        isSafe: false
      };
    }
    
    let closestTrackInfo = null;
    let minDistance = Infinity;
    
    // Check distance to each track
    this.tracks.forEach(track => {
      const trackInfo = this.getDistanceToTrack(hikerPosition, track);
      
      if (trackInfo.distance < minDistance) {
        minDistance = trackInfo.distance;
        closestTrackInfo = {
          trackId: track.id,
          trackName: track.name,
          distanceFromTrack: trackInfo.distance,
          closestPointIndex: trackInfo.segmentIndex,
          isOnTrack: trackInfo.distance <= track.safetyWidth,
          isSafe: trackInfo.distance <= track.safetyWidth
        };
      }
    });
    
    if (!closestTrackInfo) {
      return {
        isOnTrack: false,
        trackId: null,
        trackName: null,
        distanceFromTrack: Infinity,
        isSafe: false
      };
    }
    
    return closestTrackInfo;
  }

  /**
   * Calculate minimum distance from a point to a track
   * @param {Object} point - {lng, lat} object
   * @param {Object} track - Track object
   * @returns {Object} Distance information
   */
  getDistanceToTrack(point, track) {
    if (!point || !track || !track.points || track.points.length < 2) {
      return { distance: Infinity, segmentIndex: -1 };
    }
    
    let minDistance = Infinity;
    let closestSegmentIndex = -1;
    
    // Check each segment of the track
    for (let i = 0; i < track.points.length - 1; i++) {
      const segmentStart = track.points[i];
      const segmentEnd = track.points[i + 1];
      
      const distance = this.distanceToSegment(
        point.lng, point.lat,
        segmentStart[0], segmentStart[1],
        segmentEnd[0], segmentEnd[1]
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestSegmentIndex = i;
      }
    }
    
    // Convert approximate degrees to meters (rough estimate)
    // For a production app, use a proper geospatial library
    const lat = point.lat;
    const metersPerDegreeLat = 111320; // approximate meters per degree latitude
    const metersPerDegreeLng = 111320 * Math.cos(lat * Math.PI / 180);
    
    // Average conversion factor for simplicity
    const avgFactor = (metersPerDegreeLat + metersPerDegreeLng) / 2;
    const distanceMeters = minDistance * avgFactor;
    
    return {
      distance: distanceMeters,
      segmentIndex: closestSegmentIndex
    };
  }

  /**
   * Calculate minimum distance from a point to a line segment
   * @param {number} px - Point x coordinate
   * @param {number} py - Point y coordinate
   * @param {number} x1 - Line segment start x
   * @param {number} y1 - Line segment start y
   * @param {number} x2 - Line segment end x
   * @param {number} y2 - Line segment end y
   * @returns {number} Distance
   */
  distanceToSegment(px, py, x1, y1, x2, y2) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    
    if (len_sq !== 0) {
      param = dot / len_sq;
    }
    
    let xx, yy;
    
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
    
    const dx = px - xx;
    const dy = py - yy;
    
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Get all tracks
   * @returns {Array} All tracks
   */
  getAllTracks() {
    return this.tracks;
  }

  /**
   * Get a track by ID
   * @param {string} trackId - ID of the track
   * @returns {Object} Track object or null if not found
   */
  getTrackById(trackId) {
    return this.tracks.find(t => t.id === trackId) || null;
  }
}

export default TrackSafetyManager; 