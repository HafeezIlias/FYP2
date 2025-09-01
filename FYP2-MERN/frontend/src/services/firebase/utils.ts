/**
 * Shared utility functions for Firebase services
 */

/**
 * Safely parse timestamp from server data
 */
export function parseTimestamp(timestamp: any): number {
  if (!timestamp) return Date.now();
  
  if (typeof timestamp === 'number') {
    const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
    if (timestamp > oneYearAgo) return timestamp;
    if (timestamp < 10000000000) return timestamp * 1000;
    return timestamp;
  }
  
  if (typeof timestamp === 'string') {
    if (timestamp.includes(':')) {
      try {
        const now = new Date();
        const [hours, minutes, seconds] = timestamp.split(':').map(Number);
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
        return date.getTime();
      } catch (error) {
        console.error('Error parsing time string:', error);
      }
    }
    
    const numericTimestamp = Number(timestamp);
    if (!isNaN(numericTimestamp)) {
      if (numericTimestamp < 10000000000) return numericTimestamp * 1000;
      return numericTimestamp;
    }
    
    const dateTimestamp = new Date(timestamp).getTime();
    if (!isNaN(dateTimestamp)) return dateTimestamp;
  }
  
  console.warn(`Failed to parse timestamp: ${timestamp}, using current time instead`);
  return Date.now();
}

/**
 * Calculate distance between two coordinates in meters
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}