class SettingsComponent {
  constructor() {
    this.modalId = 'settings-modal';
    this.settingsFormId = 'settings-form';
    this.closeButtonId = 'settings-close-btn';
    this.notificationsContainerId = 'notifications-container';

    // Default settings
    this.settings = {
      notifications: {
        sos: true,
        battery: true,
        batteryThreshold: 20,
        sosHandled: true,
        emergencyDispatched: true
      },
      map: {
        refreshRate: 5, // seconds
        defaultZoom: 15
      },
      simulation: {
        enabled: true,
        updateInterval: 3000 // ms
      }
    };
    
    // Load settings from localStorage if available
    this.loadSettings();
    
    // Create notifications container if it doesn't exist
    this.ensureNotificationsContainer();
  }

  init() {
    // Add event listeners for the settings modal
    const closeButton = document.getElementById(this.closeButtonId);
    if (closeButton) {
      closeButton.addEventListener('click', this.closeModal.bind(this));
    }

    const settingsForm = document.getElementById(this.settingsFormId);
    if (settingsForm) {
      settingsForm.addEventListener('submit', this.saveSettings.bind(this));
      
      // Set initial form values from current settings
      this.populateForm();
    }

    // Handle click outside modal to close
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }
  }

  openModal() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.classList.add('active');
      this.populateForm();
    }
  }

  closeModal() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  }

  populateForm() {
    // Notifications settings
    document.getElementById('setting-sos-notifications')?.checked = this.settings.notifications.sos;
    document.getElementById('setting-battery-notifications')?.checked = this.settings.notifications.battery;
    document.getElementById('setting-battery-threshold')?.value = this.settings.notifications.batteryThreshold;
    document.getElementById('setting-sos-handled-notifications')?.checked = this.settings.notifications.sosHandled;
    document.getElementById('setting-emergency-notifications')?.checked = this.settings.notifications.emergencyDispatched;
    
    // Map settings
    document.getElementById('setting-map-refresh')?.value = this.settings.map.refreshRate;
    document.getElementById('setting-map-zoom')?.value = this.settings.map.defaultZoom;
    
    // Simulation settings
    document.getElementById('setting-simulation-enabled')?.checked = this.settings.simulation.enabled;
    document.getElementById('setting-simulation-interval')?.value = this.settings.simulation.updateInterval / 1000; // Convert back to seconds for display
  }

  saveSettings(e) {
    e.preventDefault();
    
    // Notifications settings
    this.settings.notifications.sos = document.getElementById('setting-sos-notifications')?.checked || false;
    this.settings.notifications.battery = document.getElementById('setting-battery-notifications')?.checked || false;
    this.settings.notifications.batteryThreshold = parseInt(document.getElementById('setting-battery-threshold')?.value || 20);
    this.settings.notifications.sosHandled = document.getElementById('setting-sos-handled-notifications')?.checked || false;
    this.settings.notifications.emergencyDispatched = document.getElementById('setting-emergency-notifications')?.checked || false;
    
    // Map settings
    this.settings.map.refreshRate = parseInt(document.getElementById('setting-map-refresh')?.value || 5);
    this.settings.map.defaultZoom = parseInt(document.getElementById('setting-map-zoom')?.value || 15);
    
    // Simulation settings
    this.settings.simulation.enabled = document.getElementById('setting-simulation-enabled')?.checked || false;
    this.settings.simulation.updateInterval = parseInt(document.getElementById('setting-simulation-interval')?.value || 3) * 1000; // Convert to milliseconds
    
    // Save settings to localStorage
    this.saveSettingsToStorage();
    
    // Show success notification
    this.showNotification('Settings saved successfully', 'success');
    
    // Close modal
    this.closeModal();
    
    // Return the updated settings
    return this.settings;
  }

  getSettings() {
    return this.settings;
  }

  loadSettings() {
    const savedSettings = localStorage.getItem('hikerTrackingSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        this.settings = this.mergeSettings(this.settings, parsedSettings);
      } catch (e) {
        console.error('Error loading settings from localStorage:', e);
      }
    }
  }

  saveSettingsToStorage() {
    try {
      localStorage.setItem('hikerTrackingSettings', JSON.stringify(this.settings));
    } catch (e) {
      console.error('Error saving settings to localStorage:', e);
    }
  }

  // Helper to merge saved settings with defaults (to handle new settings added)
  mergeSettings(defaults, saved) {
    const result = { ...defaults };
    
    for (const key in saved) {
      if (typeof saved[key] === 'object' && saved[key] !== null && key in defaults) {
        result[key] = this.mergeSettings(defaults[key], saved[key]);
      } else if (key in defaults) {
        result[key] = saved[key];
      }
    }
    
    return result;
  }

  ensureNotificationsContainer() {
    let container = document.getElementById(this.notificationsContainerId);
    
    if (!container) {
      container = document.createElement('div');
      container.id = this.notificationsContainerId;
      container.className = 'notifications-container';
      document.body.appendChild(container);
    }
    
    return container;
  }

  showNotification(message, type = 'info', duration = 5000, icon = null) {
    const container = this.ensureNotificationsContainer();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Determine appropriate icon if not specified
    if (!icon) {
      switch (type) {
        case 'success':
          icon = 'check-circle';
          break;
        case 'error':
          icon = 'exclamation-circle';
          break;
        case 'warning':
          icon = 'exclamation-triangle';
          break;
        case 'sos':
          icon = 'exclamation-triangle';
          break;
        case 'sosHandled':
          icon = 'check-circle';
          break;
        case 'emergency':
          icon = 'ambulance';
          break;
        default:
          icon = 'info-circle';
      }
    }
    
    // Create notification content
    notification.innerHTML = `
      <div class="notification-icon">
        <i class="fas fa-${icon}"></i>
      </div>
      <div class="notification-content">
        <div class="notification-message">${message}</div>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Add event listener for close button
    const closeButton = notification.querySelector('.notification-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.removeNotification(notification);
      });
    }
    
    // Show notification with animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Auto remove after duration
    if (duration) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, duration);
    }
    
    return notification;
  }

  removeNotification(notification) {
    // Add hide animation
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      notification.remove();
    }, 300);
  }

  // Check if notifications are enabled
  areNotificationsEnabled(type) {
    switch (type) {
      case 'sos':
        return this.settings.notifications.sos;
      case 'battery':
        return this.settings.notifications.battery;
      case 'sosHandled':
        return this.settings.notifications.sosHandled;
      case 'emergency':
        return this.settings.notifications.emergencyDispatched;
      default:
        return true;
    }
  }

  getBatteryThreshold() {
    return this.settings.notifications.batteryThreshold;
  }

  // Method to show SOS status notification
  showSosStatusNotification(hiker, statusType) {
    if (!this.areNotificationsEnabled(statusType)) {
      return null;
    }
    
    let message, type, icon, duration;
    
    switch (statusType) {
      case 'sos':
        message = `SOS Alert! ${hiker.name} has triggered an emergency signal`;
        type = 'sos';
        icon = 'exclamation-triangle';
        duration = 10000; // Longer duration for emergency
        break;
      case 'sosHandled':
        message = `SOS for ${hiker.name} has been marked as handled`;
        type = 'sosHandled';
        icon = 'check-circle';
        duration = 5000;
        break;
      case 'emergency':
        message = `Emergency services dispatched for ${hiker.name}`;
        type = 'emergency';
        icon = 'ambulance';
        duration = 7000;
        break;
      default:
        return null;
    }
    
    return this.showNotification(message, type, duration, icon);
  }

  // Method to show battery notification
  showBatteryNotification(hiker) {
    if (!this.areNotificationsEnabled('battery')) {
      return null;
    }
    
    if (hiker.battery <= this.getBatteryThreshold()) {
      const message = `Low Battery Alert! ${hiker.name}'s device is at ${hiker.battery}%`;
      return this.showNotification(message, 'warning', 5000, 'battery-quarter');
    }
    
    return null;
  }
}

export default SettingsComponent; 