/**
 * Tower Modal Component - Handles the tower/basecamp detail modal
 */
import { flashUpdate, updateNodeName } from '../../../utils/index.js';

class TowerModalComponent {
  /**
   * Initialize the Tower Modal component
   * @param {string} modalId - The ID of the modal element
   */
  constructor(modalId = 'tower-modal') {
    this.modalId = modalId;
    this.nameId = 'tower-modal-name';
    this.typeId = 'tower-modal-type';
    this.statusId = 'tower-modal-status';
    this.signalStrengthId = 'tower-modal-signal';
    this.signalBarId = 'tower-modal-signal-bar';
    this.lastUpdateId = 'tower-modal-lastupdate';
    this.coordsId = 'tower-modal-coords';
    this.connectHikersBtnId = 'connect-hikers';
    this.viewCoverageBtnId = 'view-coverage';
    this.closeBtnClass = 'close-btn';
    
    this.activeTowerId = null;
    this.activeTower = null;
    this.originalNodeName = ''; // Store original name to detect changes
    this.originalCoverageRadius = 0; // Store original coverage radius to detect changes
  }

  /**
   * Initialize the modal
   * @param {Function} onConnectHikers - Callback for connect hikers button
   * @param {Function} onViewCoverage - Callback for view coverage button
   */
  init(onConnectHikers, onViewCoverage) {
    // Set up close button
    document.querySelector(`#${this.modalId} .${this.closeBtnClass}`)?.addEventListener('click', () => {
      this.closeModal();
    });
    
    // Set up connect hikers button
    document.getElementById(this.connectHikersBtnId)?.addEventListener('click', () => {
      if (onConnectHikers && this.activeTowerId !== null) {
        onConnectHikers(this.activeTowerId);
        this.closeModal();
      }
    });
    
    // Set up view coverage button
    document.getElementById(this.viewCoverageBtnId)?.addEventListener('click', () => {
      if (onViewCoverage && this.activeTowerId !== null) {
        onViewCoverage(this.activeTowerId);
      }
    });
    
    // Set up editable name handling
    this.setupEditableName();
    
    // Set up editable coverage radius handling
    this.setupEditableCoverage();
    
    // Add "Live" indicator
    this.addUpdateIndicator();
    
    return this;
  }
  
  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {boolean} isError - Whether this is an error notification
   */
  showToast(message, isError = false) {
    // Remove any existing toasts
    const existingToast = document.querySelector('.tower-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `tower-toast${isError ? ' error' : ''}`;
    toast.innerHTML = `
      <i class="fas fa-${isError ? 'exclamation-circle' : 'check-circle'}"></i>
      <span>${message}</span>
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Remove after animation completes
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
  
  /**
   * Update node name in Firebase
   * @param {string} newName - The new name for the node
   */
  async updateNodeName(newName) {
    if (!this.activeTowerId) return;
    
    try {
      console.log(`Updating tower node ${this.activeTowerId} name to: ${newName}`);
      const success = await updateNodeName(this.activeTowerId, newName);
      
      if (success) {
        console.log(`Tower node name updated to: ${newName}`);
        this.showToast(`Tower name updated to: ${newName}`);
        // UI will update through real-time listener
      } else {
        console.error('Failed to update tower node name');
        this.showToast('Failed to update the tower name', true);
        
        // Revert to original name in UI
        const nameElement = document.getElementById(this.nameId);
        if (nameElement) {
          nameElement.textContent = this.originalNodeName;
        }
      }
    } catch (error) {
      console.error('Error updating tower node name:', error);
      this.showToast('Error updating tower name', true);
      
      // Revert to original name in UI
      const nameElement = document.getElementById(this.nameId);
      if (nameElement) {
        nameElement.textContent = this.originalNodeName;
      }
    }
  }

  // Removed getCoverageColor method since we're not using visual indicators

  /**
   * Add a live update indicator to the modal header
   */
  addUpdateIndicator() {
    const header = document.querySelector(`#${this.modalId} .modal-header h3`);
    if (header && !header.querySelector('.update-indicator')) {
      const indicator = document.createElement('div');
      indicator.classList.add('update-indicator');
      indicator.innerHTML = '<div class="update-pulse"></div>Live';
      header.appendChild(indicator);
    }
  }

  /**
   * Open the modal for a specific tower/basecamp
   * @param {Object} tower - The tower/basecamp object
   */
  openModal(tower) {
    this.activeTowerId = tower.id;
    this.activeTower = tower;
    this.updateModalContent(tower);
    const modal = document.getElementById(this.modalId);
    modal.classList.add('active');
  }

  /**
   * Close the modal
   */
  closeModal() {
    const modal = document.getElementById(this.modalId);
    modal.classList.remove('active');
    this.activeTowerId = null;
    this.activeTower = null;
  }

  /**
   * Update the modal content with tower/basecamp data
   * @param {Object} tower - The tower/basecamp object
   */
  updateModalContent(tower) {
    // Store reference to active tower
    this.activeTower = tower;
    
    console.log(`Updating tower modal for ${tower.type} ${tower.id} with coordinates:`, {
      lat: tower.lat,
      lon: tower.lon,
      timestamp: new Date(tower.lastUpdate).toLocaleTimeString()
    });
    
    // Update header icon based on tower type
    const headerIcon = document.querySelector(`#${this.modalId} .modal-header h3 i[data-lucide]`);
    if (headerIcon) {
      const iconName = tower.type === 'Tower' ? 'radio-tower' : 'house-wifi';
      headerIcon.setAttribute('data-lucide', iconName);
      // Refresh this specific icon
      if (typeof lucide !== 'undefined') {
        lucide.createIcons([headerIcon]);
      }
    }
    
    // Update all content
    document.getElementById(this.nameId).textContent = tower.name || `${tower.type} ${tower.id}`;
    document.getElementById(this.typeId).textContent = tower.type || 'Tower';
    document.getElementById(this.statusId).textContent = tower.status || 'Active';
    
    // Update coverage radius - display only the value in meters
    const coverageRadius = tower.coverageRadius || tower.signalStrength || 500; // Backward compatibility
    this.originalCoverageRadius = coverageRadius; // Store for editing
    document.getElementById(this.signalStrengthId).textContent = `${coverageRadius}m`;
    
    // Hide the visual bar since we're not showing percentages
    const signalBar = document.getElementById(this.signalBarId);
    if (signalBar) {
      signalBar.style.display = 'none';
    }
    
    document.getElementById(this.lastUpdateId).textContent = new Date(tower.lastUpdate || Date.now()).toLocaleTimeString();
    
    // Format and update coordinates
    const formattedCoords = `${tower.lat.toFixed(5)}, ${tower.lon.toFixed(5)}`;
    document.getElementById(this.coordsId).textContent = formattedCoords;
    
    
    // Flash updates for all values
    flashUpdate(this.nameId);
    flashUpdate(this.typeId);
    flashUpdate(this.statusId);
    flashUpdate(this.signalStrengthId);
    flashUpdate(this.coordsId);
    flashUpdate(this.lastUpdateId);
  }

  /**
   * Check if the modal is currently open for a specific tower
   * @param {string|number} towerId - The ID of the tower
   * @returns {boolean} True if modal is open for the specified tower
   */
  isOpenForTower(towerId) {
    return this.activeTowerId === towerId && 
           document.getElementById(this.modalId).classList.contains('active');
  }

  /**
   * Set up editable name handling
   */
  setupEditableName() {
    const nameElement = document.getElementById(this.nameId);
    if (!nameElement) return;
    
    // Store original value when starting edit
    nameElement.addEventListener('focus', () => {
      this.originalNodeName = nameElement.textContent.trim();
      console.log('Started editing tower node name, original:', this.originalNodeName);
    });
    
    // Handle edit completion
    nameElement.addEventListener('blur', () => {
      const newName = nameElement.textContent.trim();
      
      // Prevent empty names
      if (!newName) {
        nameElement.textContent = this.originalNodeName;
        return;
      }
      
      // Only update if name changed
      if (newName !== this.originalNodeName) {
        this.updateNodeName(newName);
      }
    });
    
    // Handle enter key to confirm edit
    nameElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        nameElement.blur(); // Trigger blur event to save
      }
    });
  }

  /**
   * Set up editable coverage radius handling
   */
  setupEditableCoverage() {
    const coverageElement = document.getElementById(this.signalStrengthId);
    if (!coverageElement) return;
    
    // Store original value when starting edit
    coverageElement.addEventListener('focus', () => {
      this.originalCoverageRadius = parseInt(coverageElement.textContent.replace('m', '')) || 500;
      console.log('Started editing coverage radius, original:', this.originalCoverageRadius);
    });
    
    // Handle edit completion
    coverageElement.addEventListener('blur', () => {
      const newCoverageText = coverageElement.textContent.trim().replace('m', '');
      const newCoverage = parseInt(newCoverageText);
      
      // Validate coverage radius (must be a positive number)
      if (!newCoverage || newCoverage <= 0 || isNaN(newCoverage)) {
        coverageElement.textContent = `${this.originalCoverageRadius}m`;
        this.showToast('Coverage radius must be a positive number', true);
        return;
      }
      
      // Ensure it shows 'm' suffix
      coverageElement.textContent = `${newCoverage}m`;
      
      // Only update if coverage changed
      if (newCoverage !== this.originalCoverageRadius) {
        this.updateCoverageRadius(newCoverage);
      }
    });
    
    // Handle enter key to confirm edit
    coverageElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        coverageElement.blur(); // Trigger blur event to save
      }
      
      // Only allow numbers and backspace/delete
      if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        e.preventDefault();
      }
    });
  }

  /**
   * Update coverage radius in the tower data
   * @param {number} newRadius - The new coverage radius in meters
   */
  async updateCoverageRadius(newRadius) {
    if (!this.activeTowerId || !this.activeTower) return;
    
    try {
      console.log(`Updating tower ${this.activeTowerId} coverage radius to: ${newRadius}m`);
      
      // Update the local tower object
      this.activeTower.coverageRadius = newRadius;
      this.activeTower.coverageRange = newRadius; // Backward compatibility
      this.activeTower.lastUpdate = Date.now();
      
      this.showToast(`Coverage radius updated to: ${newRadius}m`);
      console.log(`Tower coverage radius updated to: ${newRadius}m`);
      
      // Note: In a real application, you might want to save this to a database
      // For now, it's just stored in the local object
      
    } catch (error) {
      console.error('Error updating coverage radius:', error);
      this.showToast('Error updating coverage radius', true);
      
      // Revert to original value in UI
      const coverageElement = document.getElementById(this.signalStrengthId);
      if (coverageElement) {
        coverageElement.textContent = `${this.originalCoverageRadius}m`;
      }
    }
  }
}

export default TowerModalComponent; 