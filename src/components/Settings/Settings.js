/**
 * Settings Component - Handles application settings and preferences
 */
class SettingsComponent {
  /**
   * Initialize the Settings component
   * @param {string} modalId - The ID of the settings modal element
   * @param {string} settingsBtnId - The ID of the settings button element
   */
  constructor(modalId = 'settings-modal', settingsBtnId = 'settings-btn') {
    this.modalId = modalId;
    this.settingsBtnId = settingsBtnId;
    this.closeBtnId = 'close-settings';
    this.saveBtnId = 'save-settings';
    this.resetBtnId = 'reset-settings';
    
    // Default settings
    this.defaultSettings = {
      map: {
        style: 'default',
        defaultZoom: 12
      },
      simulation: {
        speed: 3000,
        hikersCount: 10,
        autoSos: true
      },
      notifications: {
        sosAlerts: true,
        batteryAlerts: true,
        batteryThreshold: 20
      },
      dataSource: {
        useFirebase: true
      }
    };
    
    // Current settings (initialize with defaults)
    this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
    
    // Load saved settings if available
    this.loadSavedSettings();
  }

  /**
   * Initialize the settings component
   * @param {Object} callbacks - Callback functions for settings changes
   * @param {Function} callbacks.onMapStyleChange - Called when map style changes
   * @param {Function} callbacks.onZoomChange - Called when default zoom changes
   * @param {Function} callbacks.onSimulationSpeedChange - Called when simulation speed changes
   * @param {Function} callbacks.onHikersCountChange - Called when hikers count changes
   */
  init(callbacks = {}) {
    this.callbacks = callbacks;
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Initialize UI with current settings
    this.updateUI();
    
    return this;
  }

  /**
   * Setup event listeners for settings controls
   */
  setupEventListeners() {
    // Settings button click (open modal)
    document.getElementById(this.settingsBtnId)?.addEventListener('click', () => {
      this.openSettingsModal();
    });
    
    // Close button click
    document.getElementById(this.closeBtnId)?.addEventListener('click', () => {
      this.closeSettingsModal();
    });
    
    // Save button click
    document.getElementById(this.saveBtnId)?.addEventListener('click', () => {
      this.saveSettings();
      this.closeSettingsModal();
    });
    
    // Reset button click
    document.getElementById(this.resetBtnId)?.addEventListener('click', () => {
      this.resetSettings();
    });
    
    // Map style change
    document.getElementById('map-style')?.addEventListener('change', (e) => {
      const newStyle = e.target.value;
      this.settings.map.style = newStyle;
      if (this.callbacks.onMapStyleChange) {
        this.callbacks.onMapStyleChange(newStyle);
      }
    });
    
    // Default zoom change
    document.getElementById('default-zoom')?.addEventListener('input', (e) => {
      const zoomValue = parseInt(e.target.value);
      document.getElementById('zoom-value').textContent = zoomValue;
      this.settings.map.defaultZoom = zoomValue;
      if (this.callbacks.onZoomChange) {
        this.callbacks.onZoomChange(zoomValue);
      }
    });
    
    // Simulation speed change
    document.getElementById('simulation-speed')?.addEventListener('input', (e) => {
      const speedValue = parseInt(e.target.value);
      document.getElementById('speed-value').textContent = `${speedValue}ms`;
      this.settings.simulation.speed = speedValue;
      if (this.callbacks.onSimulationSpeedChange) {
        this.callbacks.onSimulationSpeedChange(speedValue);
      }
    });
    
    // Hikers count change
    document.getElementById('hikers-count')?.addEventListener('input', (e) => {
      const countValue = parseInt(e.target.value);
      document.getElementById('hikers-count-value').textContent = countValue;
      this.settings.simulation.hikersCount = countValue;
      if (this.callbacks.onHikersCountChange) {
        this.callbacks.onHikersCountChange(countValue);
      }
    });
    
    // Auto SOS toggle
    document.getElementById('auto-sos')?.addEventListener('change', (e) => {
      this.settings.simulation.autoSos = e.target.checked;
      if (this.callbacks.onAutoSosChange) {
        this.callbacks.onAutoSosChange(e.target.checked);
      }
    });
    
    // SOS alerts toggle
    document.getElementById('sos-alerts')?.addEventListener('change', (e) => {
      this.settings.notifications.sosAlerts = e.target.checked;
      if (this.callbacks.onSosAlertsChange) {
        this.callbacks.onSosAlertsChange(e.target.checked);
      }
    });
    
    // Battery alerts toggle
    document.getElementById('battery-alerts')?.addEventListener('change', (e) => {
      this.settings.notifications.batteryAlerts = e.target.checked;
      if (this.callbacks.onBatteryAlertsChange) {
        this.callbacks.onBatteryAlertsChange(e.target.checked);
      }
    });
    
    // Battery threshold change
    document.getElementById('battery-threshold')?.addEventListener('input', (e) => {
      const thresholdValue = parseInt(e.target.value);
      document.getElementById('battery-threshold-value').textContent = `${thresholdValue}%`;
      this.settings.notifications.batteryThreshold = thresholdValue;
      if (this.callbacks.onBatteryThresholdChange) {
        this.callbacks.onBatteryThresholdChange(thresholdValue);
      }
    });
    
    // Firebase data source toggle
    document.getElementById('use-firebase')?.addEventListener('change', (e) => {
      if (!this.settings.dataSource) {
        this.settings.dataSource = {};
      }
      this.settings.dataSource.useFirebase = e.target.checked;
      if (this.callbacks.onDataSourceChange) {
        this.callbacks.onDataSourceChange(e.target.checked);
      }
    });
  }

