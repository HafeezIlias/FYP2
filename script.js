// script.js
// Hiker Model - For improved data handling
class Hiker {
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
  }
  
  // Update position for simulation
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
    
    // Random SOS event
    if (Math.random() > 0.997) { // Very rare SOS event
      this.sos = true;
      this.status = 'SOS';
    }
  }
}

// Initialize map
const map = L.map('map').setView([3.139, 101.6869], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Initialize variables
const markerLayer = L.layerGroup().addTo(map);
const hikerMarkers = {};
let hikers = [];
let trackingHikerId = null;

// Global variable to track which hiker's modal is currently open
let activeModalHikerId = null;

// Enhanced custom marker icon with improved readability
function createCustomMarkerIcon(hiker) {
  const initials = hiker.name.split(' ').map(n => n[0]).join('');
  const sosClass = hiker.sos ? ' sos' : '';
  
  const markerHtml = `
    <div class="marker-label${sosClass}">${hiker.name}</div>
    <div class="custom-marker${sosClass}"></div>
  `;
  
  return L.divIcon({
    html: markerHtml,
    className: 'hiker-marker-container',
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
}

// Enhanced modal opening function
function openModal(hiker) {
  activeModalHikerId = hiker.id;
  updateModalContent(hiker);
  document.getElementById('hiker-modal').style.display = 'flex';
  
  document.getElementById('track-hiker').onclick = () => {
    trackingHikerId = hiker.id;
    closeModal();
    centerOnHiker(hiker.id);
  };
}

// Add this function to create a flash effect when values update
function flashUpdate(elementId) {
  const element = document.getElementById(elementId);
  element.classList.add('updating');
  
  setTimeout(() => {
    element.classList.remove('updating');
  }, 500);
}

// Update the updateModalContent function
function updateModalContent(hiker) {
  // Store current values to check for changes
  const prevStatus = document.getElementById('modal-status').textContent;
  const prevBattery = document.getElementById('modal-battery').textContent;
  const prevCoords = document.getElementById('modal-coords').textContent;
  
  // Update all content
  document.getElementById('modal-name').textContent = hiker.name;
  document.getElementById('modal-status').textContent = hiker.status;
  document.getElementById('modal-battery').textContent = `${Math.round(hiker.battery)}%`;
  document.getElementById('modal-battery-fill').style.width = `${hiker.battery}%`;
  document.getElementById('modal-battery-fill').style.backgroundColor = getBatteryColor(hiker.battery);
  document.getElementById('modal-lastupdate').textContent = new Date(hiker.lastUpdate).toLocaleTimeString();
  document.getElementById('modal-coords').textContent = `${hiker.lat.toFixed(5)}, ${hiker.lon.toFixed(5)}`;
  
  // Flash updates for changed values
  if (prevStatus !== hiker.status) {
    flashUpdate('modal-status');
  }
  
  if (prevBattery !== `${Math.round(hiker.battery)}%`) {
    flashUpdate('modal-battery');
  }
  
  if (prevCoords !== `${hiker.lat.toFixed(5)}, ${hiker.lon.toFixed(5)}`) {
    flashUpdate('modal-coords');
  }
  
  // Always flash the last update time
  flashUpdate('modal-lastupdate');
}

// Updated close modal function
function closeModal() {
  document.getElementById('hiker-modal').style.display = 'none';
  activeModalHikerId = null;
}

function getBatteryColor(battery) {
  if (battery > 70) return '#48bb78';
  if (battery > 30) return '#f6ad55';
  return '#f56565';
}

// Render hikers on map and sidebar
function renderHikers() {
  markerLayer.clearLayers();
  document.getElementById('hiker-list').innerHTML = '';
  
  let sosCount = 0;
  
  hikers.forEach(hiker => {
    // Create or update marker with enhanced label
    const marker = L.marker([hiker.lat, hiker.lon], {
      icon: createCustomMarkerIcon(hiker),
      zIndexOffset: hiker.sos ? 1000 : 0 // SOS markers on top
    }).addTo(markerLayer);
    
    marker.on('click', () => {
      openModal(hiker);
    });
    
    hikerMarkers[hiker.id] = marker;
    
    // Update modal if it's currently open for this hiker
    if (activeModalHikerId === hiker.id) {
      updateModalContent(hiker);
    }
    
    // Create card
    const card = document.createElement('div');
    card.className = `hiker-card${hiker.sos ? ' sos' : ''}`;
    
    // Count SOS
    if (hiker.sos) {
      sosCount++;
    }
    
    const initials = hiker.name.split(' ').map(n => n[0]).join('');
    
    card.innerHTML = `
      ${hiker.sos ? '<div class="sos-badge">SOS</div>' : ''}
      <div class="hiker-info">
        <div class="hiker-avatar">${initials}</div>
        <div class="hiker-name-status">
          <div class="hiker-name">${hiker.name}</div>
          <div class="hiker-status">
            <i class="status-icon fa-solid ${getStatusIcon(hiker.status)}"></i>
            ${hiker.status}
          </div>
        </div>
      </div>
      <div class="hiker-details">
        <div class="hiker-detail-item">
          <i class="fas fa-battery-half"></i>
          ${Math.round(hiker.battery)}%
        </div>
        <div class="hiker-detail-item">
          <i class="fas fa-clock"></i>
          ${formatTimeAgo(hiker.lastUpdate)}
        </div>
      </div>
      <div class="battery-bar">
        <div class="battery-fill" style="width: ${hiker.battery}%; background-color: ${getBatteryColor(hiker.battery)};"></div>
      </div>
    `;
    
    card.addEventListener('click', () => {
      openModal(hiker);
      map.setView([hiker.lat, hiker.lon], 15);
    });
    
    document.getElementById('hiker-list').appendChild(card);
  });
  
  // Update stats
  document.getElementById('total-hikers').textContent = hikers.length;
  document.getElementById('sos-count').textContent = sosCount;
}

function getStatusIcon(status) {
  switch(status) {
    case 'Moving': return 'fa-person-walking';
    case 'Resting': return 'fa-person';
    case 'SOS': return 'fa-exclamation-triangle';
    default: return 'fa-person';
  }
}

function formatTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  
  return new Date(timestamp).toLocaleTimeString();
}

function centerOnHiker(hikerId) {
  const hiker = hikers.find(h => h.id === hikerId);
  if (hiker) {
    map.setView([hiker.lat, hiker.lon], 15);
  }
}

// Create sample data
function createSampleHikers() {
  // Create 8 hikers around Kuala Lumpur area
  return [
    new Hiker(1, 'John Smith', 3.135, 101.686, 'Moving', 95),
    new Hiker(2, 'Maria Wong', 3.142, 101.692, 'Moving', 78),
    new Hiker(3, 'Ali Hassan', 3.128, 101.678, 'Moving', 64),
    new Hiker(4, 'Sarah Lee', 3.147, 101.683, 'Moving', 86),
    new Hiker(5, 'Raj Patel', 3.134, 101.695, 'Moving', 53),
    new Hiker(6, 'Emma Chen', 3.152, 101.676, 'Moving', 45),
    new Hiker(7, 'David Kim', 3.139, 101.669, 'Moving', 92),
    new Hiker(8, 'Fatimah Zahra', 3.145, 101.688, 'Moving', 32)
  ];
}

// Simulate movement
function simulateHikerMovement() {
  hikers.forEach(hiker => {
    hiker.updatePosition();
  });
  
  // If tracking a hiker, center the map on them
  if (trackingHikerId) {
    const trackedHiker = hikers.find(h => h.id === trackingHikerId);
    if (trackedHiker) {
      map.setView([trackedHiker.lat, trackedHiker.lon], map.getZoom());
    }
  }
  
  renderHikers();
}

// Add animated update indicator to the modal
function addUpdateIndicator() {
  // Add this to the HTML in the modal header section
  const modalHeader = document.querySelector('.modal-header');
  
  const updateIndicator = document.createElement('div');
  updateIndicator.className = 'update-indicator';
  updateIndicator.innerHTML = '<div class="update-pulse"></div><span>Live</span>';
  
  modalHeader.appendChild(updateIndicator);
}

// Call this when the app initializes
function initApp() {
  hikers = createSampleHikers();
  renderHikers();
  
  // Add the live update indicator to the modal
  addUpdateIndicator();
  
  // Set up event listeners
  document.getElementById('center-map').addEventListener('click', () => {
    // Find bounds to fit all hikers
    const points = hikers.map(h => [h.lat, h.lon]);
    if (points.length) {
      map.fitBounds(L.latLngBounds(points));
    }
  });
  
  document.getElementById('toggle-all-hikers').addEventListener('click', () => {
    // Toggle sidebar on mobile
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('mobile-visible');
  });
  
  document.getElementById('hiker-search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    // Filter hiker cards
    const cards = document.querySelectorAll('.hiker-card');
    cards.forEach(card => {
      const name = card.querySelector('.hiker-name').textContent.toLowerCase();
      if (name.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
  
  // Start simulation
  setInterval(simulateHikerMovement, 1000);
}

// Start the app
initApp();
