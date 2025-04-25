/**
 * Hiker Model - Represents a hiker entity with movement simulation
 */
class Hiker {
  /**
   * Create a new Hiker
   * @param {number} id - Unique identifier
   * @param {string} name - Hiker's name
   * @param {number} lat - Latitude coordinate
   * @param {number} lon - Longitude coordinate
   * @param {string} status - Current status (Active, Moving, Resting, SOS)
   * @param {number} battery - Battery percentage (0-100)
   * @param {number} lastUpdate - Timestamp of last update
   * @param {boolean} sos - Whether in SOS mode
   */
  constructor(id, name, lat, lon, status = 'Active', battery = 100, lastUpdate = Date.now(), sos = false) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.status = status;
    this.battery = battery;
    this.lastUpdate = lastUpdate;
    this.sos = sos;
    
    // For simulated movement
    this.speed = Math.random() * 0.0002 + 0.00005; // random speed
    this.direction = Math.random() * Math.PI * 2; // random direction
    this.movementPause = Math.random() > 0.7; // 30% chance to be stationary initially
    this.pauseDuration = 0;
    
    // Notification flags
    this.sosNotified = false;
    this.batteryNotified = false;
    
    // Settings control
    this.enableSos = true; // Can be disabled via settings
    
    // SOS handling
    this.sosHandled = false;
    this.sosHandledTime = null;
    this.sosEmergencyDispatched = false;
    this.sosEmergencyTime = null;
  }
  
  /**
   * Update hiker position for simulation
   */
  updatePosition() {
    // SOS doesn't move
    if (this.sos) return;
    
    // Handle pausing
    if (this.movementPause) {
      this.pauseDuration++;
      if (this.pauseDuration > 10) { // Resume after ~10 seconds
        this.movementPause = false;
        this.pauseDuration = 0;
        this.status = 'Moving';
      } else {
        this.status = 'Resting';
        return;
      }
    } else if (Math.random() > 0.95) { // 5% chance to pause
      this.movementPause = true;
      this.status = 'Resting';
      return;
    }
    
    // Random slight direction change
    this.direction += (Math.random() - 0.5) * 0.2;
    
    // Update coordinates based on direction and speed
    this.lat += Math.sin(this.direction) * this.speed;
    this.lon += Math.cos(this.direction) * this.speed;
    
    // Update battery (decreases more when moving)
    this.battery = Math.max(0, this.battery - Math.random() * 0.3);
    
    // Update timestamp
    this.lastUpdate = Date.now();
    
    // Random SOS event (only if enabled in settings)
    if (this.enableSos && Math.random() > 0.997) { // Very rare SOS event
      this.sos = true;
      this.status = 'SOS';
      // Reset handling status
      this.sosHandled = false;
      this.sosHandledTime = null;
      this.sosEmergencyDispatched = false;
      this.sosEmergencyTime = null;
    }
  }
  
  /**
   * Mark SOS as handled
   */
  markSosHandled() {
    if (this.sos && !this.sosHandled) {
      this.sosHandled = true;
      this.sosHandledTime = Date.now();
      return true;
    }
    return false;
  }
  
  /**
   * Mark emergency services dispatched
   */
  dispatchEmergencyServices() {
    if (this.sos && !this.sosEmergencyDispatched) {
      this.sosEmergencyDispatched = true;
      this.sosEmergencyTime = Date.now();
      // Also mark as handled
      this.sosHandled = true;
      this.sosHandledTime = this.sosHandledTime || Date.now();
      return true;
    }
    return false;
  }
  
  /**
   * Format time for display
   * @param {number} timestamp - Timestamp to format
   * @returns {string} Formatted time string
   */
  static formatTime(timestamp) {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString();
  }
  
  /**
   * Get SOS status text
   * @returns {string} Status text
   */
  getSosStatusText() {
    if (!this.sos) return 'No SOS Active';
    if (this.sosEmergencyDispatched) return 'Emergency Services Dispatched';
    if (this.sosHandled) return 'Handled';
    return 'Pending';
  }
  
  /**
   * Reset SOS status
   * @returns {boolean} Whether the status was successfully reset
   */
  resetSosStatus() {
    if (!this.sos) return false; // Already not in SOS state
    
    this.sos = false;
    this.status = 'Active';
    this.sosHandled = false;
    this.sosHandledTime = null;
    this.sosEmergencyDispatched = false;
    this.sosEmergencyTime = null;
    this.sosNotified = false;
    
    return true;
  }
}

// Export the Hiker model
export default Hiker; 