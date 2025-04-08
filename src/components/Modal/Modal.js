/**
 * Modal Component - Handles the hiker detail modal
 */
import { flashUpdate, getBatteryColor } from '../../utils/helpers.js';

class ModalComponent {
  /**
   * Initialize the Modal component
   * @param {string} modalId - The ID of the modal element
   */
  constructor(modalId = 'hiker-modal') {
    this.modalId = modalId;
    this.nameId = 'modal-name';
    this.statusId = 'modal-status';
    this.batteryId = 'modal-battery';
    this.batteryFillId = 'modal-battery-fill';
    this.lastUpdateId = 'modal-lastupdate';
    this.coordsId = 'modal-coords';
    this.trackBtnId = 'track-hiker';
    this.sendMessageBtnId = 'send-message';
    this.closeBtnClass = 'close-btn';
    
    // SOS related elements
    this.sosStatusContainerId = 'sos-status-container';
    this.sosHandledStatusId = 'sos-handled-status';
    this.sosActionsId = 'sos-actions';
    this.markSosHandledBtnId = 'mark-sos-handled';
    this.markSosEmergencyBtnId = 'mark-sos-emergency';
    
    this.activeHikerId = null;
    this.activeHiker = null;
  }

  /**
   * Initialize the modal
   * @param {Function} onTrackHiker - Callback for track hiker button
   * @param {Function} onSendMessage - Callback for send message button
   * @param {Function} onMarkSosHandled - Callback for mark SOS handled button
   * @param {Function} onMarkSosEmergency - Callback for emergency services button
   */
  init(onTrackHiker, onSendMessage, onMarkSosHandled, onMarkSosEmergency) {
    // Set up close button
    document.querySelector(`#${this.modalId} .${this.closeBtnClass}`)?.addEventListener('click', () => {
      this.closeModal();
    });
    
    // Set up track button
    document.getElementById(this.trackBtnId)?.addEventListener('click', () => {
      if (onTrackHiker && this.activeHikerId !== null) {
        onTrackHiker(this.activeHikerId);
        this.closeModal();
      }
    });
    
    // Set up send message button
    document.getElementById(this.sendMessageBtnId)?.addEventListener('click', () => {
      if (onSendMessage && this.activeHikerId !== null) {
        onSendMessage(this.activeHikerId);
      }
    });
    
    // Set up SOS handling buttons
    document.getElementById(this.markSosHandledBtnId)?.addEventListener('click', () => {
      if (onMarkSosHandled && this.activeHiker && this.activeHiker.sos && !this.activeHiker.sosHandled) {
        onMarkSosHandled(this.activeHikerId);
        this.updateSosStatus(this.activeHiker);
      }
    });
    
    document.getElementById(this.markSosEmergencyBtnId)?.addEventListener('click', () => {
      if (onMarkSosEmergency && this.activeHiker && this.activeHiker.sos && !this.activeHiker.sosEmergencyDispatched) {
        onMarkSosEmergency(this.activeHikerId);
        this.updateSosStatus(this.activeHiker);
      }
    });
    
    // Add "Live" indicator
    this.addUpdateIndicator();
    
    return this;
  }

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
   * Open the modal for a specific hiker
   * @param {Object} hiker - The hiker object
   */
  openModal(hiker) {
    this.activeHikerId = hiker.id;
    this.activeHiker = hiker;
    this.updateModalContent(hiker);
    const modal = document.getElementById(this.modalId);
    modal.classList.add('active');
  }

  /**
   * Close the modal
   */
  closeModal() {
    const modal = document.getElementById(this.modalId);
    modal.classList.remove('active');
    this.activeHikerId = null;
    this.activeHiker = null;
  }

