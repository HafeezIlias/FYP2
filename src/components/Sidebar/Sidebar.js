/**
 * Sidebar Component - Handles the sidebar with hiker list and stats
 */
import { formatTimeAgo, getBatteryColor, getStatusIcon } from '../../utils/helpers.js';

class SidebarComponent {
  /**
   * Initialize the Sidebar component
   * @param {string} containerId - The ID of the container element
   */
  constructor(containerId = 'sidebar') {
    this.containerId = containerId;
    this.hikerListId = 'hiker-list';
    this.towerListId = 'tower-list';
    this.totalHikersId = 'total-hikers';
    this.sosCountId = 'sos-count';
    this.totalTowersId = 'total-towers';
    this.activeTowersId = 'active-towers';
    this.searchId = 'hiker-search';
    this.settingsButtonId = 'settings-button';
    this.hikerCards = new Map();
    this.towerCards = new Map();
    this.onHikerClick = null;
    this.onTowerClick = null;
    this.onSettingsClick = null;
    this.currentFilter = 'hikers';
  }

  /**
   * Initialize the sidebar
   * @param {Function} onHikerClick - Callback for hiker card click events
   * @param {Function} onTowerClick - Callback for tower card click events
   */
  init(onHikerClick, onTowerClick, onSettingsClick) {
    this.onHikerClick = onHikerClick;
    this.onTowerClick = onTowerClick;
    this.onSettingsClick = onSettingsClick;
    
    // Set up search functionality
    document.getElementById(this.searchId)?.addEventListener('input', (e) => {
      this.filterItems(e.target.value);
    });
    
    // Set up filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const filter = e.currentTarget.dataset.filter;
        this.switchFilter(filter);
      });
    });
    
    const settingsButton = document.getElementById(this.settingsButtonId);
    if (settingsButton) {
      settingsButton.addEventListener('click', () => {
        if (this.onSettingsClick) {
          this.onSettingsClick();
        }
      });
    }
    
    return this;
  }

  /**
   * Switch between hikers and towers filter
   * @param {string} filter - 'hikers' or 'towers'
   */
  switchFilter(filter) {
    this.currentFilter = filter;
    
    // Update tab appearance
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.filter === filter);
    });
    
    // Show/hide appropriate lists and stats
    const hikerList = document.getElementById(this.hikerListId);
    const towerList = document.getElementById(this.towerListId);
    const hikerStats = document.querySelectorAll('.hikers-stat');
    const towerStats = document.querySelectorAll('.towers-stat');
    
    if (filter === 'hikers') {
      hikerList.style.display = 'block';
      towerList.style.display = 'none';
      hikerStats.forEach(stat => stat.style.display = 'flex');
      towerStats.forEach(stat => stat.style.display = 'none');
    } else {
      hikerList.style.display = 'none';
      towerList.style.display = 'block';
      hikerStats.forEach(stat => stat.style.display = 'none');
      towerStats.forEach(stat => stat.style.display = 'flex');
    }
    
    // Clear search
    const searchInput = document.getElementById(this.searchId);
    if (searchInput) {
      searchInput.value = '';
      searchInput.placeholder = filter === 'hikers' ? 'Search hikers...' : 'Search towers...';
    }
  }

  /**
   * Filter items in the sidebar based on search term
   * @param {string} searchTerm - The search term to filter by
   */
  filterItems(searchTerm) {
    const term = searchTerm.toLowerCase();
    
    if (this.currentFilter === 'hikers') {
      document.querySelectorAll('.hiker-card').forEach(card => {
        const hikerName = card.querySelector('.hiker-name').textContent.toLowerCase();
        card.style.display = hikerName.includes(term) ? 'block' : 'none';
      });
    } else {
      document.querySelectorAll('.tower-card').forEach(card => {
        const towerName = card.querySelector('.tower-name').textContent.toLowerCase();
        card.style.display = towerName.includes(term) ? 'block' : 'none';
      });
    }
  }

  /**
   * Create a hiker card element
   * @param {Object} hiker - The hiker object
   * @returns {HTMLElement} The hiker card element
   */
  createHikerCard(hiker) {
    const card = document.createElement('div');
    card.className = `hiker-card${hiker.sos ? ' sos' : ''}`;
    card.setAttribute('data-hiker-id', hiker.id);
    
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
    
    if (this.onHikerClick) {
      card.addEventListener('click', () => {
        console.log('Hiker card clicked:', hiker);
        this.onHikerClick(hiker);
      });
    }
    
    return card;
  }

  /**
   * Create a tower card element
   * @param {Object} tower - The tower object
   * @returns {HTMLElement} The tower card element
   */
  createTowerCard(tower) {
    const card = document.createElement('div');
    card.className = 'tower-card';
    card.setAttribute('data-tower-id', tower.id);
    
    const typeIcon = tower.type === 'Tower' ? 'radio-tower' : 'house-wifi';
    const typeClass = tower.type.toLowerCase();
    
    card.innerHTML = `
      <div class="tower-info">
        <div class="tower-icon ${typeClass}">
          <i data-lucide="${typeIcon}"></i>
        </div>
        <div class="tower-name-type">
          <div class="tower-name">${tower.name}</div>
          <div class="tower-type">
            <i data-lucide="${typeIcon}"></i>
            ${tower.type}
          </div>
        </div>
      </div>
      <div class="tower-details">
        <div class="tower-detail-item">
          <i data-lucide="wifi"></i>
          ${tower.coverageRadius || tower.signalStrength || 500}m
        </div>
        <div class="tower-status ${tower.status.toLowerCase()}">
          ${tower.status}
        </div>
      </div>
    `;
    
    // Refresh Lucide icons for this card
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 10);
    
    if (this.onTowerClick) {
      card.addEventListener('click', () => {
        console.log('Tower card clicked:', tower);
        this.onTowerClick(tower);
      });
    }
    
    return card;
  }

  /**
   * Update the sidebar with current hiker data
   * @param {Array} hikers - Array of hiker objects
   */
  updateSidebar(hikers) {
    const hikerList = document.getElementById(this.hikerListId);
    if (!hikerList) return;
    
    // Clear the current list
    hikerList.innerHTML = '';
    
    // Count SOS instances
    let sosCount = 0;
    hikers.forEach(hiker => {
      if (hiker.sos) sosCount++;
      
      // Create and append the hiker card
      const card = this.createHikerCard(hiker);
      hikerList.appendChild(card);
    });
    
    // Update stats
    document.getElementById(this.totalHikersId).textContent = hikers.length;
    document.getElementById(this.sosCountId).textContent = sosCount;
  }

  /**
   * Update the sidebar with current tower data
   * @param {Array} towers - Array of tower objects
   */
  updateTowerList(towers) {
    const towerList = document.getElementById(this.towerListId);
    if (!towerList) return;
    
    // Clear the current list
    towerList.innerHTML = '';
    
    // Count active towers
    let activeCount = 0;
    towers.forEach(tower => {
      if (tower.status === 'Active') activeCount++;
      
      // Create and append the tower card
      const card = this.createTowerCard(tower);
      towerList.appendChild(card);
    });
    
    // Update stats
    document.getElementById(this.totalTowersId).textContent = towers.length;
    document.getElementById(this.activeTowersId).textContent = activeCount;
  }

  renderHikerCard(hiker) {
    const existingCard = this.hikerCards.get(hiker.id);
    
    if (existingCard) {
      // Update existing card
      const batteryElement = existingCard.querySelector('.hiker-battery');
      if (batteryElement) {
        batteryElement.textContent = `${hiker.battery}%`;
        batteryElement.className = 'hiker-battery';
        if (hiker.battery <= 20) {
          batteryElement.classList.add('low');
        } else if (hiker.battery <= 50) {
          batteryElement.classList.add('medium');
        }
      }

      const sosElement = existingCard.querySelector('.hiker-sos');
      if (sosElement) {
        sosElement.classList.remove('active', 'handled', 'emergency');
        if (hiker.sos) {
          sosElement.classList.add('active');
          
          if (hiker.sosHandled) {
            sosElement.classList.add('handled');
            sosElement.innerHTML = '<i class="fas fa-check-circle"></i> Handled';
          } else if (hiker.sosEmergencyDispatched) {
            sosElement.classList.add('emergency');
            sosElement.innerHTML = '<i class="fas fa-ambulance"></i> Emergency Dispatched';
          } else {
            sosElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i> SOS';
          }
        } else {
          sosElement.innerHTML = '';
        }
      }

      const lastSeenElement = existingCard.querySelector('.hiker-last-seen');
      if (lastSeenElement) {
        lastSeenElement.textContent = `Last update: ${this.getTimeAgo(hiker.lastUpdate)}`;
      }

      return existingCard;
    }

    // Create new card
    const card = document.createElement('div');
    card.className = 'hiker-card';
    card.setAttribute('data-hiker-id', hiker.id);
    
    const sosClass = hiker.sos ? 'active' : '';
    const sosHandledClass = hiker.sosHandled ? 'handled' : '';
    const sosEmergencyClass = hiker.sosEmergencyDispatched ? 'emergency' : '';
    const sosCombinedClass = [sosClass, sosHandledClass, sosEmergencyClass].filter(Boolean).join(' ');
    
    let sosText = '';
    if (hiker.sos) {
      if (hiker.sosHandled) {
        sosText = '<i class="fas fa-check-circle"></i> Handled';
      } else if (hiker.sosEmergencyDispatched) {
        sosText = '<i class="fas fa-ambulance"></i> Emergency Dispatched';
      } else {
        sosText = '<i class="fas fa-exclamation-triangle"></i> SOS';
      }
    }

    const batteryClass = hiker.battery <= 20 ? 'low' : (hiker.battery <= 50 ? 'medium' : '');
    
    card.innerHTML = `
      <div class="hiker-info">
        <h3 class="hiker-name">${hiker.name}</h3>
        <div class="hiker-status">
          <span class="hiker-battery ${batteryClass}">${hiker.battery}%</span>
          <span class="hiker-sos ${sosCombinedClass}">${sosText}</span>
        </div>
        <div class="hiker-last-seen">Last update: ${this.getTimeAgo(hiker.lastUpdate)}</div>
      </div>
    `;

    card.addEventListener('click', () => {
      if (this.onHikerClick) {
        console.log('Hiker card clicked from renderHikerCard:', hiker);
        this.onHikerClick(hiker);
      }
    });

    this.hikerCards.set(hiker.id, card);
    return card;
  }

  updateHikerList(hikers) {
    const hikerList = document.getElementById(this.hikerListId);
    if (!hikerList) return;

    // Sort hikers - SOS first, then by name
    const sortedHikers = [...hikers].sort((a, b) => {
      // SOS cases that are not handled come first
      if (a.sos && !a.sosHandled && !a.sosEmergencyDispatched) {
        if (!(b.sos && !b.sosHandled && !b.sosEmergencyDispatched)) return -1;
      } 
      else if (b.sos && !b.sosHandled && !b.sosEmergencyDispatched) return 1;
      
      // Then show emergency dispatched cases
      if (a.sos && a.sosEmergencyDispatched) {
        if (!b.sos || !b.sosEmergencyDispatched) return -1;
      } 
      else if (b.sos && b.sosEmergencyDispatched) return 1;
      
      // Then show handled SOS cases
      if (a.sos && a.sosHandled) {
        if (!b.sos || (!b.sosHandled && !b.sosEmergencyDispatched)) return -1;
      } 
      else if (b.sos && b.sosHandled) return 1;
      
      // Then sort by name
      return a.name.localeCompare(b.name);
    });

    // Current cards in the list
    const currentCards = new Set();

    // Update or add cards
    sortedHikers.forEach(hiker => {
      const card = this.renderHikerCard(hiker);
      currentCards.add(hiker.id);
      
      // Flash card if SOS status has changed
      if (hiker.sos && (hiker.sosHandled || hiker.sosEmergencyDispatched)) {
        card.classList.add('status-updated');
        setTimeout(() => {
          card.classList.remove('status-updated');
        }, 2000);
      }
      
      // Add to DOM if not already there
      if (!hikerList.contains(card)) {
        hikerList.appendChild(card);
      }
    });

    // Remove cards for hikers no longer in the list
    this.hikerCards.forEach((card, hikerId) => {
      if (!currentCards.has(hikerId) && hikerList.contains(card)) {
        hikerList.removeChild(card);
        this.hikerCards.delete(hikerId);
      }
    });
  }

  getTimeAgo(timestamp) {
    if (!timestamp) return 'N/A';
    
    const now = new Date();
    const updatedAt = new Date(timestamp);
    const diffInSeconds = Math.floor((now - updatedAt) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  }
}

export default SidebarComponent; 