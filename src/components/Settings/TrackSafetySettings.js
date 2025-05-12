/**
 * Track Safety Settings Component
 * Allows administrators to create, edit, and manage safety tracks
 */
class TrackSafetySettings {
  /**
   * Initialize the Track Safety Settings component
   * @param {Object} trackManager - Instance of TrackSafetyManager
   * @param {Object} map - Map instance for visualization
   */
  constructor(trackManager, map = null) {
    this.trackManager = trackManager;
    this.map = map;
    this.containerId = 'track-safety-settings';
    this.modalId = 'track-create-modal';
    this.isCreatingTrack = false;
    this.editingTrackId = null;
    
    // Initialize DOM references
    this.container = null;
    this.createBtn = null;
    this.tracksList = null;
    this.modal = null;
    
    // Bind methods to this instance
    this.startTrackCreation = this.startTrackCreation.bind(this);
    this.cancelTrackCreation = this.cancelTrackCreation.bind(this);
    this.saveTrack = this.saveTrack.bind(this);
    this.renderTracksList = this.renderTracksList.bind(this);
  }
  
  /**
   * Initialize the component
   */
  init() {
    // Create the track safety settings container if it doesn't exist
    this.createContainer();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Render the initial tracks list
    this.renderTracksList();
    
    return this;
  }
  
  /**
   * Create the container and modal elements
   */
  createContainer() {
    // Check if container already exists
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      // Create the container element
      this.container = document.createElement('div');
      this.container.id = this.containerId;
      this.container.className = 'settings-section';
      
      // Create the section header
      const header = document.createElement('h3');
      header.textContent = 'Safety Tracks Management';
      this.container.appendChild(header);
      
      // Create description
      const description = document.createElement('p');
      description.textContent = 'Create and manage hiking tracks with safety corridors to ensure hikers stay on safe paths.';
      this.container.appendChild(description);
      
      // Create the create button
      this.createBtn = document.createElement('button');
      this.createBtn.id = 'create-track-btn';
      this.createBtn.className = 'btn btn-primary';
      this.createBtn.textContent = 'Create New Track';
      this.container.appendChild(this.createBtn);
      
      // Create tracks list container
      this.tracksList = document.createElement('div');
      this.tracksList.id = 'tracks-list';
      this.tracksList.className = 'tracks-list';
      this.container.appendChild(this.tracksList);
      
      // Add to the settings modal - FIX: Use the correct container selector
      const settingsModalContent = document.getElementById('track-safety-settings-container');
      if (settingsModalContent) {
        settingsModalContent.appendChild(this.container);
      } else {
        // Fallback to main settings content if container not found
        const fallbackContainer = document.querySelector('#settings-modal .settings-modal-content .modal-body');
        if (fallbackContainer) {
          fallbackContainer.appendChild(this.container);
        } else {
          console.warn('Settings modal content not found');
        }
      }
    }
    
    // Create the track creation modal if it doesn't exist
    this.modal = document.getElementById(this.modalId);
    if (!this.modal) {
      this.modal = document.createElement('div');
      this.modal.id = this.modalId;
      this.modal.className = 'modal';
      
      this.modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3 id="track-modal-title">Create New Safety Track</h3>
            <span class="close" id="close-track-modal">&times;</span>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="track-name">Track Name:</label>
              <input type="text" id="track-name" placeholder="Enter track name">
            </div>
            <div class="form-group">
              <label for="track-description">Description:</label>
              <textarea id="track-description" placeholder="Describe this track (optional)"></textarea>
            </div>
            <div class="form-group">
              <label for="safety-width">Safety Corridor Width (meters):</label>
              <input type="range" id="safety-width" min="10" max="200" value="50">
              <span id="safety-width-value">50m</span>
            </div>
            <div id="creation-instructions" class="creation-instructions">
              <h4>Track Creation Instructions:</h4>
              <ol>
                <li>Click "Start Drawing" to begin creating the track</li>
                <li>Click on the map to add waypoints (minimum 2 points)</li>
                <li>The track will be visualized as you add points</li>
                <li>When finished, click "Save Track"</li>
              </ol>
            </div>
            <div id="track-status" class="track-status"></div>
          </div>
          <div class="modal-footer">
            <button id="start-drawing-btn" class="btn btn-primary">Start Drawing</button>
            <button id="cancel-drawing-btn" class="btn btn-secondary" style="display: none;">Cancel Drawing</button>
            <button id="save-track-btn" class="btn btn-success" disabled>Save Track</button>
            <button id="cancel-track-btn" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(this.modal);
    }
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Create track button
    this.createBtn?.addEventListener('click', () => {
      this.openTrackModal();
    });
    
