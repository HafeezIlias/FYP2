import { SafetyTrack, TrackPoint, Hiker } from '../types';

export class SafetyTrackService {
  private tracks: SafetyTrack[] = [];

  // Add a new safety track
  addTrack(track: Omit<SafetyTrack, 'id'>): SafetyTrack {
    const newTrack: SafetyTrack = {
      ...track,
      id: `track_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  // Update an existing track
  updateTrack(trackId: string, updates: Partial<SafetyTrack>): SafetyTrack | null {
    const trackIndex = this.tracks.findIndex(t => t.id === trackId);
    if (trackIndex === -1) return null;

    this.tracks[trackIndex] = { ...this.tracks[trackIndex], ...updates };
    return this.tracks[trackIndex];
  }

  // Remove a track
  removeTrack(trackId: string): boolean {
    const trackIndex = this.tracks.findIndex(t => t.id === trackId);
    if (trackIndex === -1) return false;

    this.tracks.splice(trackIndex, 1);
    return true;
  }

  // Get all tracks
  getTracks(): SafetyTrack[] {
    return [...this.tracks];
  }

  // Get enabled tracks only
  getEnabledTracks(): SafetyTrack[] {
    return this.tracks.filter(track => track.enabled);
  }

  // Set tracks (used when loading from settings)
  setTracks(tracks: SafetyTrack[]): void {
    this.tracks = [...tracks];
  }

  // Check if a hiker is within safe bounds
  isHikerSafe(hiker: Hiker, deviationThreshold: number = 50): {
    isSafe: boolean;
    closestTrack?: SafetyTrack;
    distance?: number;
  } {
    if (this.tracks.length === 0) {
      return { isSafe: true }; // No tracks defined, consider safe
    }

    const enabledTracks = this.getEnabledTracks();
    if (enabledTracks.length === 0) {
      return { isSafe: true }; // No enabled tracks, consider safe
    }

    let minDistance = Infinity;
    let closestTrack: SafetyTrack | undefined;

    for (const track of enabledTracks) {
      const distance = this.getDistanceToTrack(hiker, track);
      if (distance < minDistance) {
        minDistance = distance;
        closestTrack = track;
      }
    }

    const effectiveThreshold = closestTrack ? 
      Math.max(deviationThreshold, closestTrack.width / 2) : 
      deviationThreshold;

    return {
      isSafe: minDistance <= effectiveThreshold,
      closestTrack,
      distance: minDistance
    };
  }

  // Calculate distance from hiker to nearest point on a track
  private getDistanceToTrack(hiker: Hiker, track: SafetyTrack): number {
    if (track.points.length === 0) return Infinity;
    if (track.points.length === 1) {
      return this.getDistanceBetweenPoints(
        { lat: hiker.lat, lng: hiker.lon },
        { lat: track.points[0].lat, lng: track.points[0].lon }
      );
    }

    let minDistance = Infinity;

    // Check distance to each line segment in the track
    for (let i = 0; i < track.points.length - 1; i++) {
      const start = track.points[i];
      const end = track.points[i + 1];
      
      const distance = this.getDistanceToLineSegment(
        { lat: hiker.lat, lng: hiker.lon },
        { lat: start.lat, lng: start.lon },
        { lat: end.lat, lng: end.lon }
      );

      if (distance < minDistance) {
        minDistance = distance;
      }
    }

    return minDistance;
  }

  // Calculate distance between two points in meters
  private getDistanceBetweenPoints(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = point1.lat * Math.PI / 180;
    const φ2 = point2.lat * Math.PI / 180;
    const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
    const Δλ = (point2.lng - point1.lng) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  // Calculate distance from point to line segment
  private getDistanceToLineSegment(
    point: { lat: number; lng: number },
    lineStart: { lat: number; lng: number },
    lineEnd: { lat: number; lng: number }
  ): number {
    const A = point.lng - lineStart.lng;
    const B = point.lat - lineStart.lat;
    const C = lineEnd.lng - lineStart.lng;
    const D = lineEnd.lat - lineStart.lat;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    
    if (lenSq === 0) {
      // Line segment is actually a point
      return this.getDistanceBetweenPoints(point, lineStart);
    }

    let param = dot / lenSq;

    let xx: number, yy: number;

    if (param < 0) {
      xx = lineStart.lng;
      yy = lineStart.lat;
    } else if (param > 1) {
      xx = lineEnd.lng;
      yy = lineEnd.lat;
    } else {
      xx = lineStart.lng + param * C;
      yy = lineStart.lat + param * D;
    }

    return this.getDistanceBetweenPoints(point, { lat: yy, lng: xx });
  }

  // Get unsafe hikers
  getUnsafeHikers(hikers: Hiker[], deviationThreshold: number = 50): {
    hiker: Hiker;
    distance: number;
    closestTrack?: SafetyTrack;
  }[] {
    const unsafeHikers: {
      hiker: Hiker;
      distance: number;
      closestTrack?: SafetyTrack;
    }[] = [];

    for (const hiker of hikers) {
      const safetyCheck = this.isHikerSafe(hiker, deviationThreshold);
      if (!safetyCheck.isSafe && safetyCheck.distance !== undefined) {
        unsafeHikers.push({
          hiker,
          distance: safetyCheck.distance,
          closestTrack: safetyCheck.closestTrack
        });
      }
    }

    return unsafeHikers;
  }

  // Create a sample safety track for demonstration
  createSampleTrack(): SafetyTrack {
    const sampleTrack: SafetyTrack = {
      id: `sample_track_${Date.now()}`,
      name: 'Main Hiking Trail',
      points: [
        { lat: 3.1385, lon: 101.6865, timestamp: Date.now() },
        { lat: 3.1390, lon: 101.6870, timestamp: Date.now() },
        { lat: 3.1395, lon: 101.6875, timestamp: Date.now() },
        { lat: 3.1400, lon: 101.6880, timestamp: Date.now() },
        { lat: 3.1405, lon: 101.6885, timestamp: Date.now() }
      ],
      width: 100, // 100 meters wide
      color: '#22c55e', // Green color
      enabled: true
    };

    this.tracks.push(sampleTrack);
    return sampleTrack;
  }
}

// Export singleton instance
export const safetyTrackService = new SafetyTrackService();