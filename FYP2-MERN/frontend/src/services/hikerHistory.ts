import { TrackPoint } from '../types';

export interface HikerTrackHistory {
  hikerId: string;
  hikerName: string;
  trackPoints: TrackPoint[];
  startTime: number;
  endTime: number;
}

export class HikerHistoryService {
  private trackHistories: Map<string, HikerTrackHistory> = new Map();
  
  // Add a track point to a hiker's history
  addTrackPoint(hikerId: string, hikerName: string, lat: number, lon: number, timestamp?: number): void {
    const time = timestamp || Date.now();
    const trackPoint: TrackPoint = { lat, lon, timestamp: time };
    
    let history = this.trackHistories.get(hikerId);
    if (!history) {
      history = {
        hikerId,
        hikerName,
        trackPoints: [],
        startTime: time,
        endTime: time
      };
      this.trackHistories.set(hikerId, history);
    }
    
    history.trackPoints.push(trackPoint);
    history.endTime = time;
    
    // Limit track history to last 1000 points to prevent memory issues
    if (history.trackPoints.length > 1000) {
      history.trackPoints = history.trackPoints.slice(-1000);
      history.startTime = history.trackPoints[0].timestamp;
    }
  }
  
  // Get track history for a specific hiker
  getHikerTrackHistory(hikerId: string): HikerTrackHistory | null {
    return this.trackHistories.get(hikerId) || null;
  }
  
  // Get all track histories
  getAllTrackHistories(): HikerTrackHistory[] {
    return Array.from(this.trackHistories.values());
  }
  
  // Clear history for a specific hiker
  clearHikerHistory(hikerId: string): void {
    this.trackHistories.delete(hikerId);
  }
  
  // Clear all histories
  clearAllHistories(): void {
    this.trackHistories.clear();
  }
  
  // Get track history filtered by time range
  getHikerTrackHistoryByTimeRange(
    hikerId: string, 
    startTime: number, 
    endTime: number
  ): TrackPoint[] {
    const history = this.trackHistories.get(hikerId);
    if (!history) return [];
    
    return history.trackPoints.filter(
      point => point.timestamp >= startTime && point.timestamp <= endTime
    );
  }
  
  // Get last N track points for a hiker
  getLastTrackPoints(hikerId: string, count: number): TrackPoint[] {
    const history = this.trackHistories.get(hikerId);
    if (!history) return [];
    
    return history.trackPoints.slice(-count);
  }
  
  // Check if hiker has any track history
  hasTrackHistory(hikerId: string): boolean {
    const history = this.trackHistories.get(hikerId);
    return history !== undefined && history.trackPoints.length > 0;
  }
  
  // Get track distance in meters
  getTrackDistance(hikerId: string): number {
    const history = this.trackHistories.get(hikerId);
    if (!history || history.trackPoints.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 1; i < history.trackPoints.length; i++) {
      const prev = history.trackPoints[i - 1];
      const curr = history.trackPoints[i];
      totalDistance += this.calculateDistance(prev, curr);
    }
    
    return totalDistance;
  }
  
  // Get track duration in milliseconds
  getTrackDuration(hikerId: string): number {
    const history = this.trackHistories.get(hikerId);
    if (!history || history.trackPoints.length === 0) return 0;
    
    return history.endTime - history.startTime;
  }
  
  // Get average speed in km/h
  getAverageSpeed(hikerId: string): number {
    const distance = this.getTrackDistance(hikerId); // meters
    const duration = this.getTrackDuration(hikerId); // milliseconds

    if (distance === 0 || duration === 0) return 0;

    const hours = duration / (1000 * 60 * 60);
    const kilometers = distance / 1000;

    return kilometers / hours; // km/h
  }

  // Get current speed in km/h based on last N points (default: 5 points)
  getCurrentSpeed(hikerId: string, lastNPoints: number = 5): number {
    const history = this.trackHistories.get(hikerId);
    if (!history || history.trackPoints.length < 2) return 0;

    const recentPoints = history.trackPoints.slice(-Math.min(lastNPoints, history.trackPoints.length));
    if (recentPoints.length < 2) return 0;

    let totalDistance = 0;
    for (let i = 1; i < recentPoints.length; i++) {
      totalDistance += this.calculateDistance(recentPoints[i - 1], recentPoints[i]);
    }

    const timeDiff = recentPoints[recentPoints.length - 1].timestamp - recentPoints[0].timestamp;
    if (timeDiff === 0) return 0;

    const hours = timeDiff / (1000 * 60 * 60);
    const kilometers = totalDistance / 1000;

    return kilometers / hours; // km/h
  }

  // Get pace in minutes per kilometer
  getPace(hikerId: string): number {
    const speed = this.getAverageSpeed(hikerId);
    if (speed === 0) return 0;

    return 60 / speed; // min/km
  }

  // Get current pace in minutes per kilometer
  getCurrentPace(hikerId: string, lastNPoints: number = 5): number {
    const speed = this.getCurrentSpeed(hikerId, lastNPoints);
    if (speed === 0) return 0;

    return 60 / speed; // min/km
  }

  // Format pace for display (mm:ss per km)
  formatPace(paceMinPerKm: number): string {
    if (paceMinPerKm === 0 || !isFinite(paceMinPerKm)) return '--:--';

    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.floor((paceMinPerKm - minutes) * 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Format speed for display
  formatSpeed(speedKmh: number): string {
    if (speedKmh === 0 || !isFinite(speedKmh)) return '0.0';

    return speedKmh.toFixed(1);
  }

  // Get moving speed (excluding stationary periods)
  getMovingSpeed(hikerId: string, stationaryThreshold: number = 0.5): number {
    const history = this.trackHistories.get(hikerId);
    if (!history || history.trackPoints.length < 2) return 0;

    let movingDistance = 0;
    let movingTime = 0;

    for (let i = 1; i < history.trackPoints.length; i++) {
      const prev = history.trackPoints[i - 1];
      const curr = history.trackPoints[i];

      const distance = this.calculateDistance(prev, curr);
      const timeDiff = curr.timestamp - prev.timestamp;
      const segmentSpeed = (distance / 1000) / (timeDiff / (1000 * 60 * 60)); // km/h

      // Only count segments where speed is above threshold (moving)
      if (segmentSpeed >= stationaryThreshold) {
        movingDistance += distance;
        movingTime += timeDiff;
      }
    }

    if (movingTime === 0) return 0;

    const hours = movingTime / (1000 * 60 * 60);
    const kilometers = movingDistance / 1000;

    return kilometers / hours; // km/h
  }

  // Calculate distance between two points using Haversine formula
  private calculateDistance(point1: TrackPoint, point2: TrackPoint): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = point1.lat * Math.PI / 180;
    const φ2 = point2.lat * Math.PI / 180;
    const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
    const Δλ = (point2.lon - point1.lon) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}

// Export singleton instance
export const hikerHistoryService = new HikerHistoryService();