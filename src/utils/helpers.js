/**
 * Utility functions for the dashboard
 */

/**
 * Format a timestamp as a "time ago" string
 * @param {number} timestamp - The timestamp to format
 * @returns {string} Formatted time string (e.g., "Just now", "5m ago", "2h ago")
 */
export function formatTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) {
    return 'Just now';
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}m ago`;
  } else {
    return `${Math.floor(diff / 3600000)}h ago`;
  }
}

/**
 * Get the appropriate CSS color for a battery percentage
 * @param {number} battery - Battery percentage (0-100)
 * @returns {string} Hex color code
 */
export function getBatteryColor(battery) {
  if (battery > 70) return '#48bb78'; // Green
  if (battery > 30) return '#f6ad55'; // Orange
  return '#f56565'; // Red
}

/**
 * Get the appropriate Font Awesome icon for a hiker status
 * @param {string} status - Hiker status (Active, Resting, SOS)
 * @returns {string} Font Awesome class name
 */
export function getStatusIcon(status) {
  switch(status) {
    case 'Active': return 'fa-person-walking';
    case 'Resting': return 'fa-person';
    case 'SOS': return 'fa-exclamation-triangle';
    default: return 'fa-person';
  }
}

/**
 * Create a visual update effect for an element
 * @param {string} elementId - The DOM element ID to flash
 */
export function flashUpdate(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.classList.add('updating');
  
  setTimeout(() => {
    element.classList.remove('updating');
  }, 500);
}

/**
 * Create sample hiker data for testing
 * @param {number} count - Number of hikers to create (default 10)
 * @param {Array} centerCoords - [lat, lon] center coordinates
 * @returns {Array} Array of Hiker objects
 */
export function createSampleHikers(count = 10, centerCoords = [3.139, 101.6869]) {
  const names = [
    'John Smith', 'Emma Wilson', 'Michael Brown', 'Sarah Davis', 
    'Robert Miller', 'Jennifer Garcia', 'David Martinez', 'Lisa Rodriguez', 
    'James Johnson', 'Mary Williams', 'Thomas Anderson', 'Patricia Thompson',
    'Christopher Martin', 'Elizabeth White', 'Daniel Harris', 'Jessica Lewis'
  ];
  
  // Import dynamically to avoid circular dependency
  return import('../models/Hiker.js').then(({ default: Hiker }) => {
    return names.slice(0, count).map((name, index) => {
      // Create hikers with slight variations from center position
      const lat = centerCoords[0] + (Math.random() - 0.5) * 0.05;
      const lon = centerCoords[1] + (Math.random() - 0.5) * 0.05;
      const battery = 50 + Math.random() * 50; // 50-100%
      return new Hiker(index, name, lat, lon, 'Active', battery);
    });
  });
}

/**
 * Create sample tower/basecamp data for testing
 * @param {number} count - Number of towers to create (default 3)
 * @param {Array} centerCoords - [lat, lon] center coordinates
 * @returns {Promise<Array>} Promise resolving to array of Tower objects
 */
export function createSampleTowers(count = 3, centerCoords = [3.139, 101.6869]) {
  const towerNames = [
    'Central Tower', 'North Base', 'South Station', 'East Point', 'West Camp',
    'Peak Tower', 'Valley Base', 'Ridge Station', 'Summit Point', 'Forest Camp'
  ];
  
  const types = ['Tower', 'Basecamp'];
  const statuses = ['Active', 'Maintenance', 'Offline'];
  
  // Import Tower model dynamically to avoid circular dependency
  return import('../models/Tower.js').then(({ default: Tower }) => {
    return towerNames.slice(0, count).map((name, index) => {
      // Create towers with more spread out positions than hikers
      const lat = centerCoords[0] + (Math.random() - 0.5) * 0.1;
      const lon = centerCoords[1] + (Math.random() - 0.5) * 0.1;
      const type = types[Math.floor(Math.random() * types.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const coverageRadius = Math.round(300 + Math.random() * 700); // 300-1000m
      
      const options = {
        coverageRange: coverageRadius, // Backward compatibility
      };
      
      return new Tower(`tower_${index}`, name, lat, lon, type, status, coverageRadius, options);
    });
  });
}

/**
 * Create a Lucide icon element
 * @param {string} iconName - The name of the Lucide icon
 * @param {Object} options - Options for the icon (size, color, strokeWidth, etc.)
 * @returns {string} HTML string for the icon
 */
export function createLucideIcon(iconName, options = {}) {
  const {
    size = 20,
    color = 'currentColor',
    strokeWidth = 2,
    className = '',
    style = ''
  } = options;
  
  const styleString = `color: ${color}; width: ${size}px; height: ${size}px; stroke-width: ${strokeWidth}; ${style}`;
  
  return `<i data-lucide="${iconName}" class="${className}" style="${styleString}"></i>`;
}

/**
 * Refresh Lucide icons after DOM changes
 * @param {HTMLElement} container - Optional container to refresh icons within
 */
export function refreshLucideIcons(container = document) {
  if (typeof lucide !== 'undefined') {
    if (container === document) {
      lucide.createIcons();
    } else {
      // Create icons only within the specified container
      const icons = container.querySelectorAll('[data-lucide]');
      icons.forEach(icon => {
        if (!icon.querySelector('svg')) {
          lucide.createIcons([icon]);
        }
      });
    }
  }
}

/**
 * Get Lucide icon name for tower/infrastructure type
 * @param {string} type - Tower type ('Tower' or 'Basecamp')
 * @returns {string} Lucide icon name
 */
export function getTowerIcon(type) {
  return type === 'Tower' ? 'radio-tower' : 'house-wifi';
}

/**
 * Get Lucide icon name for status
 * @param {string} status - Status ('Active', 'Offline', 'Maintenance')
 * @returns {string} Lucide icon name
 */
export function getStatusLucideIcon(status) {
  switch(status) {
    case 'Active': return 'check-circle';
    case 'Offline': return 'x-circle';
    case 'Maintenance': return 'wrench';
    default: return 'circle';
  }
} 