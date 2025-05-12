/**
 * Track Safety Module - Integrates track safety features into the application
 */
import TrackSafetyManager from '../utils/TrackSafetyManager';
import TrackSafetySettings from '../components/Settings/TrackSafetySettings';

class TrackSafetyModule {
  /**
   * Initialize the Track Safety Module
   * @param {Object} app - Reference to the main application
   * @param {Object} map - Reference to the map component
   * @param {Object} hikerManager - Reference to the hiker manager
   * @param {Object} notificationManager - Reference to the notification manager
   */
  constructor(app, map, hikerManager, notificationManager) {
    this.app = app;
    this.map = map;
    this.hikerManager = hikerManager;
    this.notificationManager = notificationManager;
    
    // Initialize the track safety manager
    this.trackManager = new TrackSafetyManager(map?.getMap());
    
    // Initialize track safety settings component
    this.safetySettings = new TrackSafetySettings(this.trackManager, map?.getMap());
    
    // Initialize track safety state
    this.enabled = true;
    this.highlightUnsafeHikers = true;
    this.trackDeviationThreshold = 50;
    this.trackDeviationNotificationsEnabled = true;
    
    // Store references to hikers that are off track
    this.offTrackHikers = new Set();
    
    // Bind methods
    this.updateHikerSafety = this.updateHikerSafety.bind(this);
    this.setEnabled = this.setEnabled.bind(this);
  }
  
  /**
   * Initialize the module
   */
  init() {
    // Initialize track safety settings UI
    this.safetySettings.init();
    
    // Start monitoring hikers if enabled
    if (this.enabled) {
      this.startMonitoring();
    }
    
    // Set up hook for when hikers are updated
    if (this.hikerManager) {
      this.hikerManager.onHikersUpdated(this.checkAllHikersSafety.bind(this));
    }
    
    return this;
  }
  
  /**
   * Set map reference for visualization
   * @param {Object} map - Map component
   */
  setMap(map) {
    this.map = map;
    const mapObject = map?.getMap();
    
    // Update map references in child components
    this.trackManager.setMap(mapObject);
    this.safetySettings.setMap(mapObject);
  }
  
  /**
   * Enable or disable track safety
   * @param {boolean} enabled - Whether track safety is enabled
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    
    if (enabled) {
      this.startMonitoring();
    } else {
      this.stopMonitoring();
    }
  }
  
  /**
   * Set whether to highlight unsafe hikers on the map
   * @param {boolean} highlight - Whether to highlight unsafe hikers
   */
  setHighlightUnsafeHikers(highlight) {
    this.highlightUnsafeHikers = highlight;
    
    // Update hikers' visual state if needed
    if (this.hikerManager) {
      if (highlight) {
        // Apply highlighting to all currently off-track hikers
        this.offTrackHikers.forEach(hikerId => {
          const marker = this.hikerManager.getHikerMarker(hikerId);
          if (marker) {
            this.highlightHikerMarker(marker);
          }
        });
      } else {
        // Remove highlighting from all hikers
        this.offTrackHikers.forEach(hikerId => {
          const marker = this.hikerManager.getHikerMarker(hikerId);
          if (marker) {
            this.resetHikerMarker(marker);
          }
        });
      }
    }
  }
  
  /**
   * Set the track deviation threshold for notifications
   * @param {number} threshold - Threshold in meters
   */
  setTrackDeviationThreshold(threshold) {
    this.trackDeviationThreshold = threshold;
  }
  
  /**
   * Enable or disable track deviation notifications
   * @param {boolean} enabled - Whether track deviation notifications are enabled
   */
  setTrackDeviationNotifications(enabled) {
    this.trackDeviationNotificationsEnabled = enabled;
  }
  
  /**
   * Apply settings from the settings component
   * @param {Object} settings - Settings object
   */
  applySettings(settings) {
    if (settings) {
      // Apply safety settings
      this.setEnabled(settings.safety?.enableTrackSafety ?? true);
      this.setHighlightUnsafeHikers(settings.safety?.highlightUnsafeHikers ?? true);
      
      // Apply notification settings
      this.setTrackDeviationNotifications(settings.notifications?.trackDeviationAlerts ?? true);
      this.setTrackDeviationThreshold(settings.notifications?.trackDeviationThreshold ?? 50);
    }
  }
  
  /**
   * Start monitoring hikers for track safety
   */
  startMonitoring() {
    // Check all current hikers initially
    this.checkAllHikersSafety();
  }
  
  /**
   * Stop monitoring hikers for track safety
   */
  stopMonitoring() {
    // Remove all highlights if we're disabling monitoring
    if (this.highlightUnsafeHikers && this.hikerManager) {
      this.offTrackHikers.forEach(hikerId => {
        const marker = this.hikerManager.getHikerMarker(hikerId);
        if (marker) {
          this.resetHikerMarker(marker);
        }
      });
    }
    
    this.offTrackHikers.clear();
  }
  
  /**
   * Check all hikers' safety
   */
  checkAllHikersSafety() {
    if (!this.enabled || !this.hikerManager) return;
    
    const hikers = this.hikerManager.getAllHikers();
    
    hikers.forEach(hiker => {
      this.updateHikerSafety(hiker);
    });
  }
  
