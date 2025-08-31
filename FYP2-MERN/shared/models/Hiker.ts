/**
 * Hiker Model - Shared between frontend and backend
 */
export class Hiker {
  public id: string;
  public name: string;
  public lat: number;
  public lon: number;
  public status: 'Active' | 'Resting' | 'Moving' | 'SOS' | 'Inactive';
  public battery: number;
  public lastUpdate: number;
  public sos: boolean;
  
  // SOS handling properties
  public sosHandled: boolean = false;
  public sosHandledTime?: number;
  public sosEmergencyDispatched: boolean = false;
  public sosEmergencyTime?: number;
  
  // Notification flags
  public sosNotified: boolean = false;
  public batteryNotified: boolean = false;
  
  // Simulation properties (only used in simulation mode)
  public speed?: number;
  public direction?: number;
  public directionalBias?: { lat: number; lon: number };
  public movementProbability?: number;
  public restProbability?: number;
  public resumeProbability?: number;
  public batteryDrainRate?: number;

  constructor(
    id: string, 
    name: string, 
    lat: number, 
    lon: number, 
    status: 'Active' | 'Resting' | 'Moving' | 'SOS' | 'Inactive' = 'Active', 
    battery: number = 100, 
    lastUpdate: number = Date.now(), 
    sos: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.status = status;
    this.battery = battery;
    this.lastUpdate = lastUpdate;
    this.sos = sos;
    
    // Initialize simulation properties if needed
    this.initializeSimulationProperties();
  }

  private initializeSimulationProperties(): void {
    this.speed = 0.0001 + Math.random() * 0.0002;
    this.direction = Math.random() * Math.PI * 2;
    this.directionalBias = {
      lat: Math.random() * 0.6 - 0.3,
      lon: Math.random() * 0.6 - 0.3
    };
    this.movementProbability = 0.9;
    this.restProbability = 0.05;
    this.resumeProbability = 0.3;
    this.batteryDrainRate = 0.1 + Math.random() * 0.3;
  }

  /**
   * Update hiker data with new position for live data
   */
  updateData(lat: number, lon: number, battery: number, status: 'Active' | 'Resting' | 'Moving' | 'SOS' | 'Inactive' = 'Active'): void {
    this.lat = lat;
    this.lon = lon;
    this.battery = battery;
    this.status = status;
    this.lastUpdate = Date.now();
  }

  /**
   * Update position for simulation
   */
  updatePosition(): void {
    if (this.sos) return;
    
    // Drain battery
    this.battery = Math.max(0, this.battery - (this.batteryDrainRate || 0.2));
    
    // Update status based on probabilities
    if (this.status === 'Active' && Math.random() < (this.restProbability || 0.05)) {
      this.status = 'Resting';
    } else if (this.status === 'Resting' && Math.random() < (this.resumeProbability || 0.3)) {
      this.status = 'Active';
    }
    
    // Only move if active and probability check passes
    if (this.status === 'Active' && Math.random() < (this.movementProbability || 0.9)) {
      // Slightly change direction (wander)
      this.direction = (this.direction || 0) + (Math.random() - 0.5) * 0.5;
      
      // Calculate movement with directional bias
      const latChange = Math.sin(this.direction) * (this.speed || 0.0001) + (this.directionalBias?.lat || 0) * 0.00002;
      const lonChange = Math.cos(this.direction) * (this.speed || 0.0001) + (this.directionalBias?.lon || 0) * 0.00002;
      
      // Update coordinates
      this.lat = parseFloat(this.lat.toString()) + latChange;
      this.lon = parseFloat(this.lon.toString()) + lonChange;
    }
    
    // Random chance for SOS
    if (!this.sos) {
      const sosProbability = this.battery < 30 ? 0.01 : 0.002;
      if (Math.random() < sosProbability) {
        this.setSosStatus(true);
      }
    }
    
    this.lastUpdate = Date.now();
  }

  /**
   * Handle SOS - unified method for SOS response
   */
  handleSos(): boolean {
    if (this.sos && !this.sosHandled) {
      this.sosHandled = true;
      this.sosHandledTime = Date.now();
      this.sosEmergencyDispatched = true;
      this.sosEmergencyTime = Date.now();
      return true;
    }
    return false;
  }

  /**
   * Reset SOS status
   */
  resetSosStatus(): boolean {
    if (!this.sos) return false;
    
    this.sos = false;
    this.status = 'Active';
    this.sosHandled = false;
    this.sosHandledTime = undefined;
    this.sosEmergencyDispatched = false;
    this.sosEmergencyTime = undefined;
    this.sosNotified = false;
    
    return true;
  }

  /**
   * Set SOS status
   */
  setSosStatus(sosState: boolean): boolean {
    if (sosState === this.sos) return false;
    
    this.sos = sosState;
    if (sosState) {
      this.status = 'SOS';
      this.sosHandled = false;
      this.sosHandledTime = undefined;
      this.sosEmergencyDispatched = false;
      this.sosEmergencyTime = undefined;
    } else {
      this.status = 'Active';
    }
    
    return true;
  }

  /**
   * Get SOS status text
   */
  getSosStatusText(): string {
    if (!this.sos) return 'No SOS Active';
    if (this.sosHandled) return 'Help On The Way';
    return 'Pending Response';
  }

  /**
   * Format time for display
   */
  static formatTime(timestamp?: number): string {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString();
  }

  /**
   * Convert to plain object (for JSON serialization)
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      lat: this.lat,
      lon: this.lon,
      status: this.status,
      battery: this.battery,
      lastUpdate: this.lastUpdate,
      sos: this.sos,
      sosHandled: this.sosHandled,
      sosHandledTime: this.sosHandledTime,
      sosEmergencyDispatched: this.sosEmergencyDispatched,
      sosEmergencyTime: this.sosEmergencyTime,
      sosNotified: this.sosNotified,
      batteryNotified: this.batteryNotified
    };
  }

  /**
   * Create from plain object
   */
  static fromJSON(data: any): Hiker {
    const hiker = new Hiker(
      data.id,
      data.name,
      data.lat,
      data.lon,
      data.status,
      data.battery,
      data.lastUpdate,
      data.sos
    );
    
    // Restore additional properties
    hiker.sosHandled = data.sosHandled || false;
    hiker.sosHandledTime = data.sosHandledTime;
    hiker.sosEmergencyDispatched = data.sosEmergencyDispatched || false;
    hiker.sosEmergencyTime = data.sosEmergencyTime;
    hiker.sosNotified = data.sosNotified || false;
    hiker.batteryNotified = data.batteryNotified || false;
    
    return hiker;
  }
}