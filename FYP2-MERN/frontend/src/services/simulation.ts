import { Hiker } from '../types';

export class SimulationService {
  private intervalId: NodeJS.Timeout | null = null;
  private hikers: Hiker[] = [];
  private readonly baseLocation = { lat: 3.139, lng: 101.6869 };
  private readonly maxDistance = 0.01; // ~1km radius
  
  // Make these public so they can be set from outside
  public onHikerUpdate: (hikers: Hiker[]) => void = () => {};
  public onSosAlert: (hiker: Hiker) => void = () => {};

  start(settings: { speed: number; hikersCount: number; autoSos: boolean }) {
    if (this.intervalId) {
      this.stop();
    }

    // Generate initial hikers
    this.hikers = this.generateHikers(settings.hikersCount);
    this.onHikerUpdate(this.hikers);

    // Start simulation loop
    this.intervalId = setInterval(() => {
      this.updateHikers(settings.autoSos);
      this.onHikerUpdate([...this.hikers]);
    }, settings.speed);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.hikers = [];
  }

  isRunning(): boolean {
    return this.intervalId !== null;
  }

  private generateHikers(count: number): Hiker[] {
    const names = [
      'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Wilson',
      'Edward Davis', 'Fiona Miller', 'George Wilson', 'Hannah Taylor',
      'Ian Anderson', 'Julia Martinez', 'Kevin Lee', 'Lisa Garcia',
      'Michael Chen', 'Nancy Rodriguez', 'Oliver Thompson', 'Paula White',
      'Quinn Jackson', 'Rachel Green', 'Samuel King', 'Tina Lewis'
    ];

    const statuses: Hiker['status'][] = ['Active', 'Moving', 'Resting', 'Inactive'];
    const hikers: Hiker[] = [];

    // Create diverse test hikers for first few
    for (let index = 0; index < Math.min(count, 6); index++) {
      let hiker: Hiker;
      
      switch (index) {
        case 0: // Green - Healthy hiker
          hiker = {
            id: `sim_hiker_${index + 1}`,
            name: names[index % names.length],
            lat: this.baseLocation.lat + (Math.random() - 0.5) * this.maxDistance,
            lon: this.baseLocation.lng + (Math.random() - 0.5) * this.maxDistance,
            status: 'Active',
            battery: 85,
            lastUpdate: Date.now(),
            sos: false,
            sosHandled: false,
            sosEmergencyDispatched: false,
            sosNotified: false,
            batteryNotified: false
          };
          break;
        case 1: // Red - SOS hiker
          hiker = {
            id: `sim_hiker_${index + 1}`,
            name: names[index % names.length],
            lat: this.baseLocation.lat + (Math.random() - 0.5) * this.maxDistance,
            lon: this.baseLocation.lng + (Math.random() - 0.5) * this.maxDistance,
            status: 'SOS',
            battery: 45,
            lastUpdate: Date.now(),
            sos: true,
            sosHandled: false,
            sosEmergencyDispatched: false,
            sosNotified: false,
            batteryNotified: false
          };
          break;
        case 2: // Orange - Low battery
          hiker = {
            id: `sim_hiker_${index + 1}`,
            name: names[index % names.length],
            lat: this.baseLocation.lat + (Math.random() - 0.5) * this.maxDistance,
            lon: this.baseLocation.lng + (Math.random() - 0.5) * this.maxDistance,
            status: 'Moving',
            battery: 20,
            lastUpdate: Date.now(),
            sos: false,
            sosHandled: false,
            sosEmergencyDispatched: false,
            sosNotified: false,
            batteryNotified: false
          };
          break;
        case 3: // Blue - Resting
          hiker = {
            id: `sim_hiker_${index + 1}`,
            name: names[index % names.length],
            lat: this.baseLocation.lat + (Math.random() - 0.5) * this.maxDistance,
            lon: this.baseLocation.lng + (Math.random() - 0.5) * this.maxDistance,
            status: 'Resting',
            battery: 60,
            lastUpdate: Date.now(),
            sos: false,
            sosHandled: false,
            sosEmergencyDispatched: false,
            sosNotified: false,
            batteryNotified: false
          };
          break;
        case 4: // Gray - Inactive
          hiker = {
            id: `sim_hiker_${index + 1}`,
            name: names[index % names.length],
            lat: this.baseLocation.lat + (Math.random() - 0.5) * this.maxDistance,
            lon: this.baseLocation.lng + (Math.random() - 0.5) * this.maxDistance,
            status: 'Inactive',
            battery: 30,
            lastUpdate: Date.now(),
            sos: false,
            sosHandled: false,
            sosEmergencyDispatched: false,
            sosNotified: false,
            batteryNotified: false
          };
          break;
        case 5: // Red - Critical battery
          hiker = {
            id: `sim_hiker_${index + 1}`,
            name: names[index % names.length],
            lat: this.baseLocation.lat + (Math.random() - 0.5) * this.maxDistance,
            lon: this.baseLocation.lng + (Math.random() - 0.5) * this.maxDistance,
            status: 'Active',
            battery: 8,
            lastUpdate: Date.now(),
            sos: false,
            sosHandled: false,
            sosEmergencyDispatched: false,
            sosNotified: false,
            batteryNotified: false
          };
          break;
        default:
          hiker = {
            id: `sim_hiker_${index + 1}`,
            name: names[index % names.length],
            lat: this.baseLocation.lat + (Math.random() - 0.5) * this.maxDistance,
            lon: this.baseLocation.lng + (Math.random() - 0.5) * this.maxDistance,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            battery: Math.floor(Math.random() * 50) + 50,
            lastUpdate: Date.now(),
            sos: false,
            sosHandled: false,
            sosEmergencyDispatched: false,
            sosNotified: false,
            batteryNotified: false
          };
      }
      hikers.push(hiker);
    }

    // Generate remaining hikers randomly
    for (let index = hikers.length; index < count; index++) {
      hikers.push({
        id: `sim_hiker_${index + 1}`,
        name: names[index % names.length],
        lat: this.baseLocation.lat + (Math.random() - 0.5) * this.maxDistance,
        lon: this.baseLocation.lng + (Math.random() - 0.5) * this.maxDistance,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        battery: Math.floor(Math.random() * 50) + 50, // Start with 50-100% battery
        lastUpdate: Date.now(),
        sos: false,
        sosHandled: false,
        sosEmergencyDispatched: false,
        sosNotified: false,
        batteryNotified: false
      });
    }

    return hikers;
  }