  /**
   * Update a hiker's safety status
   * @param {Object} hiker - Hiker object
   */
  updateHikerSafety(hiker) {
    if (!this.enabled || !hiker || !hiker.id || !hiker.position) return;
    
    // Check if the hiker is within a safe track
    const safetyInfo = this.trackManager.checkHikerSafety({
      lng: hiker.position.longitude,
      lat: hiker.position.latitude
    });
    
    // Update hiker's safety status
    hiker.safety = {
      isOnTrack: safetyInfo.isOnTrack,
      trackId: safetyInfo.trackId,
      trackName: safetyInfo.trackName,
      distanceFromTrack: safetyInfo.distanceFromTrack,
      isSafe: safetyInfo.isSafe
    };
    
    // Handle unsafe hikers
    if (!safetyInfo.isOnTrack) {
      this.handleUnsafeHiker(hiker, safetyInfo);
    } else if (this.offTrackHikers.has(hiker.id)) {
      // Hiker returned to track - reset their state
      this.handleHikerReturnedToTrack(hiker);
    }
  }
  
  /**
   * Handle a hiker that is off track
   * @param {Object} hiker - Hiker object
   * @param {Object} safetyInfo - Safety information
   */
  handleUnsafeHiker(hiker, safetyInfo) {
    // Check if the hiker is already known to be off track
    const isNewlyOffTrack = !this.offTrackHikers.has(hiker.id);
    
    // Add to set of off-track hikers
    this.offTrackHikers.add(hiker.id);
    
    // Apply visual highlighting if enabled
    if (this.highlightUnsafeHikers) {
      const marker = this.hikerManager.getHikerMarker(hiker.id);
      if (marker) {
        this.highlightHikerMarker(marker);
      }
    }
    
    // Send notification if enabled and deviation exceeds threshold
    if (isNewlyOffTrack && 
        this.trackDeviationNotificationsEnabled && 
        safetyInfo.distanceFromTrack > this.trackDeviationThreshold && 
        this.notificationManager) {
      
      this.notificationManager.notify({
        title: `${hiker.name} Off Track`,
        message: `${hiker.name} has deviated ${Math.round(safetyInfo.distanceFromTrack)}m from the designated track`,
        type: 'warning',
        icon: 'exclamation-triangle',
        autoClose: 7000,
        data: {
          hikerId: hiker.id,
          distanceFromTrack: safetyInfo.distanceFromTrack,
          trackId: safetyInfo.trackId
        }
      });
    }
  }
  
  /**
   * Handle a hiker that has returned to track
   * @param {Object} hiker - Hiker object
   */
  handleHikerReturnedToTrack(hiker) {
    // Remove from set of off-track hikers
    this.offTrackHikers.delete(hiker.id);
    
    // Reset visual styling
    if (this.highlightUnsafeHikers) {
      const marker = this.hikerManager.getHikerMarker(hiker.id);
      if (marker) {
        this.resetHikerMarker(marker);
      }
    }
    
    // Send a notification if notifications are enabled
    if (this.trackDeviationNotificationsEnabled && this.notificationManager) {
      this.notificationManager.notify({
        title: `${hiker.name} Returned to Track`,
        message: `${hiker.name} is now back on a designated safe track`,
        type: 'success',
        icon: 'check-circle',
        autoClose: 5000,
        data: {
          hikerId: hiker.id
        }
      });
    }
  }
  
  /**
   * Highlight a hiker marker to indicate it's off track
   * @param {Object} marker - Leaflet marker object
   */
  highlightHikerMarker(marker) {
    if (!marker) return;
    
    // Add a pulsing effect to the marker
    const icon = marker.getIcon();
    const element = marker.getElement();
    
    if (element) {
      // Add off-track class for styling
      element.classList.add('off-track-hiker');
      
      // If it's using a div icon, we can modify its inner HTML
      if (element.querySelector('.hiker-marker')) {
        const markerContent = element.querySelector('.hiker-marker');
        if (markerContent) {
          // Add a warning border
          markerContent.style.border = '2px solid #ff8c00';
          markerContent.style.boxShadow = '0 0 10px rgba(255, 140, 0, 0.7)';
        }
      }
    }
  }
  
  /**
   * Reset a hiker marker to normal appearance
   * @param {Object} marker - Leaflet marker object
   */
  resetHikerMarker(marker) {
    if (!marker) return;
    
    const element = marker.getElement();
    
    if (element) {
      // Remove off-track class
      element.classList.remove('off-track-hiker');
      
      // Reset custom styling
      if (element.querySelector('.hiker-marker')) {
        const markerContent = element.querySelector('.hiker-marker');
        if (markerContent) {
          markerContent.style.border = '';
          markerContent.style.boxShadow = '';
        }
      }
    }
  }
  
  /**
   * Add necessary CSS styles for track safety
   */
  addStyles() {
    if (document.getElementById('track-safety-module-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'track-safety-module-styles';
    style.textContent = `
      .off-track-hiker {
        animation: pulse 1.5s infinite;
        z-index: 1000 !important;
      }
      
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Get the track safety manager
   * @returns {TrackSafetyManager}
   */
  getTrackManager() {
    return this.trackManager;
  }
  
  /**
   * Get the track safety settings component
   * @returns {TrackSafetySettings}
   */
  getSettingsComponent() {
    return this.safetySettings;
  }
}

export default TrackSafetyModule; 