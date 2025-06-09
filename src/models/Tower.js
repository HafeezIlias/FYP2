/**
 * Tower Model - Represents a communication tower or basecamp
 */
class Tower {
  /**
   * Create a new Tower
   * @param {string|number} id - Unique identifier for the tower
   * @param {string} name - Tower name
   * @param {number} lat - Latitude coordinate
   * @param {number} lon - Longitude coordinate
   * @param {string} type - Tower type ('Tower' or 'Basecamp')
   * @param {string} status - Tower status ('Active', 'Maintenance', 'Offline')
   * @param {number} signalStrength - Signal strength percentage (0-100)
   * @param {Object} options - Additional options
   */
  constructor(id, name, lat, lon, type = 'Tower', status = 'Active', signalStrength = 85, options = {}) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.type = type; // 'Tower' or 'Basecamp'
    this.status = status; // 'Active', 'Maintenance', 'Offline'
    this.signalStrength = signalStrength;
    this.lastUpdate = Date.now();
    
    // Optional coverage range (can be null)
    this.coverageRange = options.coverageRange || null;
    
    // Type-specific properties
    if (type === 'Tower') {
      this.antennaHeight = options.antennaHeight || 20 + Math.random() * 30; // 20-50m
      this.powerSource = options.powerSource || 'Grid';
      this.frequency = options.frequency || '2.4GHz';
    } else if (type === 'Basecamp') {
      this.capacity = options.capacity || 10 + Math.random() * 20; // 10-30 people
      this.facilities = options.facilities || ['Shelter', 'First Aid', 'Communication'];
      this.commander = options.commander || null;
    }
    
    // Additional properties
    this.isOnline = status === 'Active';
    this.connectionCount = options.connectionCount || 0;
    this.lastMaintenance = options.lastMaintenance || null;
  }

  /**
   * Update tower location
   * @param {number} lat - New latitude
   * @param {number} lon - New longitude
   */
  updateLocation(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    this.lastUpdate = Date.now();
  }

  /**
   * Update tower status
   * @param {string} status - New status
   */
  updateStatus(status) {
    this.status = status;
    this.isOnline = status === 'Active';
    this.lastUpdate = Date.now();
  }

  /**
   * Update signal strength
   * @param {number} strength - New signal strength (0-100)
   */
  updateSignalStrength(strength) {
    this.signalStrength = Math.max(0, Math.min(100, strength));
    this.lastUpdate = Date.now();
  }

  /**
   * Get status icon based on current status
   * @returns {string} Font Awesome icon class
   */
  getStatusIcon() {
    switch(this.status) {
      case 'Active': return 'fa-check-circle';
      case 'Maintenance': return 'fa-wrench';
      case 'Offline': return 'fa-times-circle';
      default: return 'fa-question-circle';
    }
  }

  /**
   * Get type icon based on tower type
   * @returns {string} Font Awesome icon class
   */
  getTypeIcon() {
    return this.type === 'Tower' ? 'fa-broadcast-tower' : 'fa-campground';
  }

  /**
   * Get status color
   * @returns {string} CSS color value
   */
  getStatusColor() {
    switch(this.status) {
      case 'Active': return '#48bb78';
      case 'Maintenance': return '#ed8936';
      case 'Offline': return '#f56565';
      default: return '#a0aec0';
    }
  }

  /**
   * Get signal strength color
   * @returns {string} CSS color value
   */
  getSignalColor() {
    if (this.signalStrength >= 80) return '#48bb78'; // Green
    if (this.signalStrength >= 60) return '#ed8936'; // Orange
    if (this.signalStrength >= 40) return '#ecc94b'; // Yellow
    return '#f56565'; // Red
  }

  /**
   * Check if tower is operational
   * @returns {boolean} True if tower is active and has good signal
   */
  isOperational() {
    return this.status === 'Active' && this.signalStrength >= 30;
  }

  /**
   * Get connection capacity (for basecamps)
   * @returns {number|null} Maximum capacity or null for towers
   */
  getCapacity() {
    return this.type === 'Basecamp' ? this.capacity : null;
  }

  /**
   * Get remaining capacity (for basecamps)
   * @returns {number|null} Remaining capacity or null for towers
   */
  getRemainingCapacity() {
    if (this.type === 'Basecamp') {
      return Math.max(0, this.capacity - this.connectionCount);
    }
    return null;
  }

  /**
   * Add connection to tower
   * @returns {boolean} Success status
   */
  addConnection() {
    if (this.type === 'Basecamp' && this.connectionCount < this.capacity) {
      this.connectionCount++;
      this.lastUpdate = Date.now();
      return true;
    } else if (this.type === 'Tower') {
      this.connectionCount++;
      this.lastUpdate = Date.now();
      return true;
    }
    return false;
  }

  /**
   * Remove connection from tower
   * @returns {boolean} Success status
   */
  removeConnection() {
    if (this.connectionCount > 0) {
      this.connectionCount--;
      this.lastUpdate = Date.now();
      return true;
    }
    return false;
  }

  /**
   * Convert tower to plain object for serialization
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      lat: this.lat,
      lon: this.lon,
      type: this.type,
      status: this.status,
      signalStrength: this.signalStrength,
      lastUpdate: this.lastUpdate,
      coverageRange: this.coverageRange,
      antennaHeight: this.antennaHeight,
      powerSource: this.powerSource,
      frequency: this.frequency,
      capacity: this.capacity,
      facilities: this.facilities,
      commander: this.commander,
      isOnline: this.isOnline,
      connectionCount: this.connectionCount,
      lastMaintenance: this.lastMaintenance
    };
  }

  /**
   * Create Tower instance from plain object
   * @param {Object} data - Plain object data
   * @returns {Tower} Tower instance
   */
  static fromJSON(data) {
    const tower = new Tower(
      data.id,
      data.name,
      data.lat,
      data.lon,
      data.type,
      data.status,
      data.signalStrength,
      {
        coverageRange: data.coverageRange,
        antennaHeight: data.antennaHeight,
        powerSource: data.powerSource,
        frequency: data.frequency,
        capacity: data.capacity,
        facilities: data.facilities,
        commander: data.commander,
        connectionCount: data.connectionCount,
        lastMaintenance: data.lastMaintenance
      }
    );
    
    tower.lastUpdate = data.lastUpdate || Date.now();
    return tower;
  }
}

export default Tower; 