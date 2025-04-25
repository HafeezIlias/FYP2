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
    this.totalHikersId = 'total-hikers';
    this.sosCountId = 'sos-count';
    this.searchId = 'hiker-search';
    this.settingsButtonId = 'settings-button';
    this.hikerCards = new Map();
    this.onHikerClick = null;
    this.onSettingsClick = null;
  }

  /**
   * Initialize the sidebar
   * @param {Function} onHikerClick - Callback for hiker card click events
   */
  init(onHikerClick, onSettingsClick) {
    this.onHikerClick = onHikerClick;
    this.onSettingsClick = onSettingsClick;
    
    // Set up search functionality
    document.getElementById(this.searchId)?.addEventListener('input', (e) => {
      this.filterHikers(e.target.value);
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
   * Filter hikers in the sidebar based on search term
   * @param {string} searchTerm - The search term to filter by
   */
  filterHikers(searchTerm) {
    const term = searchTerm.toLowerCase();
    
    document.querySelectorAll('.hiker-card').forEach(card => {
      const hikerName = card.querySelector('.hiker-name').textContent.toLowerCase();
      card.style.display = hikerName.includes(term) ? 'block' : 'none';
    });
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