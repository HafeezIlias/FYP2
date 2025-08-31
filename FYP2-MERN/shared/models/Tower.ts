/**
 * Tower Model - Shared between frontend and backend
 */
export class Tower {
  public id: string;
  public name: string;
  public type: 'Tower' | 'Basecamp' | 'Relay';
  public lat: number;
  public lon: number;
  public status: 'Active' | 'Inactive' | 'Maintenance';
  public coverageRadius: number;
  public lastUpdate: number;
  public signalStrength: number;
  public connectedHikers: string[] = [];

  constructor(
    id: string,
    name: string,
    type: 'Tower' | 'Basecamp' | 'Relay',
    lat: number,
    lon: number,
    status: 'Active' | 'Inactive' | 'Maintenance' = 'Active',
    coverageRadius: number = 500,
    signalStrength: number = 100,
    lastUpdate: number = Date.now()
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.lat = lat;
    this.lon = lon;
    this.status = status;
    this.coverageRadius = coverageRadius;
    this.signalStrength = signalStrength;
    this.lastUpdate = lastUpdate;
  }

  /**
   * Update tower data
   */
  updateData(
    lat: number, 
    lon: number, 
    status: 'Active' | 'Inactive' | 'Maintenance' = 'Active',
    coverageRadius: number = 500,
    signalStrength: number = 100
  ): void {
    this.lat = lat;
    this.lon = lon;
    this.status = status;
    this.coverageRadius = coverageRadius;
    this.signalStrength = signalStrength;
    this.lastUpdate = Date.now();
  }

  /**
   * Check if a point is within coverage radius
   */
  isWithinCoverage(lat: number, lon: number): boolean {
    const distance = this.calculateDistance(lat, lon);
    return distance <= this.coverageRadius;
  }

  /**
   * Calculate distance to a point in meters
   */
  calculateDistance(lat: number, lon: number): number {
    const R = 6371000; // Earth radius in meters
    const φ1 = (this.lat * Math.PI) / 180;
    const φ2 = (lat * Math.PI) / 180;
    const Δφ = ((lat - this.lat) * Math.PI) / 180;
    const Δλ = ((lon - this.lon) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c;
  }

  /**
   * Add connected hiker
   */
  addConnectedHiker(hikerId: string): void {
    if (!this.connectedHikers.includes(hikerId)) {
      this.connectedHikers.push(hikerId);
    }
  }

  /**
   * Remove connected hiker
   */
  removeConnectedHiker(hikerId: string): void {
    this.connectedHikers = this.connectedHikers.filter(id => id !== hikerId);
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): string {
    return `${this.connectedHikers.length} connected`;
  }

  /**
   * Convert to plain object (for JSON serialization)
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      lat: this.lat,
      lon: this.lon,
      status: this.status,
      coverageRadius: this.coverageRadius,
      signalStrength: this.signalStrength,
      lastUpdate: this.lastUpdate,
      connectedHikers: this.connectedHikers
    };
  }

  /**
   * Create from plain object
   */
  static fromJSON(data: any): Tower {
    const tower = new Tower(
      data.id,
      data.name,
      data.type,
      data.lat,
      data.lon,
      data.status,
      data.coverageRadius,
      data.signalStrength,
      data.lastUpdate
    );
    
    tower.connectedHikers = data.connectedHikers || [];
    
    return tower;
  }
}