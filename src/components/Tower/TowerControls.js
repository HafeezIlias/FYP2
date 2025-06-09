/**
 * Tower Controls - Handles manual tower addition and controls
 */
class TowerControls {
  constructor(towerManager, mapComponent) {
    this.towerManager = towerManager;
    this.mapComponent = mapComponent;
    this.isAddingTower = false;
    this.addTowerBtn = null;
    this.mapClickHandler = null;
    this.cancelHandler = null;
  }

  /**
   * Initialize tower controls
   */
  init() {
    this.createFloatingButton();
    this.setupEventListeners();
    return this;
  }

  /**
   * Create floating add tower button
   */
  createFloatingButton() {
    // Check if button already exists
    if (document.getElementById('add-tower-btn')) {
      return;
    }

    this.addTowerBtn = document.createElement('button');
    this.addTowerBtn.id = 'add-tower-btn';
    this.addTowerBtn.className = 'floating-btn add-tower-btn';
    this.addTowerBtn.innerHTML = `
      <i class="fas fa-plus"></i>
      <span class="btn-tooltip">Add Tower</span>
    `;
    this.addTowerBtn.title = 'Click to add a new tower or basecamp';

    // Position the button
    this.addTowerBtn.style.position = 'fixed';
    this.addTowerBtn.style.bottom = '80px';
    this.addTowerBtn.style.right = '20px';
    this.addTowerBtn.style.zIndex = '1000';

    document.body.appendChild(this.addTowerBtn);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    if (this.addTowerBtn) {
      this.addTowerBtn.addEventListener('click', () => {
        this.toggleAddMode();
      });
    }

    // ESC key to cancel adding mode
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isAddingTower) {
        this.cancelAddMode();
      }
    });
  }

  /**
   * Toggle add tower mode
   */
  toggleAddMode() {
    if (this.isAddingTower) {
      this.cancelAddMode();
    } else {
      this.startAddMode();
    }
  }

  /**
   * Start add tower mode
   */
  startAddMode() {
    this.isAddingTower = true;
    
    // Update button appearance
    this.addTowerBtn.classList.add('active');
    this.addTowerBtn.innerHTML = `
      <i class="fas fa-times"></i>
      <span class="btn-tooltip">Cancel</span>
    `;

    // Change cursor
    document.body.style.cursor = 'crosshair';
    
    // Add map click handler
    this.mapClickHandler = (e) => {
      this.handleMapClick(e);
    };
    
    const map = this.mapComponent.getMap();
    if (map) {
      map.on('click', this.mapClickHandler);
    }

    // Show instruction
    this.showInstruction('Click on the map to place a tower or basecamp. Press ESC to cancel.');

    console.log('Started add tower mode');
  }

  /**
   * Cancel add tower mode
   */
  cancelAddMode() {
    this.isAddingTower = false;
    
    // Reset button appearance
    this.addTowerBtn.classList.remove('active');
    this.addTowerBtn.innerHTML = `
      <i class="fas fa-plus"></i>
      <span class="btn-tooltip">Add Tower</span>
    `;

    // Reset cursor
    document.body.style.cursor = 'default';
    
    // Remove map click handler
    const map = this.mapComponent.getMap();
    if (map && this.mapClickHandler) {
      map.off('click', this.mapClickHandler);
      this.mapClickHandler = null;
    }

    // Hide instruction
    this.hideInstruction();

    console.log('Cancelled add tower mode');
  }

  /**
   * Handle map click during add mode
   * @param {Object} e - Leaflet click event
   */
  handleMapClick(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    
    console.log(`Map clicked at: ${lat}, ${lon}`);
    
    // Show tower creation dialog
    this.showTowerCreationDialog(lat, lon);
  }

  /**
   * Show tower creation dialog
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   */
  showTowerCreationDialog(lat, lon) {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'tower-creation-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    `;

    // Create dialog
    const dialog = document.createElement('div');
    dialog.className = 'tower-creation-dialog';
    dialog.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 24px;
      width: 400px;
      max-width: 90vw;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    `;

    dialog.innerHTML = `
      <h3 style="margin: 0 0 20px 0; color: #2d3748; display: flex; align-items: center; gap: 10px;">
        <i class="fas fa-broadcast-tower"></i>
        Add New Infrastructure
      </h3>
      
      <form id="tower-creation-form">
        <div class="form-group" style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #4a5568;">Name:</label>
          <input type="text" id="tower-name" required 
                 style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;"
                 placeholder="Enter tower/basecamp name">
        </div>
        
        <div class="form-group" style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #4a5568;">Type:</label>
          <select id="tower-type" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
            <option value="Tower">📡 Communication Tower</option>
            <option value="Basecamp">🏕️ Basecamp Station</option>
          </select>
        </div>
        
        <div class="form-group" style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #4a5568;">Location:</label>
          <div style="padding: 10px; background: #f7fafc; border-radius: 8px; color: #4a5568; font-family: monospace;">
            ${lat.toFixed(5)}, ${lon.toFixed(5)}
          </div>
        </div>
        
        <div class="form-actions" style="display: flex; gap: 12px; justify-content: flex-end;">
          <button type="button" id="cancel-tower" 
                  style="padding: 10px 20px; border: 2px solid #e2e8f0; background: white; color: #4a5568; border-radius: 8px; font-weight: 500; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" 
                  style="padding: 10px 20px; border: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; font-weight: 500; cursor: pointer;">
            <i class="fas fa-plus"></i> Create
          </button>
        </div>
      </form>
    `;

    backdrop.appendChild(dialog);
    document.body.appendChild(backdrop);

    // Focus on name input
    setTimeout(() => {
      document.getElementById('tower-name').focus();
    }, 100);

    // Handle form submission
    document.getElementById('tower-creation-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('tower-name').value.trim();
      const type = document.getElementById('tower-type').value;
      
      if (name) {
        this.createTower(name, lat, lon, type);
        backdrop.remove();
        this.cancelAddMode();
      }
    });

    // Handle cancel
    document.getElementById('cancel-tower').addEventListener('click', () => {
      backdrop.remove();
    });

    // Handle backdrop click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.remove();
      }
    });
  }

  /**
   * Create a new tower
   * @param {string} name - Tower name
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @param {string} type - Tower type
   */
  createTower(name, lat, lon, type) {
    try {
      const tower = this.towerManager.addTower(name, lat, lon, type);
      
      this.showSuccessMessage(`${type} "${name}" added successfully!`);
      
      console.log(`Created new ${type}:`, tower);
      
      // Optionally center map on new tower
      setTimeout(() => {
        this.mapComponent.centerMap([lat, lon], 15);
      }, 500);
      
    } catch (error) {
      console.error('Error creating tower:', error);
      this.showErrorMessage('Failed to create tower. Please try again.');
    }
  }

  /**
   * Show instruction message
   * @param {string} message - Instruction text
   */
  showInstruction(message) {
    this.hideInstruction(); // Remove any existing instruction
    
    const instruction = document.createElement('div');
    instruction.id = 'tower-instruction';
    instruction.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1500;
      font-size: 14px;
      font-weight: 500;
      max-width: 90vw;
      text-align: center;
    `;
    instruction.textContent = message;
    
    document.body.appendChild(instruction);
  }

  /**
   * Hide instruction message
   */
  hideInstruction() {
    const existing = document.getElementById('tower-instruction');
    if (existing) {
      existing.remove();
    }
  }

  /**
   * Show success message
   * @param {string} message - Success message
   */
  showSuccessMessage(message) {
    this.showTemporaryMessage(message, 'success');
  }

  /**
   * Show error message
   * @param {string} message - Error message
   */
  showErrorMessage(message) {
    this.showTemporaryMessage(message, 'error');
  }

  /**
   * Show temporary message
   * @param {string} message - Message text
   * @param {string} type - Message type ('success' or 'error')
   */
  showTemporaryMessage(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1500;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideInRight 0.3s ease-out;
    `;
    
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      ${message}
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Destroy tower controls
   */
  destroy() {
    if (this.addTowerBtn) {
      this.addTowerBtn.remove();
    }
    
    this.cancelAddMode();
    this.hideInstruction();
  }
}

export default TowerControls; 