  /**
   * Open the settings modal
   */
  openSettingsModal() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.classList.add('active');
      this.updateUI();
    }
  }

  /**
   * Close the settings modal
   */
  closeSettingsModal() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  }

  /**
   * Update the UI with current settings values
   */
  updateUI() {
    // Map settings
    document.getElementById('map-style').value = this.settings.map.style;
    
    const zoomSlider = document.getElementById('default-zoom');
    if (zoomSlider) {
      zoomSlider.value = this.settings.map.defaultZoom;
      document.getElementById('zoom-value').textContent = this.settings.map.defaultZoom;
    }
    
    // Simulation settings
    const speedSlider = document.getElementById('simulation-speed');
    if (speedSlider) {
      speedSlider.value = this.settings.simulation.speed;
      document.getElementById('speed-value').textContent = `${this.settings.simulation.speed}ms`;
    }
    
    const hikersSlider = document.getElementById('hikers-count');
    if (hikersSlider) {
      hikersSlider.value = this.settings.simulation.hikersCount;
      document.getElementById('hikers-count-value').textContent = this.settings.simulation.hikersCount;
    }
    
    document.getElementById('auto-sos').checked = this.settings.simulation.autoSos;
    
    // Notification settings
    document.getElementById('sos-alerts').checked = this.settings.notifications.sosAlerts;
    document.getElementById('battery-alerts').checked = this.settings.notifications.batteryAlerts;
    
    const thresholdSlider = document.getElementById('battery-threshold');
    if (thresholdSlider) {
      thresholdSlider.value = this.settings.notifications.batteryThreshold;
      document.getElementById('battery-threshold-value').textContent = `${this.settings.notifications.batteryThreshold}%`;
    }
    
    // Data source settings
    const useFirebaseToggle = document.getElementById('use-firebase');
    if (useFirebaseToggle) {
      useFirebaseToggle.checked = this.settings.dataSource?.useFirebase ?? true;
    }
  }

  /**
   * Save the current settings to localStorage
   */
  saveSettings() {
    localStorage.setItem('hikerTrackerSettings', JSON.stringify(this.settings));
    
    // Notify of successful save
    this.showNotification('Settings saved successfully!');
    
    // Call the onSettingsChanged callback if provided
    if (this.callbacks.onSettingsChanged) {
      this.callbacks.onSettingsChanged(this.settings);
    }
  }

  /**
   * Load saved settings from localStorage
   */
  loadSavedSettings() {
    const savedSettings = localStorage.getItem('hikerTrackerSettings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    }
  }

  /**
   * Reset settings to default values
   */
  resetSettings() {
    this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
    this.updateUI();
    
    // Show notification
    this.showNotification('Settings reset to default values.');
    
    // Call the onSettingsChanged callback if provided
    if (this.callbacks.onSettingsChanged) {
      this.callbacks.onSettingsChanged(this.settings);
    }
  }

  /**
   * Show a notification message
   * @param {string} message - The message to display
   * @param {number} duration - Duration in milliseconds
   */
  showNotification(message, duration = 3000) {
    // Check if notification container exists, if not create it
    let notificationContainer = document.getElementById('settings-notification');
    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.id = 'settings-notification';
      notificationContainer.className = 'settings-notification';
      document.body.appendChild(notificationContainer);
      
      // Add notification styles if not already in the document
      if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
          .settings-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4299e1;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            z-index: 2000;
            font-size: 14px;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
          }
          .settings-notification.show {
            transform: translateY(0);
            opacity: 1;
          }
        `;
        document.head.appendChild(style);
      }
    }
    
    // Set the notification message
    notificationContainer.textContent = message;
    
    // Show the notification
    notificationContainer.classList.add('show');
    
    // Hide the notification after the specified duration
    setTimeout(() => {
      notificationContainer.classList.remove('show');
    }, duration);
  }

  /**
   * Get the current settings
   * @returns {Object} Current settings object
   */
  getSettings() {
    return this.settings;
  }
}

export default SettingsComponent; 