  private updateHikers(autoSos: boolean) {
    const now = Date.now();

    this.hikers.forEach((hiker, index) => {
      // Update location with random movement
      if (hiker.status === 'Moving' || Math.random() < 0.3) {
        const moveDistance = 0.0001; // Small movement
        hiker.lat += (Math.random() - 0.5) * moveDistance;
        hiker.lon += (Math.random() - 0.5) * moveDistance;
        
        // Keep hikers within bounds
        hiker.lat = Math.max(
          this.baseLocation.lat - this.maxDistance/2,
          Math.min(this.baseLocation.lat + this.maxDistance/2, hiker.lat)
        );
        hiker.lon = Math.max(
          this.baseLocation.lng - this.maxDistance/2,
          Math.min(this.baseLocation.lng + this.maxDistance/2, hiker.lon)
        );
      }

      // Update status randomly
      if (Math.random() < 0.1) {
        const statuses: Hiker['status'][] = ['Active', 'Moving', 'Resting'];
        hiker.status = statuses[Math.floor(Math.random() * statuses.length)];
      }

      // Update battery (slowly drain)
      if (Math.random() < 0.05) { // Reduced from 20% to 5% chance
        hiker.battery = Math.max(0, hiker.battery - Math.floor(Math.random() * 2) + 1); // Drain 1-2 points
      }

      // Generate random SOS events
      if (autoSos && !hiker.sos && Math.random() < 0.005) { // 0.5% chance
        hiker.sos = true;
        hiker.sosHandled = false;
        hiker.sosEmergencyDispatched = false;
        hiker.status = 'SOS';
        this.onSosAlert(hiker);
      }

      // Auto-resolve SOS after some time (10% chance per update)
      if (hiker.sos && hiker.sosHandled && Math.random() < 0.1) {
        hiker.sos = false;
        hiker.sosHandled = false;
        hiker.sosEmergencyDispatched = false;
        hiker.status = 'Active';
      }

      hiker.lastUpdate = now;
    });
  }

  // Method to handle SOS manually
  handleSos(hikerId: string, handled: boolean) {
    const hiker = this.hikers.find(h => h.id === hikerId);
    if (hiker && hiker.sos) {
      hiker.sosHandled = handled;
      if (handled) {
        hiker.sosEmergencyDispatched = true;
      }
    }
  }

  // Method to reset SOS
  resetSos(hikerId: string) {
    const hiker = this.hikers.find(h => h.id === hikerId);
    if (hiker) {
      hiker.sos = false;
      hiker.sosHandled = false;
      hiker.sosEmergencyDispatched = false;
      hiker.status = 'Active';
    }
  }

  // Method to update simulation settings
  updateSettings(settings: { speed: number; hikersCount: number; autoSos: boolean }) {
    if (this.intervalId) {
      // If count changed, regenerate hikers
      if (this.hikers.length !== settings.hikersCount) {
        this.hikers = this.generateHikers(settings.hikersCount);
        this.onHikerUpdate(this.hikers);
      }

      // Restart with new speed
      this.stop();
      this.start(settings);
    }
  }
}

// Export singleton instance
export const simulationService = new SimulationService();