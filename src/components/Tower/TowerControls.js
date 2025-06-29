/**
 * Tower Controls - Handles manual tower addition and controls
 */
class TowerControls {
  constructor(towerManager, mapComponent) {
    this.towerManager = towerManager;
    this.mapComponent = mapComponent;
    this.addTowerBtn = null;
    this.dialogMapClickHandler = null;
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
    this.addTowerBtn.title = 'Add a new tower or basecamp';
    this.addTowerBtn.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      z-index: 1000;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      background: #4299E1;
      color: white;
      font-size: 20px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    document.body.appendChild(this.addTowerBtn);

    // Add hover effect
    this.addTowerBtn.addEventListener('mouseenter', () => {
      this.addTowerBtn.style.transform = 'scale(1.1)';
      this.addTowerBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });
    
    this.addTowerBtn.addEventListener('mouseleave', () => {
      this.addTowerBtn.style.transform = 'scale(1)';
      this.addTowerBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Add tower button - opens dialog directly
    if (this.addTowerBtn) {
      this.addTowerBtn.addEventListener('click', () => {
        this.showTowerCreationDialog(); // Open dialog directly with both options
      });
    }

    // ESC key to close any open dialogs
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close tower creation dialog if open
        const backdrop = document.querySelector('.tower-creation-backdrop');
        if (backdrop) {
          // Restore pointer events before removing
          backdrop.style.pointerEvents = 'auto';
          backdrop.remove();
          this.disableMapSelectionMode();
        }
      }
    });
  }

  // Removed old map-clicking mode methods - now using dialog-only approach

  /**
   * Show tower creation dialog
   * @param {number} lat - Latitude (optional)
   * @param {number} lon - Longitude (optional)
   */
  showTowerCreationDialog(lat = null, lon = null) {
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
      width: 450px;
      max-width: 90vw;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    `;

    const hasInitialCoords = lat !== null && lon !== null;

    dialog.innerHTML = `
      <h3 style="margin: 0 0 20px 0; color: #2d3748; display: flex; align-items: center; gap: 10px;">
        <i data-lucide="radio-tower"></i>
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
            <option value="Basecamp">🏠 Basecamp Station</option>
          </select>
        </div>
        
        <div class="form-group" style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #4a5568;">Coverage Radius (meters):</label>
          <input type="number" id="tower-coverage" min="50" max="2000" value="500"
                 style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;"
                 placeholder="Enter coverage radius in meters">
        </div>
        
        <!-- Coordinate Input Method Toggle -->
        <div class="form-group" style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #4a5568;">Location:</label>
          <div class="coordinate-method-toggle" style="display: flex; background: #f7fafc; border-radius: 8px; padding: 4px; margin-bottom: 12px;">
            <button type="button" id="map-select-mode" class="coord-method-btn ${hasInitialCoords ? 'active' : ''}" 
                    style="flex: 1; padding: 8px 12px; border: none; background: ${hasInitialCoords ? '#4299E1' : 'transparent'}; 
                           color: ${hasInitialCoords ? 'white' : '#4a5568'}; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;">
              <i class="fas fa-map-marker-alt"></i> Select on Map
            </button>
            <button type="button" id="manual-input-mode" class="coord-method-btn ${!hasInitialCoords ? 'active' : ''}"
                    style="flex: 1; padding: 8px 12px; border: none; background: ${!hasInitialCoords ? '#4299E1' : 'transparent'}; 
                           color: ${!hasInitialCoords ? 'white' : '#4a5568'}; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;">
              <i class="fas fa-keyboard"></i> Manual Input
            </button>
          </div>
          
          <!-- Map Selection Display -->
                     <div id="map-coordinates-display" style="display: ${hasInitialCoords ? 'block' : 'none'};">
             <div id="coordinates-box" style="padding: 10px; background: #f0fff4; border: 2px solid #68d391; border-radius: 8px; color: #2f855a; font-family: monospace; display: flex; align-items: center; gap: 8px;">
               <i class="fas fa-map-pin"></i>
               <span id="selected-coordinates">${hasInitialCoords ? `${lat.toFixed(6)}, ${lon.toFixed(6)}` : 'Click on map to select'}</span>
             </div>
             <div id="map-instruction" style="margin-top: 8px; font-size: 12px; color: #718096; display: flex; align-items: center; gap: 6px;">
               <i class="fas fa-info-circle"></i>
               <span id="map-instruction-text">Click on the map to select location</span>
             </div>
           </div>
          
          <!-- Manual Input Fields -->
          <div id="manual-coordinates-input" style="display: ${!hasInitialCoords ? 'block' : 'none'};">
            <div style="display: flex; gap: 12px;">
              <div style="flex: 1;">
                <label style="display: block; margin-bottom: 4px; font-size: 12px; font-weight: 500; color: #4a5568;">Latitude:</label>
                <input type="number" id="manual-lat" step="0.000001" 
                       style="width: 100%; padding: 8px; border: 2px solid #e2e8f0; border-radius: 6px; font-size: 13px; font-family: monospace;"
                       placeholder="e.g., 3.139000" value="${hasInitialCoords ? lat.toFixed(6) : ''}">
              </div>
              <div style="flex: 1;">
                <label style="display: block; margin-bottom: 4px; font-size: 12px; font-weight: 500; color: #4a5568;">Longitude:</label>
                <input type="number" id="manual-lon" step="0.000001"
                       style="width: 100%; padding: 8px; border: 2px solid #e2e8f0; border-radius: 6px; font-size: 13px; font-family: monospace;"
                       placeholder="e.g., 101.686900" value="${hasInitialCoords ? lon.toFixed(6) : ''}">
              </div>
            </div>
            <div style="margin-top: 8px; font-size: 12px; color: #718096; display: flex; align-items: center; gap: 6px;">
              <i class="fas fa-info-circle"></i>
              Use decimal degrees format (e.g., 3.139000, 101.686900)
            </div>
          </div>
        </div>
        
        <div class="form-actions" style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
          <button type="button" id="cancel-tower" 
                  style="padding: 10px 20px; border: 2px solid #e2e8f0; background: white; color: #4a5568; border-radius: 8px; font-weight: 500; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" 
                  style="padding: 10px 20px; border: none; background: #4299E1; color: white; border-radius: 8px; font-weight: 500; cursor: pointer;">
            <i class="fas fa-plus"></i> Create Tower
          </button>
        </div>
      </form>
    `;

    backdrop.appendChild(dialog);
    document.body.appendChild(backdrop);

    // Refresh Lucide icons in the dialog
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 50);

    // Store current coordinates
    let currentLat = lat;
    let currentLon = lon;
    let isMapSelectionActive = false;

    // Set up map click handler for coordinate selection within dialog FIRST
    this.dialogMapClickHandler = (e) => {
      console.log('Map clicked at:', e.latlng.lat, e.latlng.lng);
      
      currentLat = e.latlng.lat;
      currentLon = e.latlng.lng;
      
      // Update display
      const coordsElement = document.getElementById('selected-coordinates');
      if (coordsElement) {
        coordsElement.textContent = `${currentLat.toFixed(6)}, ${currentLon.toFixed(6)}`;
      }
      
      // Update manual inputs if they exist
      const manualLatInput = document.getElementById('manual-lat');
      const manualLonInput = document.getElementById('manual-lon');
      if (manualLatInput && manualLonInput) {
        manualLatInput.value = currentLat.toFixed(6);
        manualLonInput.value = currentLon.toFixed(6);
      }
      
      // Show success feedback
      const coordsBox = document.getElementById('coordinates-box');
      const instructionText = document.getElementById('map-instruction-text');
      if (coordsBox && instructionText) {
        coordsBox.style.background = '#e6fffa';
        coordsBox.style.borderColor = '#4fd1c7';
        instructionText.textContent = 'Location selected! Click again to change or switch to manual input';
        
        // Reset after 2 seconds
        setTimeout(() => {
          coordsBox.style.background = '#f0fff4';
          coordsBox.style.borderColor = '#68d391';
          instructionText.textContent = 'Click on the map to select location';
        }, 2000);
      }
    };

    // Focus on name input
    setTimeout(() => {
      document.getElementById('tower-name').focus();
    }, 100);

    // Handle coordinate method toggle
    const mapSelectBtn = document.getElementById('map-select-mode');
    const manualInputBtn = document.getElementById('manual-input-mode');
    const mapDisplay = document.getElementById('map-coordinates-display');
    const manualInput = document.getElementById('manual-coordinates-input');

        mapSelectBtn.addEventListener('click', () => {
      // Switch to map selection mode
      mapSelectBtn.style.background = '#667eea';
      mapSelectBtn.style.color = 'white';
      manualInputBtn.style.background = 'transparent';
      manualInputBtn.style.color = '#4a5568';
      
      mapDisplay.style.display = 'block';
      manualInput.style.display = 'none';

             // Enable map clicking for coordinate selection
       isMapSelectionActive = true;
       this.startMapSelectionMode(backdrop);
       
       // Make backdrop allow clicks to pass through to map
       backdrop.style.pointerEvents = 'none';
       // But keep the dialog interactive
       dialog.style.pointerEvents = 'auto';
       
       // Update instruction
       const instructionText = document.getElementById('map-instruction-text');
       if (instructionText) {
         instructionText.textContent = 'Click on the map to select location (dialog will stay open)';
       }
    });

    manualInputBtn.addEventListener('click', () => {
      // Switch to manual input mode
      manualInputBtn.style.background = '#667eea';
      manualInputBtn.style.color = 'white';
      mapSelectBtn.style.background = 'transparent';
      mapSelectBtn.style.color = '#4a5568';
      
      mapDisplay.style.display = 'none';
      manualInput.style.display = 'block';

      // Populate manual inputs with current coordinates
      if (currentLat !== null && currentLon !== null) {
        document.getElementById('manual-lat').value = currentLat.toFixed(6);
        document.getElementById('manual-lon').value = currentLon.toFixed(6);
      }

             // Disable map clicking
       isMapSelectionActive = false;
       this.disableMapSelectionMode();
       
       // Restore backdrop click handling
       backdrop.style.pointerEvents = 'auto';
       dialog.style.pointerEvents = 'auto';
       
       // Reset instruction
       const instructionText = document.getElementById('map-instruction-text');
       if (instructionText) {
         instructionText.textContent = 'Enter coordinates manually in the fields below';
       }
    });

    // Handle manual coordinate input changes
    const manualLatInput = document.getElementById('manual-lat');
    const manualLonInput = document.getElementById('manual-lon');
    
    [manualLatInput, manualLonInput].forEach(input => {
      input.addEventListener('input', () => {
        const manualLat = parseFloat(manualLatInput.value);
        const manualLon = parseFloat(manualLonInput.value);
        
        if (!isNaN(manualLat) && !isNaN(manualLon)) {
          currentLat = manualLat;
          currentLon = manualLon;
        }
      });
    });

    // Handle form submission
    document.getElementById('tower-creation-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('tower-name').value.trim();
      const type = document.getElementById('tower-type').value;
      const coverage = parseInt(document.getElementById('tower-coverage').value) || 500;
      
      // Get final coordinates
      let finalLat = currentLat;
      let finalLon = currentLon;
      
      // If in manual input mode, get values from inputs
      if (manualInput.style.display !== 'none') {
        finalLat = parseFloat(document.getElementById('manual-lat').value);
        finalLon = parseFloat(document.getElementById('manual-lon').value);
      }
      
      // Validation
      if (!name) {
        this.showDialogError('Please enter a tower name');
        return;
      }
      
      if (isNaN(finalLat) || isNaN(finalLon)) {
        this.showDialogError('Please provide valid coordinates');
        return;
      }
      
      if (finalLat < -90 || finalLat > 90) {
        this.showDialogError('Latitude must be between -90 and 90 degrees');
        return;
      }
      
      if (finalLon < -180 || finalLon > 180) {
        this.showDialogError('Longitude must be between -180 and 180 degrees');
        return;
      }
      
      if (coverage < 50 || coverage > 2000) {
        this.showDialogError('Coverage radius must be between 50 and 2000 meters');
        return;
      }
      
      this.createTower(name, finalLat, finalLon, type, coverage);
      isMapSelectionActive = false;
      // Restore pointer events before removing
      backdrop.style.pointerEvents = 'auto';
      backdrop.remove();
      this.disableMapSelectionMode();
    });

    // Handle cancel
    document.getElementById('cancel-tower').addEventListener('click', () => {
      isMapSelectionActive = false;
      // Restore pointer events before removing
      backdrop.style.pointerEvents = 'auto';
      backdrop.remove();
      this.disableMapSelectionMode();
    });

    // Handle backdrop click - but not when map selection is active
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop && !isMapSelectionActive) {
        backdrop.remove();
        this.disableMapSelectionMode();
      }
    });

    // If starting in map selection mode and coordinates are provided
    if (hasInitialCoords && mapDisplay.style.display !== 'none') {
      isMapSelectionActive = true;
      this.startMapSelectionMode(backdrop);
      // Make backdrop allow clicks to pass through to map
      backdrop.style.pointerEvents = 'none';
      // But keep the dialog interactive
      dialog.style.pointerEvents = 'auto';
    }
    
    // Cleanup function to remove map click handler when dialog closes
    const cleanup = () => {
      // Restore pointer events if needed
      if (backdrop.style.pointerEvents === 'none') {
        backdrop.style.pointerEvents = 'auto';
      }
      this.disableMapSelectionMode();
      // Remove the dialogMapClickHandler reference
      this.dialogMapClickHandler = null;
    };
    
    // Store cleanup function for later use
    backdrop.addEventListener('remove', cleanup);
  }

  /**
   * Create a new tower
   * @param {string} name - Tower name
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @param {string} type - Tower type
   * @param {number} coverage - Coverage radius in meters
   */
  createTower(name, lat, lon, type, coverage = 500) {
    try {
      const tower = this.towerManager.addTower(name, lat, lon, type, coverage);
      
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
   * Start map selection mode for coordinate picking
   * @param {HTMLElement} backdrop - Dialog backdrop element
   */
  startMapSelectionMode(backdrop) {
    const map = this.mapComponent.getMap();
    if (map && this.dialogMapClickHandler) {
      map.on('click', this.dialogMapClickHandler);
      map.getContainer().style.cursor = 'crosshair';
      
      // Show instruction
      this.showInstruction('Click on the map to select coordinates for the tower');
      console.log('Map selection mode activated - click handler attached');
    } else {
      console.error('Failed to activate map selection mode:', {
        map: !!map,
        handler: !!this.dialogMapClickHandler
      });
    }
  }

  /**
   * Disable map selection mode
   */
  disableMapSelectionMode() {
    const map = this.mapComponent.getMap();
    if (map && this.dialogMapClickHandler) {
      map.off('click', this.dialogMapClickHandler);
      map.getContainer().style.cursor = '';
      this.hideInstruction();
    }
  }

  /**
   * Show error message within dialog
   * @param {string} message - Error message
   */
  showDialogError(message) {
    // Remove existing error if any
    const existingError = document.querySelector('.dialog-error');
    if (existingError) {
      existingError.remove();
    }

    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'dialog-error';
    errorDiv.style.cssText = `
      margin: 12px 0;
      padding: 10px;
      background: #fed7d7;
      border: 1px solid #feb2b2;
      border-radius: 6px;
      color: #c53030;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    errorDiv.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      ${message}
    `;

    // Insert before form actions
    const formActions = document.querySelector('.form-actions');
    if (formActions) {
      formActions.parentNode.insertBefore(errorDiv, formActions);
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
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
      background: #4299E1;
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
    
    this.hideInstruction();
  }
}

export default TowerControls; 