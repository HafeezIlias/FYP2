/**
 * Hiker Model - Represents a hiker entity
 */
class Hiker {
  /**
   * Create a new Hiker
   * @param {number} id - Unique identifier
   * @param {string} name - Hiker's name
   * @param {number} lat - Latitude coordinate
   * @param {number} lon - Longitude coordinate
   * @param {string} status - Current status (Active, Resting, SOS)
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
    
    // Notification flags
    this.sosNotified = false;
    this.batteryNotified = false;
    
    // SOS handling
    this.sosHandled = false;
    this.sosHandledTime = null;
    this.sosEmergencyDispatched = false;
    this.sosEmergencyTime = null;

    // Simulation properties
    this.speed = 0.0001 + Math.random() * 0.0002; // Random movement speed
    this.direction = Math.random() * Math.PI * 2; // Random direction in radians
    this.directionalBias = { // Tendency to go in certain direction
      lat: Math.random() * 0.6 - 0.3,
      lon: Math.random() * 0.6 - 0.3
    };
    this.movementProbability = 0.9; // 90% chance to move each update
    this.restProbability = 0.05; // 5% chance to rest if active
    this.resumeProbability = 0.3; // 30% chance to resume if resting
    this.batteryDrainRate = 0.1 + Math.random() * 0.3; // Random battery drain (0.1-0.4% per update)
  }
  
  /**
   * Update hiker data with new position for live data
   * @param {number} lat - New latitude
   * @param {number} lon - New longitude
   * @param {number} battery - New battery level
   * @param {string} status - New status
   */
  updateData(lat, lon, battery, status = 'Active') {
    this.lat = lat;
    this.lon = lon;
    this.battery = battery;
    this.status = status;
    this.lastUpdate = Date.now();
  }

  /**
   * Update position for simulation
   */
  updatePosition() {
    // Don't update position if in SOS mode
    if (this.sos) return;
    
    // Drain battery
    this.battery = Math.max(0, this.battery - this.batteryDrainRate);
    
    // Update status based on probabilities
    if (this.status === 'Active' && Math.random() < this.restProbability) {
      this.status = 'Resting';
    } else if (this.status === 'Resting' && Math.random() < this.resumeProbability) {
      this.status = 'Active';
    }
    
    // Only move if active and probability check passes
    if (this.status === 'Active' && Math.random() < this.movementProbability) {
      // Slightly change direction (wander)
      this.direction += (Math.random() - 0.5) * 0.5;
      
      // Calculate movement with directional bias
      const latChange = Math.sin(this.direction) * this.speed + this.directionalBias.lat * 0.00002;
      const lonChange = Math.cos(this.direction) * this.speed + this.directionalBias.lon * 0.00002;
      
      // Update coordinates
      this.lat = parseFloat(this.lat) + latChange;
      this.lon = parseFloat(this.lon) + lonChange;
    }
    
    // Random chance for SOS (1% when battery below 30%, 0.2% otherwise)
    if (!this.sos) {
      const sosProbability = this.battery < 30 ? 0.01 : 0.002;
      if (Math.random() < sosProbability) {
        this.setSosStatus(true);
      }
    }
    
    // Update last update timestamp
    this.lastUpdate = Date.now();
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
  
  /**
   * Set SOS status
   * @param {boolean} sosState - New SOS state
   */
  setSosStatus(sosState) {
    if (sosState === this.sos) return false;
    
    this.sos = sosState;
    if (sosState) {
      this.status = 'SOS';
      this.sosHandled = false;
      this.sosHandledTime = null;
      this.sosEmergencyDispatched = false;
      this.sosEmergencyTime = null;
    } else {
      this.status = 'Active';
    }
    
    return true;
  }
}

// Export the Hiker model
export default Hiker; 