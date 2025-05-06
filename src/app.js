/**
 * Main Application - Coordinates all components
 */
import { createSampleHikers } from './utils/helpers.js';
import { fetchHikersFromFirebase, listenForHikersUpdates, updateHikerSosStatus, updateNodeName } from './utils/firebase.js';
import MapComponent from './components/Map/Map.js';
import SidebarComponent from './components/Sidebar/Sidebar.js';
import ModalComponent from './components/Modal/Modal.js';
import SettingsComponent from './components/Settings/Settings.js';

class HikerTrackingApp {
  constructor() {
    this.hikers = [];
    this.map = new MapComponent();
    this.sidebar = new SidebarComponent();
    this.modal = new ModalComponent();
    this.settings = new SettingsComponent();
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
    this.sidebar.init((hiker) => {
      this.handleHikerClick(hiker);
    });
    
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
    
    // Check if we received a hiker object or just an ID
    if (typeof hikerOrId === 'object' && hikerOrId !== null) {
      hiker = hikerOrId;
    } else {
      // We received an ID, find the hiker
      const hikerId = hikerOrId;
      hiker = this.hikers.find(h => h.id == hikerId);
      
      if (!hiker) {
        console.error(`Hiker with ID ${hikerId} not found`);
        return;
      }
    }
    
    console.log('Opening modal for hiker:', hiker);
    
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
   * Update marker style for a hiker (e.g., for handled SOS)
   * @param {Object} hiker - The hiker to update
   */
  updateMarkerStyle(hiker) {
    const marker = this.map.hikerMarkers[hiker.id];
    if (marker) {
      // Replace the marker with an updated one
      const position = marker.getLatLng();
      this.map.markerLayer.removeLayer(marker);
      
      const newMarker = L.marker(position, {
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
   * Render all UI components
   */
  renderAll() {
    this.map.updateMap(this.hikers, (hiker) => this.handleHikerClick(hiker));
    this.sidebar.updateSidebar(this.hikers);
    
    // Update modal if it's open
    const activeHikerId = this.modal.activeHikerId;
    if (activeHikerId !== null) {
      const activeHiker = this.hikers.find(h => h.id === activeHikerId);
      if (activeHiker) {
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