  /**
   * Update SOS status display in the modal
   * @param {Object} hiker - The hiker object
   */
  updateSosStatus(hiker) {
    const sosStatusContainer = document.getElementById(this.sosStatusContainerId);
    const sosActions = document.getElementById(this.sosActionsId);
    const sosHandledStatus = document.getElementById(this.sosHandledStatusId);
    const markSosHandledBtn = document.getElementById(this.markSosHandledBtnId);
    const markSosEmergencyBtn = document.getElementById(this.markSosEmergencyBtnId);
    
    if (!hiker.sos) {
      // Hide SOS elements if no SOS
      sosStatusContainer.style.display = 'none';
      sosActions.style.display = 'none';
      return;
    }
    
    // Show SOS elements
    sosStatusContainer.style.display = 'flex';
    sosActions.style.display = 'flex';
    
    // Update status text
    const statusText = hiker.getSosStatusText();
    sosHandledStatus.textContent = statusText;
    
    // Update icon
    const statusIcon = sosStatusContainer.querySelector('.detail-icon');
    if (hiker.sosHandled || hiker.sosEmergencyDispatched) {
      statusIcon.classList.add('handled');
      sosHandledStatus.classList.add('handled');
      sosHandledStatus.classList.remove('pending');
    } else {
      statusIcon.classList.remove('handled');
      sosHandledStatus.classList.remove('handled');
      sosHandledStatus.classList.add('pending');
    }
    
    // Update button states
    if (hiker.sosHandled) {
      markSosHandledBtn.classList.add('disabled');
      markSosHandledBtn.disabled = true;
    } else {
      markSosHandledBtn.classList.remove('disabled');
      markSosHandledBtn.disabled = false;
    }
    
    if (hiker.sosEmergencyDispatched) {
      markSosEmergencyBtn.classList.add('disabled');
      markSosEmergencyBtn.disabled = true;
    } else {
      markSosEmergencyBtn.classList.remove('disabled');
      markSosEmergencyBtn.disabled = false;
    }
  }

  /**
   * Update the modal content with hiker data
   * @param {Object} hiker - The hiker object
   */
  updateModalContent(hiker) {
    // Store reference to active hiker
    this.activeHiker = hiker;
    
    // Store current values to check for changes
    const element = document.getElementById(this.statusId);
    const prevStatus = element ? element.textContent : '';
    
    const batteryElement = document.getElementById(this.batteryId);
    const prevBattery = batteryElement ? batteryElement.textContent : '';
    
    const coordsElement = document.getElementById(this.coordsId);
    const prevCoords = coordsElement ? coordsElement.textContent : '';
    
    // Update all content
    document.getElementById(this.nameId).textContent = hiker.name;
    document.getElementById(this.statusId).textContent = hiker.status;
    document.getElementById(this.batteryId).textContent = `${Math.round(hiker.battery)}%`;
    
    const batteryFill = document.getElementById(this.batteryFillId);
    if (batteryFill) {
      batteryFill.style.width = `${hiker.battery}%`;
      batteryFill.style.backgroundColor = getBatteryColor(hiker.battery);
    }
    
    document.getElementById(this.lastUpdateId).textContent = new Date(hiker.lastUpdate).toLocaleTimeString();
    document.getElementById(this.coordsId).textContent = `${hiker.lat.toFixed(5)}, ${hiker.lon.toFixed(5)}`;
    
    // Update SOS status and actions
    this.updateSosStatus(hiker);
    
    // Flash updates for changed values
    if (prevStatus !== hiker.status) {
      flashUpdate(this.statusId);
    }
    
    if (prevBattery !== `${Math.round(hiker.battery)}%`) {
      flashUpdate(this.batteryId);
    }
    
    if (prevCoords !== `${hiker.lat.toFixed(5)}, ${hiker.lon.toFixed(5)}`) {
      flashUpdate(this.coordsId);
    }
    
    // Always flash the last update time
    flashUpdate(this.lastUpdateId);
  }

  /**
   * Check if the modal is currently open for a specific hiker
   * @param {string|number} hikerId - The ID of the hiker
   * @returns {boolean} True if modal is open for the specified hiker
   */
  isOpenForHiker(hikerId) {
    return this.activeHikerId === hikerId && 
           document.getElementById(this.modalId).classList.contains('active');
  }
}

export default ModalComponent; 