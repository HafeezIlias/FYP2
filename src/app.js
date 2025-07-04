/**
 * Main Application - Coordinates all components
 */
// Using centralized imports - Next.js style
import { 
  createSampleHikers, 
  createSampleTowers,
  fetchHikersFromFirebase, 
  listenForHikersUpdates, 
  updateHikerSosStatus, 
  updateNodeName 
} from './utils/index.js';

import {
  MapComponent,
  SidebarComponent,
  ModalComponent,
  TowerModalComponent,
  SettingsComponent,
  TowerManager,
  TowerControls
} from './components/index.js';

import { TrackSafetyModule } from './modules/index.js';

class HikerTrackingApp {
  constructor() {
    this.hikers = [];
    this.towers = [];
    this.map = new MapComponent();
    this.sidebar = new SidebarComponent();
    this.modal = new ModalComponent();
    this.towerModal = new TowerModalComponent();
    this.settings = new SettingsComponent();
    this.trackSafetyModule = null; // Will be initialized in init()
    this.towerManager = new TowerManager();
    this.towerControls = null; // Will be initialized in init()
    this.simulationInterval = null;
    this.simulationSpeed = 3000; // 3 seconds instead of 1 second
    this.defaultCenter = [3.139, 101.6869];
    this.defaultZoom = 12;
    this.mapStyles = {
      default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    };
    this.settingsBtnId = 'settings-btn';
    this.isUsingLiveData = true; // Flag to indicate if using live data
    this.firebaseUnsubscribe = null; // Function to unsubscribe from Firebase updates
  }

