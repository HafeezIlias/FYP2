/**
 * Tower Manager - Handles all tower-related operations
 */
import Tower from '../../models/Tower.js';

class TowerManager {
  constructor() {
    this.towers = [];
    this.updateCallbacks = [];
    this.nextId = 1;
  }

  /**
   * Add a new tower
   * @param {string} name - Tower name
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude  
   * @param {string} type - Tower type ('Tower' or 'Basecamp')
   * @param {Object} options - Additional options
   * @returns {Tower} The created tower
   */
  addTower(name, lat, lon, type = 'Tower', options = {}) {
    const id = `tower_${this.nextId++}`;
    const tower = new Tower(id, name, lat, lon, type, 'Active', 85, options);
    
    this.towers.push(tower);
    this.notifyUpdate();
    
    console.log(`Added new ${type.toLowerCase()}: ${name} at ${lat}, ${lon}`);
    return tower;
  }

  /**
   * Remove a tower by ID
   * @param {string} towerId - Tower ID to remove
   * @returns {boolean} Success status
   */
  removeTower(towerId) {
    const index = this.towers.findIndex(t => t.id === towerId);
    if (index !== -1) {
      const tower = this.towers[index];
      this.towers.splice(index, 1);
      this.notifyUpdate();
      console.log(`Removed tower: ${tower.name}`);
      return true;
    }
    return false;
  }

  /**
   * Update tower information
   * @param {string} towerId - Tower ID
   * @param {Object} updates - Updates to apply
   * @returns {boolean} Success status
   */
  updateTower(towerId, updates) {
    const tower = this.getTowerById(towerId);
    if (!tower) return false;

    // Apply updates
    Object.keys(updates).forEach(key => {
      if (key in tower) {
        tower[key] = updates[key];
      }
    });

    tower.lastUpdate = Date.now();
    this.notifyUpdate();
    return true;
  }

  /**
   * Get tower by ID
   * @param {string} towerId - Tower ID
   * @returns {Tower|null} Tower object or null
   */
  getTowerById(towerId) {
    return this.towers.find(t => t.id === towerId) || null;
  }

  /**
   * Get all towers
   * @returns {Array<Tower>} Array of all towers
   */
  getAllTowers() {
    return [...this.towers];
  }

  /**
   * Get towers by type
   * @param {string} type - Tower type ('Tower' or 'Basecamp')
   * @returns {Array<Tower>} Filtered towers
   */
  getTowersByType(type) {
    return this.towers.filter(t => t.type === type);
  }

  /**
   * Get towers by status
   * @param {string} status - Tower status
   * @returns {Array<Tower>} Filtered towers
   */
  getTowersByStatus(status) {
    return this.towers.filter(t => t.status === status);
  }

  /**
   * Get operational towers
   * @returns {Array<Tower>} Operational towers
   */
  getOperationalTowers() {
    return this.towers.filter(t => t.isOperational());
  }

  /**
   * Find nearest tower to coordinates
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @param {string} type - Optional type filter
   * @returns {Tower|null} Nearest tower or null
   */
  findNearestTower(lat, lon, type = null) {
    let towers = this.towers;
    if (type) {
      towers = towers.filter(t => t.type === type);
    }

    if (towers.length === 0) return null;

    let nearest = towers[0];
    let minDistance = this.calculateDistance(lat, lon, nearest.lat, nearest.lon);

    towers.forEach(tower => {
      const distance = this.calculateDistance(lat, lon, tower.lat, tower.lon);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = tower;
      }
    });

    return nearest;
  }

  /**
   * Calculate distance between two points
   * @param {number} lat1 - First point latitude
   * @param {number} lon1 - First point longitude
   * @param {number} lat2 - Second point latitude
   * @param {number} lon2 - Second point longitude
   * @returns {number} Distance in kilometers
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  /**
   * Connect hiker to nearest available tower
   * @param {Object} hiker - Hiker object
   * @returns {Tower|null} Connected tower or null
   */
  connectHikerToTower(hiker) {
    const nearestTower = this.findNearestTower(hiker.lat, hiker.lon);
    if (nearestTower && nearestTower.isOperational()) {
      nearestTower.addConnection();
      this.notifyUpdate();
      return nearestTower;
    }
    return null;
  }

  /**
   * Disconnect hiker from tower
   * @param {string} towerId - Tower ID
   * @returns {boolean} Success status
   */
  disconnectHikerFromTower(towerId) {
    const tower = this.getTowerById(towerId);
    if (tower) {
      const success = tower.removeConnection();
      if (success) {
        this.notifyUpdate();
      }
      return success;
    }
    return false;
  }

  /**
   * Load towers from data
   * @param {Array} towersData - Array of tower data
   */
  loadTowers(towersData) {
    this.towers = towersData.map(data => 
      data instanceof Tower ? data : Tower.fromJSON(data)
    );
    this.updateNextId();
    this.notifyUpdate();
  }

  /**
   * Update next ID based on existing towers
   */
  updateNextId() {
    const maxId = this.towers.reduce((max, tower) => {
      const num = parseInt(tower.id.replace('tower_', ''));
      return isNaN(num) ? max : Math.max(max, num);
    }, 0);
    this.nextId = maxId + 1;
  }

  /**
   * Register update callback
   * @param {Function} callback - Callback function
   */
  onUpdate(callback) {
    this.updateCallbacks.push(callback);
  }

  /**
   * Notify all callbacks of update
   */
  notifyUpdate() {
    this.updateCallbacks.forEach(callback => {
      try {
        callback(this.towers);
      } catch (error) {
        console.error('Error in tower update callback:', error);
      }
    });
  }

  /**
   * Get tower statistics
   * @returns {Object} Statistics object
   */
  getStatistics() {
    const total = this.towers.length;
    const active = this.towers.filter(t => t.status === 'Active').length;
    const maintenance = this.towers.filter(t => t.status === 'Maintenance').length;
    const offline = this.towers.filter(t => t.status === 'Offline').length;
    const towers = this.towers.filter(t => t.type === 'Tower').length;
    const basecamps = this.towers.filter(t => t.type === 'Basecamp').length;
    const totalConnections = this.towers.reduce((sum, t) => sum + t.connectionCount, 0);

    return {
      total,
      active,
      maintenance,
      offline,
      towers,
      basecamps,
      totalConnections,
      operational: this.getOperationalTowers().length
    };
  }

  /**
   * Export towers data
   * @returns {Array} Serializable tower data
   */
  exportData() {
    return this.towers.map(tower => tower.toJSON());
  }
}

export default TowerManager; 