    // Close modal button
    const closeModalBtn = document.getElementById('close-track-modal');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        this.closeTrackModal();
      });
    }
    
    // Cancel track creation button
    document.getElementById('cancel-track-btn')?.addEventListener('click', () => {
      this.closeTrackModal();
    });
    
    // Start drawing button
    document.getElementById('start-drawing-btn')?.addEventListener('click', () => {
      this.startTrackCreation();
    });
    
    // Cancel drawing button
    document.getElementById('cancel-drawing-btn')?.addEventListener('click', () => {
      this.cancelTrackCreation();
    });
    
    // Save track button
    document.getElementById('save-track-btn')?.addEventListener('click', () => {
      this.saveTrack();
    });
    
    // Safety width slider
    document.getElementById('safety-width')?.addEventListener('input', (e) => {
      const widthValue = parseInt(e.target.value);
      const widthDisplay = document.getElementById('safety-width-value');
      if (widthDisplay) {
        widthDisplay.textContent = `${widthValue}m`;
      }
    });
  }
  
  /**
   * Open the track creation modal
   */
  openTrackModal(trackId = null) {
    if (!this.modal) return;
    
    // Reset the form
    document.getElementById('track-name').value = '';
    document.getElementById('track-description').value = '';
    document.getElementById('safety-width').value = '50';
    document.getElementById('safety-width-value').textContent = '50m';
    
    // Reset track status
    const trackStatus = document.getElementById('track-status');
    trackStatus.textContent = '';
    trackStatus.className = 'track-status';
    
    // Show/hide appropriate buttons
    document.getElementById('start-drawing-btn').style.display = 'inline-block';
    document.getElementById('cancel-drawing-btn').style.display = 'none';
    document.getElementById('save-track-btn').disabled = true;
    
    // Set modal title based on whether we're editing or creating
    const modalTitle = document.getElementById('track-modal-title');
    if (trackId) {
      this.editingTrackId = trackId;
      const track = this.trackManager.getTrackById(trackId);
      
      if (track) {
        modalTitle.textContent = 'Edit Safety Track';
        
        // Fill in form with track data
        document.getElementById('track-name').value = track.name;
        document.getElementById('track-description').value = track.description || '';
        document.getElementById('safety-width').value = track.safetyWidth;
        document.getElementById('safety-width-value').textContent = `${track.safetyWidth}m`;
      }
    } else {
      this.editingTrackId = null;
      modalTitle.textContent = 'Create New Safety Track';
    }
    
    // Show the modal
    this.modal.classList.add('active');
  }
  
  /**
   * Close the track creation modal
   */
  closeTrackModal() {
    if (!this.modal) return;
    
    // If we were in the middle of creating a track, cancel it
    if (this.isCreatingTrack) {
      this.cancelTrackCreation();
    }
    
    // Hide the modal
    this.modal.classList.remove('active');
    this.editingTrackId = null;
  }
  
  /**
   * Start creating a track
   */
  startTrackCreation() {
    if (!this.map || !this.trackManager) {
      this.showTrackStatus('Map or track manager not initialized', 'error');
      return;
    }
    
    // Show/hide appropriate buttons
    document.getElementById('start-drawing-btn').style.display = 'none';
    document.getElementById('cancel-drawing-btn').style.display = 'inline-block';
    document.getElementById('save-track-btn').disabled = false;
    
    // Convert modal to floating panel instead of closing it
    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal) {
      settingsModal.classList.remove('active');
    }
    
    // Convert track modal to floating mode
    this.modal.classList.add('floating');
    this.modal.classList.add('drawing');
    
    // Show instructions
    this.showTrackStatus('Click on the map to add waypoints to your track', 'success');
    
    // Start track creation mode
    this.isCreatingTrack = true;
    
    // If editing an existing track
    if (this.editingTrackId) {
      this.trackManager.editTrack(this.editingTrackId, this.onTrackCreated.bind(this));
    } else {
      this.trackManager.startTrackCreation(this.onTrackCreated.bind(this));
    }
  }
  
  /**
   * Cancel track creation
   */
  cancelTrackCreation() {
    if (!this.isCreatingTrack) return;
    
    // Cancel track creation in the manager
    this.trackManager.cancelTrackCreation();
    
    // Reset UI state
    this.isCreatingTrack = false;
    document.getElementById('start-drawing-btn').style.display = 'inline-block';
    document.getElementById('cancel-drawing-btn').style.display = 'none';
    document.getElementById('save-track-btn').disabled = true;
    
    // Remove floating panel mode
    this.modal.classList.remove('floating');
    this.modal.classList.remove('drawing');
    
    // Show the settings modal again
    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal) {
      settingsModal.classList.add('active');
    }
    
    this.showTrackStatus('Track creation cancelled', 'error');
  }
  
  /**
   * Save the current track
   */
  saveTrack() {
    const nameInput = document.getElementById('track-name');
    const descriptionInput = document.getElementById('track-description');
    const safetyWidthInput = document.getElementById('safety-width');
    
    if (!nameInput || !descriptionInput || !safetyWidthInput) {
      return;
    }
    
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const safetyWidth = parseInt(safetyWidthInput.value);
    
    if (!name) {
      this.showTrackStatus('Please enter a track name', 'error');
      return;
    }
    
    // Save the track
    const trackId = this.trackManager.saveTrack(name, safetyWidth, description);
    if (!trackId) {
      this.showTrackStatus('Failed to save track. Make sure you have at least 2 points.', 'error');
      return;
    }
    
    // Reset UI state
    this.isCreatingTrack = false;
    
    // Remove floating panel mode
    this.modal.classList.remove('floating');
    this.modal.classList.remove('drawing');
    
    // Show the settings modal again
    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal) {
      settingsModal.classList.add('active');
    }
    
    // Update the tracks list
    this.renderTracksList();
    
    // Show success message
    this.showTrackStatus('Track saved successfully!', 'success');
    
    // Reset the form for next time
    nameInput.value = '';
    descriptionInput.value = '';
    safetyWidthInput.value = '50';
    document.getElementById('safety-width-value').textContent = '50m';
    
    // Reset buttons
    document.getElementById('start-drawing-btn').style.display = 'inline-block';
    document.getElementById('cancel-drawing-btn').style.display = 'none';
    document.getElementById('save-track-btn').disabled = true;
    
    // Close the modal
    this.closeTrackModal();
  }
  
  /**
   * Callback when track creation is complete
   * @param {Object} track - The created track
   */
  onTrackCreated(track) {
    this.closeTrackModal();
    this.renderTracksList();
  }
  
  /**
   * Show a status message in the track modal
   * @param {string} message - The message to display
   * @param {string} type - 'success' or 'error'
   */
  showTrackStatus(message, type = 'success') {
    const statusElement = document.getElementById('track-status');
    if (!statusElement) return;
    
    statusElement.textContent = message;
    statusElement.className = `track-status ${type}`;
  }
  
  /**
   * Render the list of tracks
   */
  renderTracksList() {
    if (!this.tracksList) return;
    
    // Clear the current list
    this.tracksList.innerHTML = '';
    
    // Get all tracks
    const tracks = this.trackManager.getAllTracks();
    
    if (tracks.length === 0) {
      const noTracksMessage = document.createElement('div');
      noTracksMessage.className = 'no-tracks-message';
      noTracksMessage.textContent = 'No safety tracks created yet. Click "Create New Track" to add one.';
      this.tracksList.appendChild(noTracksMessage);
      return;
    }
    
    // Create track items
    tracks.forEach(track => {
      const trackItem = document.createElement('div');
      trackItem.className = 'track-item';
      trackItem.dataset.trackId = track.id;
      
      // Track info
      const trackInfo = document.createElement('div');
      trackInfo.className = 'track-info';
      
      const trackName = document.createElement('div');
      trackName.className = 'track-name';
      trackName.textContent = track.name;
      trackInfo.appendChild(trackName);
      
      const trackDetails = document.createElement('div');
      trackDetails.className = 'track-details';
      trackDetails.textContent = `${track.points.length} waypoints • ${track.safetyWidth}m safety corridor`;
      trackInfo.appendChild(trackDetails);
      
      trackItem.appendChild(trackInfo);
      
      // Track actions
      const trackActions = document.createElement('div');
      trackActions.className = 'track-actions';
      
      const editButton = document.createElement('button');
      editButton.className = 'track-action-btn edit-track';
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        this.openTrackModal(track.id);
      });
      trackActions.appendChild(editButton);
      
      const deleteButton = document.createElement('button');
      deleteButton.className = 'track-action-btn delete-track';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete the track "${track.name}"?`)) {
          this.trackManager.deleteTrack(track.id);
          this.renderTracksList();
        }
      });
      trackActions.appendChild(deleteButton);
      
      trackItem.appendChild(trackActions);
      
      this.tracksList.appendChild(trackItem);
    });
  }
  
  /**
   * Set the map reference
   * @param {Object} map - The map object
   */
  setMap(map) {
    this.map = map;
    if (this.trackManager) {
      this.trackManager.setMap(map);
    }
  }
}

export default TrackSafetySettings; 