  /**
   * Initialize the application
   */
  async init() {
    // Initialize settings component first to load saved preferences
    this.settings.init({
      // Add callback for simulation toggle
      onSimulationToggle: (isEnabled) => {
        this.handleSimulationToggle(isEnabled);
      },
      // Callback for simulation speed change
      onSimulationSpeedChange: (speed) => {
        this.setSimulationSpeed(speed);
      },
      // Callback for hikers count change
      onHikersCountChange: (count) => {
        if (!this.isUsingLiveData) {
          this.restartSimulation(count);
        }
      },
      // Map style change
      onMapStyleChange: (style) => {
        this.changeMapStyle(style);
      },
      // Zoom change
      onZoomChange: (zoom) => {
        this.defaultZoom = zoom;
        this.map.centerMap(this.defaultCenter, zoom);
      },
      // Track safety settings change
      onTrackSafetyChange: (enabled) => {
        if (this.trackSafetyModule) {
          this.trackSafetyModule.setEnabled(enabled);
        }
      },
      // Settings changed callback
      onSettingsChanged: (settings) => {
        if (this.trackSafetyModule) {
          this.trackSafetyModule.applySettings(settings);
        }
      }
    });
    
    // Setup settings button click event
    const settingsBtn = document.getElementById(this.settingsBtnId);
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        this.settings.openSettingsModal();
      });
    }
    
    // Apply initial settings
    const initialSettings = this.settings.getSettings();
    
    // Initialize map component with settings
    this.defaultZoom = initialSettings.map.defaultZoom;
    this.map.init();
    this.changeMapStyle(initialSettings.map.style);
    
    // Initialize sidebar component
    this.sidebar.init(
      // Hiker click callback
      (hiker) => {
        this.handleHikerClick(hiker);
      },
      // Tower click callback
      (tower) => {
        this.handleTowerClick(tower);
      },
      // Settings click callback
      () => {
        this.settings.openModal();
      }
    );
    
    // Initialize modal component
    this.modal.init(
      // Track hiker callback
      (hikerId) => {
        this.map.centerOnHiker(hikerId);
        this.map.trackingHikerId = hikerId;
      },
      // Send message callback
      (hikerId) => {
        alert('Messaging functionality is coming soon!');
      },
      // Mark SOS as handled callback
      (hikerId) => {
        this.handleSosAction(hikerId, 'handled');
      },
      // Mark emergency services dispatched callback
      (hikerId) => {
        this.handleSosAction(hikerId, 'emergency');
      },
      // Reset SOS callback
      (hikerId) => {
        this.handleSosAction(hikerId, 'reset');
      }
    );

    // Initialize tower modal component
    this.towerModal.init(
      // Connect hikers callback
      (towerId) => {
        this.handleTowerConnectHikers(towerId);
      },
      // View coverage callback
      (towerId) => {
        this.handleTowerViewCoverage(towerId);
      }
    );

    // Initialize tower controls for adding towers
    this.towerControls = new TowerControls(this.towerManager, this.map);
    this.towerControls.init();

    // Set up tower manager update callback
    this.towerManager.onUpdate((towers) => {
      this.towers = towers;
      this.renderAll();
    });
    
    // Initialize track safety module
    this.trackSafetyModule = new TrackSafetyModule(
      this,
      this.map,
      {
        getAllHikers: () => this.hikers,
        getHikerMarker: (hikerId) => this.map.getHikerMarker(hikerId),
        onHikersUpdated: (callback) => {
          this.hikerUpdateCallbacks = this.hikerUpdateCallbacks || [];
          this.hikerUpdateCallbacks.push(callback);
        }
      },
      {
        notify: (notification) => {
          this.settings.showNotification(
            notification.message,
            notification.type,
            notification.autoClose,
            notification.icon
          );
        }
      }
    );
    
    // Initialize track safety module and apply settings
    this.trackSafetyModule.init();
    this.trackSafetyModule.addStyles();
    this.trackSafetyModule.applySettings(initialSettings);
    
    // Set simulation speed from settings
    this.simulationSpeed = initialSettings.simulation.speed;
    
    // Check if simulation is enabled
    const isSimulationEnabled = initialSettings.simulation.enabled;
    this.isUsingLiveData = !isSimulationEnabled;
    
    // Load the appropriate data based on settings
    await this.loadData(isSimulationEnabled);
    
    // Render initial state
    this.renderAll();
    
    return this;
  }

  /**
   * Load data based on current mode (live or simulation)
   * @param {boolean} useSimulation - Whether to use simulated data
   */
  async loadData(useSimulation) {
    if (useSimulation) {
      // Use simulated data
      const settings = this.settings.getSettings();
      this.hikers = await createSampleHikers(settings.simulation.hikersCount || 10);
      const sampleTowers = await createSampleTowers(3); // Create 3 sample towers/basecamps
      this.towerManager.loadTowers(sampleTowers);
      
      // Start simulation
      this.startSimulation();
      
      this.settings.showNotification('Using simulated data', 2000);
    } else {
      // Use live data from Firebase
      try {
        // Show loading state
        this.settings.showNotification('Loading hiker data...', 2000);
        
        // Set up real-time updates first
        this.setupFirebaseRealTimeUpdates();
        
        // Initial data will come through the real-time listener
        this.settings.showNotification('Connected to live data', 3000);
      } catch (error) {
        console.error('Error loading hikers from Firebase:', error);
        this.hikers = [];
        this.settings.showNotification('Error connecting to database', 3000);
      }
    }
  }

  /**
   * Handle simulation toggle
   * @param {boolean} isEnabled - Whether simulation is enabled
   */
  async handleSimulationToggle(isEnabled) {
    // Don't do anything if the state is the same
    if (isEnabled === !this.isUsingLiveData) return;

    // Stop current data source
    this.stopCurrentDataSource();
    
    // Update state
    this.isUsingLiveData = !isEnabled;
    
    // Load data for the new state
    await this.loadData(isEnabled);
    
    // Render the UI
    this.renderAll();
  }

  /**
   * Stop the current data source (simulation or Firebase listener)
   */
  stopCurrentDataSource() {
    // Stop simulation if running
    this.stopSimulation();
    
    // Stop Firebase listener if active
    if (this.firebaseUnsubscribe) {
      this.firebaseUnsubscribe();
      this.firebaseUnsubscribe = null;
    }
  }

  /**
   * Set up Firebase real-time updates
   */
  setupFirebaseRealTimeUpdates() {
    // Clear any existing subscription
    if (this.firebaseUnsubscribe) {
      this.firebaseUnsubscribe();
      this.firebaseUnsubscribe = null;
    }
    
    try {
      // Subscribe to real-time updates
      this.firebaseUnsubscribe = listenForHikersUpdates((updatedHikers) => {
        // Log the data we received
        console.log('Received Firebase update with hikers:', updatedHikers);
        
        if (!updatedHikers || updatedHikers.length === 0) {
          console.warn('Received empty update from Firebase');
          // Don't clear existing hikers on empty update unless it's confirmed empty
          return;
        }
        
        // Update hikers data
        this.hikers = updatedHikers;
        
        // Re-render the UI
        this.renderAll();
        
        // Check notifications
        this.checkNotifications();
      });
      
      console.log('Firebase real-time updates set up successfully');
    } catch (error) {
      console.error('Error setting up Firebase real-time updates:', error);
      this.settings.showNotification('Error connecting to Firebase', 3000);
    }
  }

  /**
   * Apply all settings at once
   * @param {Object} settings - The settings object
   */
  applySettings(settings) {
    // Apply map settings
    this.changeMapStyle(settings.map.style);
    this.defaultZoom = settings.map.defaultZoom;
    this.map.centerMap(this.defaultCenter, settings.map.defaultZoom);
    
    // Apply simulation settings
    this.setSimulationSpeed(settings.simulation.speed);
    
    // Handle simulation toggle if needed
    if (settings.simulation.enabled !== !this.isUsingLiveData) {
      this.handleSimulationToggle(settings.simulation.enabled);
    }
  }

  /**
   * Change the map style/theme
   * @param {string} styleName - The name of the style to apply
   */
  changeMapStyle(styleName) {
    // Remove current tile layer
    this.map.map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        this.map.map.removeLayer(layer);
      }
    });
    
    // Add new tile layer based on style
    const tileUrl = this.mapStyles[styleName] || this.mapStyles.default;
    L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map.map);
  }

  /**
   * Handle hiker click events
   * @param {Object|string|number} hikerOrId - The hiker that was clicked or its ID
   */
  handleHikerClick(hikerOrId) {
    console.log('handleHikerClick called with:', hikerOrId);
    
    let hiker;
    let hikerId;
    
    // Check if we received a hiker object or just an ID
    if (typeof hikerOrId === 'object' && hikerOrId !== null) {
      hiker = hikerOrId;
      hikerId = hiker.id;
    } else {
      // We received an ID
      hikerId = hikerOrId;
      // Always find the hiker from the main hikers array to get the latest data
      hiker = this.hikers.find(h => h.id == hikerId);
      
      if (!hiker) {
        console.error(`Hiker with ID ${hikerId} not found`);
        return;
      }
    }
    
    // Double check to make sure we have the latest data
    const latestHiker = this.hikers.find(h => h.id == hikerId);
    if (latestHiker) {
      // Use the latest hiker data from the main array
      hiker = latestHiker;
    }
    
    console.log('Opening modal for hiker:', hiker);
    
    // Update the marker position to the latest coordinates
    this.updateMarkerPosition(hiker);
    
    // Open the modal with the hiker's data
    this.modal.openModal(hiker);
    
    // Center the map on the hiker
    this.map.centerOnHiker(hiker.id);
  }

  /**
   * Handle SOS actions (marking as handled or emergency services)
   * @param {string|number} hikerId - Hiker ID
   * @param {string} action - Action type ('handled', 'emergency', or 'reset')
   */
  handleSosAction(hikerId, action) {
    console.log(`SOS action requested: ${action} for hiker ${hikerId}`);
    
    const hiker = this.hikers.find(h => h.id === hikerId);
    if (!hiker) {
      console.error(`Hiker with ID ${hikerId} not found for SOS action ${action}`);
      return;
    }
    
    let actionTaken = false;
    let message = '';
    
    if (action === 'handled') {
      actionTaken = hiker.markSosHandled();
      message = `SOS for ${hiker.name} marked as handled`;
    } else if (action === 'emergency') {
      actionTaken = hiker.dispatchEmergencyServices();
      message = `Emergency services dispatched for ${hiker.name}`;
    } else if (action === 'reset') {
      console.log('Attempting to reset SOS status for hiker:', hiker);
      actionTaken = hiker.resetSosStatus();
      message = `SOS for ${hiker.name} has been cleared`;
      console.log('Reset SOS result:', actionTaken, 'New hiker state:', hiker);
    }
    
    if (actionTaken) {
      // Show notification
      this.settings.showNotification(message, 3000);
      
      // Update data in Firebase if using live data
      if (this.isUsingLiveData) {
        console.log(`Updating Firebase for ${action} action:`, {
          hikerId,
          sosActive: action !== 'reset',
          sosHandled: action === 'handled' || action === 'emergency', 
          emergency: action === 'emergency',
          reset: action === 'reset'
        });
        
        updateHikerSosStatus(
          hikerId, 
          action !== 'reset', // SOS is active unless resetting
          action === 'handled' || action === 'emergency', // Whether handled
          action === 'emergency', // Whether emergency services dispatched
          action === 'reset' // Whether to reset all SOS statuses
        ).then(() => {
          console.log(`Firebase SOS update successful for action: ${action}`);
        }).catch(error => {
          console.error('Error updating SOS status in Firebase:', error);
          this.settings.showNotification('Failed to update status in database', 3000);
        });
      }
      
      // Update the modal content to reflect changes
      this.modal.updateModalContent(hiker);
      
      // Refresh the sidebar to show updated SOS status
      this.sidebar.updateSidebar(this.hikers);
      
      // Apply special marker style for handled SOS
      this.updateMarkerStyle(hiker);
    } else {
      console.warn(`No action taken for ${action} on hiker ${hikerId}`);
    }
  }

  /**
   * Handle tower connect hikers action
   * @param {string} towerId - The ID of the tower
   */
  handleTowerConnectHikers(towerId) {
    console.log(`Connecting hikers to tower ${towerId}`);
    
    // Find hikers within the tower's range and connect them
    // This is a placeholder for actual connection logic
    this.settings.showNotification(
      `Connected nearby hikers to tower ${towerId}`,
      3000
    );
    
    // Could implement actual logic to:
    // 1. Calculate hikers within tower range
    // 2. Update their connection status
    // 3. Show visual indicators on the map
  }

  /**
   * Handle tower view coverage action
   * @param {string} towerId - The ID of the tower
   */
  handleTowerViewCoverage(towerId) {
    console.log(`Viewing coverage for tower ${towerId}`);
    
    // This would show the coverage area on the map
    // Placeholder for actual coverage visualization
    this.settings.showNotification(
      `Showing coverage area for tower ${towerId}`,
      3000
    );
    
    // Could implement:
    // 1. Draw coverage circle on map
    // 2. Highlight hikers within/outside coverage
    // 3. Show coverage statistics
  }

  /**
   * Handle tower node click (similar to hiker click)
   * @param {Object} tower - The tower object
   */
  handleTowerClick(tower) {
    console.log('Tower clicked:', tower);
    
    // Ensure tower has required properties
    if (!tower || !tower.id) {
      console.error('Invalid tower object:', tower);
      return;
    }
    
    // Open the tower modal with tower data
    this.towerModal.openModal(tower);
  }

  /**
   * Update marker style for a hiker (e.g., for handled SOS)
   * @param {Object} hiker - The hiker to update
   */
  updateMarkerStyle(hiker) {
    const marker = this.map.hikerMarkers[hiker.id];
    if (marker) {
      // Remove the old marker
      this.map.markerLayer.removeLayer(marker);
      
      // Create a new marker with updated style and the latest coordinates
      const newMarker = L.marker([hiker.lat, hiker.lon], {
        icon: this.map.createCustomMarkerIcon(hiker),
        zIndexOffset: hiker.sos ? 1000 : 0
      }).addTo(this.map.markerLayer);
      
      newMarker.on('click', () => {
        this.handleHikerClick(hiker);
      });
      
      this.map.hikerMarkers[hiker.id] = newMarker;
    }
  }

  /**
   * Update marker position for a hiker
   * @param {Object} hiker - The hiker to update
   */
  updateMarkerPosition(hiker) {
    const marker = this.map.hikerMarkers[hiker.id];
    if (marker) {
      // Update marker position to latest coordinates
      marker.setLatLng([hiker.lat, hiker.lon]);
    }
  }

  /**
   * Render all UI components
   */
  renderAll() {
    console.log('Rendering all UI components with hikers:', this.hikers);
    
    // First update the positions of existing markers without recreating them
    this.hikers.forEach(hiker => {
      this.updateMarkerPosition(hiker);
    });
    
    // Update the map - this recreates all markers if needed
    this.map.updateMap(
      this.hikers, 
      (hiker) => this.handleHikerClick(hiker),
      this.towers,
      (tower) => this.handleTowerClick(tower)
    );
    
    // Update the sidebar
    this.sidebar.updateSidebar(this.hikers);
    this.sidebar.updateTowerList(this.towers);
    
    // Update safety status if module is initialized
    if (this.trackSafetyModule) {
      this.trackSafetyModule.checkAllHikersSafety();
    }
    
    // Call any registered hikers update callbacks
    if (this.hikerUpdateCallbacks && this.hikerUpdateCallbacks.length > 0) {
      this.hikerUpdateCallbacks.forEach(callback => {
        if (typeof callback === 'function') {
          callback(this.hikers);
        }
      });
    }
    
    // Update modal if it's open - make sure to get the most recent hiker data
    const activeHikerId = this.modal.activeHikerId;
    if (activeHikerId !== null) {
      // Find the hiker using the latest data
      const activeHiker = this.hikers.find(h => h.id === activeHikerId);
      if (activeHiker) {
        console.log('Updating modal with latest hiker data:', activeHiker);
        // First update the marker position for this hiker again to ensure it's in sync
        this.updateMarkerPosition(activeHiker);
        // Then update the modal content with the latest data
        this.modal.updateModalContent(activeHiker);
      }
    }
  }

  /**
   * Check for notification conditions and display if needed
   */
  checkNotifications() {
    const settings = this.settings.getSettings();
    
    this.hikers.forEach(hiker => {
      // Check for SOS notification
      if (hiker.sos && settings.notifications.sosAlerts) {
        // If this is a new SOS (not previously notified)
        if (!hiker.sosNotified) {
          this.settings.showNotification(`SOS Alert: ${hiker.name} needs assistance!`, 5000);
          hiker.sosNotified = true;
        }
      }
      
      // Check for battery notification
      if (settings.notifications.batteryAlerts && 
          hiker.battery <= settings.notifications.batteryThreshold &&
          !hiker.batteryNotified) {
        this.settings.showNotification(`Low Battery Alert: ${hiker.name}'s device at ${Math.round(hiker.battery)}%`, 5000);
        hiker.batteryNotified = true;
      }
      
      // Reset notification flags if conditions are no longer met
      if (hiker.batteryNotified && hiker.battery > settings.notifications.batteryThreshold) {
        hiker.batteryNotified = false;
      }
    });
  }

  /**
   * Start the simulation of hiker movement
   */
  startSimulation() {
    if (this.simulationInterval) return;
    
    this.simulationInterval = setInterval(() => {
      // Update hiker positions
      this.hikers.forEach(hiker => hiker.updatePosition());
      
      // Check for notifications
      this.checkNotifications();
      
      // Render the updated state
      this.renderAll();
    }, this.simulationSpeed);
  }

  /**
   * Stop the simulation
   */
  stopSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  /**
   * Change the simulation speed
   * @param {number} speed - New simulation interval in milliseconds
   */
  setSimulationSpeed(speed) {
    this.simulationSpeed = speed;
    if (this.simulationInterval) {
      this.stopSimulation();
      this.startSimulation();
    }
  }

  /**
   * Restart the simulation with new hikers count
   * @param {number} count - Number of hikers to simulate
   */
  async restartSimulation(count) {
    // Stop current simulation
    this.stopSimulation();
    
    // Generate new hikers
    this.hikers = await createSampleHikers(count);
    
    // Render and restart
    this.renderAll();
    this.startSimulation();
  }
}

// Export the application class
export default HikerTrackingApp;

// Initialize on window load
window.addEventListener('DOMContentLoaded', () => {
  window.hikerApp = new HikerTrackingApp();
  window.hikerApp.init();
}); 