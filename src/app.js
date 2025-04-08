/**
 * Main Application - Coordinates all components
 */
import { createSampleHikers } from './utils/helpers.js';
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
  }

  /**
   * Initialize the application
   */
  async init() {
    // Initialize settings component first to load saved preferences
    this.settings.init();
    
    // Setup settings button click event
    const settingsBtn = document.getElementById(this.settingsBtnId);
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        this.settings.openModal();
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
      }
    );
    
    // Set simulation speed from settings
    this.simulationSpeed = initialSettings.simulation.updateInterval;
    
    // Load sample data with count from settings
    this.hikers = await createSampleHikers(10);
    
    // Render initial state
    this.renderAll();
    
    // Start simulation
    this.startSimulation();
    
    return this;
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
    
    // Other settings will be applied when relevant
    // For example, hikers count on restart, notifications when events occur
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
   * @param {Object} hiker - The hiker that was clicked
   */
  handleHikerClick(hiker) {
    this.modal.openModal(hiker);
    this.map.centerOnHiker(hiker.id);
  }

  /**
   * Handle SOS actions (marking as handled or emergency services)
   * @param {string|number} hikerId - Hiker ID
   * @param {string} action - Action type ('handled' or 'emergency')
   */
  handleSosAction(hikerId, action) {
    const hiker = this.hikers.find(h => h.id === hikerId);
    if (!hiker) return;
    
    let actionTaken = false;
    let message = '';
    
    if (action === 'handled') {
      actionTaken = hiker.markSosHandled();
      message = `SOS for ${hiker.name} marked as handled`;
    } else if (action === 'emergency') {
      actionTaken = hiker.dispatchEmergencyServices();
      message = `Emergency services dispatched for ${hiker.name}`;
    }
    
    if (actionTaken) {
      // Show notification
      this.settings.showNotification(message, 3000);
      
      // Refresh the sidebar to show updated SOS status
      this.sidebar.updateSidebar(this.hikers);
      
      // Update SOS count in sidebar
      this.renderAll();
      
      // Apply special marker style for handled SOS
      this.updateMarkerStyle(hiker);
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