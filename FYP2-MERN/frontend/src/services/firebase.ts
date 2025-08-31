/**
 * Firebase configuration and services for the MERN version
 */
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, update, DataSnapshot } from "firebase/database";
import { Hiker } from "../models/Hiker";

// Firebase configuration (same as original)
const firebaseConfig = {
  apiKey: "AIzaSyASPVcTGt_-Her5-40LHWcw7nlq-kI_o1g",
  authDomain: "trackers-5dd51.firebaseapp.com",
  databaseURL: "https://trackers-5dd51-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trackers-5dd51",
  storageBucket: "trackers-5dd51.firebasestorage.app",
  messagingSenderId: "434709020554",
  appId: "1:434709020554:web:c9b5fe4791350c52741273",
  measurementId: "G-LC52SPP7TF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Safely parse timestamp from server data
 */
function parseTimestamp(timestamp: any): number {
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
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
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

/**
 * Determine hiker's movement status based on recent location logs
 */
function determineMovementStatus(logs: any[]): string {
  if (!logs || logs.length < 2) return "Unknown";

  const MOVING_THRESHOLD = 5;
  const ACTIVE_THRESHOLD = 2;
  const TIME_WINDOW = 10 * 60 * 1000;
  
  const latestLog = logs[0];
  const latestTime = parseTimestamp(latestLog.timestamp || latestLog.time);
  
  const recentLogs = logs.filter(log => {
    const logTime = parseTimestamp(log.timestamp || log.time);
    return (latestTime - logTime) <= TIME_WINDOW;
  });
  
  let totalDistance = 0;
  let totalTimeMinutes = 0;
  
  for (let i = 0; i < recentLogs.length - 1; i++) {
    const currentLog = recentLogs[i];
    const previousLog = recentLogs[i + 1];
    
    const currentLat = parseFloat(currentLog.latitude) || 0;
    const currentLon = parseFloat(currentLog.longitude) || 0;
    const previousLat = parseFloat(previousLog.latitude) || 0;
    const previousLon = parseFloat(previousLog.longitude) || 0;
    
    const currentTime = parseTimestamp(currentLog.timestamp || currentLog.time);
    const previousTime = parseTimestamp(previousLog.timestamp || previousLog.time);
    
    const distance = calculateDistance(currentLat, currentLon, previousLat, previousLon);
    const timeDiffMinutes = (currentTime - previousTime) / (1000 * 60);
    
    if (timeDiffMinutes > 0) {
      totalDistance += distance;
      totalTimeMinutes += timeDiffMinutes;
    }
  }
  
  const averageSpeed = totalTimeMinutes > 0 ? (totalDistance / totalTimeMinutes) : 0;
  
  if (averageSpeed >= MOVING_THRESHOLD) return "Moving";
  if (averageSpeed >= ACTIVE_THRESHOLD) return "Active";
  return "Resting";
}

/**
 * Transform Firebase data to Hiker objects
 */
function transformFirebaseDataToHikers(runnersData: any): Hiker[] {
  if (!runnersData) return [];
  
  const hikers: Hiker[] = [];
  
  for (const nodeKey of Object.keys(runnersData)) {
    const nodeData = runnersData[nodeKey];
    
    const name = nodeData.name || `Hiker ${nodeKey}`;
    const isActive = nodeData.active !== false;
    
    let trackingData: any = {
      latitude: 0,
      longitude: 0,
      battery: 100,
      sos_status: false,
      timestamp: Date.now()
    };
    
    let logs: any[] = [];
    let movementStatus = "Unknown";
    
    if (nodeData.logs) {
      logs = Object.values(nodeData.logs)
        .sort((a: any, b: any) => {
          const aTime = a.timestamp || a.time;
          const bTime = b.timestamp || b.time;
          return parseTimestamp(bTime) - parseTimestamp(aTime);
        });
      
      if (logs.length > 0) {
        trackingData = logs[0];
        movementStatus = determineMovementStatus(logs);
      }
    }
    
    const latitude = parseFloat(String(trackingData.latitude)) || 0;
    const longitude = parseFloat(String(trackingData.longitude)) || 0;
    const timestamp = parseTimestamp(trackingData.timestamp || trackingData.time);
    
    let status: 'Active' | 'Resting' | 'Moving' | 'SOS' | 'Inactive';
    if (trackingData.sos_status) {
      status = 'SOS';
    } else if (!isActive) {
      status = 'Inactive';
    } else {
      status = movementStatus as any;
    }
    
    let hikerId = nodeKey;
    if (trackingData.node_id) {
      if (typeof trackingData.node_id === 'string') {
        hikerId = trackingData.node_id.replace(/"/g, '');
      } else {
        hikerId = String(trackingData.node_id);
      }
    }
    
    const hiker = new Hiker(
      hikerId,
      name,
      latitude,
      longitude,
      status,
      parseFloat(String(trackingData.battery)) || 100,
      timestamp,
      trackingData.sos_status === true || trackingData.sos_status === 'true'
    );
    
    hikers.push(hiker);
  }
  
  return hikers;
}

/**
 * Firebase Service Class
 */
export class FirebaseService {
  private database = database;
  private unsubscribeCallbacks: Array<() => void> = [];

  /**
   * Fetch hikers data from Firebase
   */
  async fetchHikers(): Promise<Hiker[]> {
    try {
      const runnersRef = ref(this.database, 'runners');
      const snapshot = await get(runnersRef);
      const runnersData = snapshot.val();
      
      console.log('Firebase data received:', runnersData);
      
      return transformFirebaseDataToHikers(runnersData);
    } catch (error) {
      console.error('Error fetching hikers from Firebase:', error);
      throw error;
    }
  }

  /**
   * Listen for real-time hiker updates
   */
  listenForHikerUpdates(callback: (hikers: Hiker[]) => void): () => void {
    try {
      const runnersRef = ref(this.database, 'runners');
      
      const unsubscribe = onValue(runnersRef, (snapshot: DataSnapshot) => {
        const runnersData = snapshot.val();
        console.log('Real-time update received:', runnersData);
        
        if (!runnersData) {
          console.warn('No runners data in update');
          callback([]);
          return;
        }
        
        const hikers = transformFirebaseDataToHikers(runnersData);
        callback(hikers);
      });
      
      this.unsubscribeCallbacks.push(unsubscribe);
      return unsubscribe;
    } catch (error) {
      console.error('Error setting up hikers listener:', error);
      return () => {};
    }
  }

  /**
   * Update hiker SOS status
   */
  async updateHikerSosStatus(
    hikerId: string, 
    sosStatus: boolean, 
    sosHandled: boolean = false, 
    sosEmergency: boolean = false, 
    resetSos: boolean = false
  ): Promise<void> {
    try {
      if (!hikerId) {
        throw new Error('No hiker ID provided for SOS status update');
      }
      
      const currentTime = Date.now();
      let updates: any = {};
      
      if (resetSos) {
        updates = {
          sos_status: false,
          sos_handled: null,
          sos_handled_time: null,
          sos_emergency: null,
          sos_emergency_time: null,
          status: 'Active',
          timestamp: currentTime
        };
      } else {
        updates = {
          sos_status: sosStatus,
          timestamp: currentTime
        };
        
        if (sosHandled) {
          updates.sos_handled = true;
          updates.sos_handled_time = currentTime;
        }
        
        if (sosEmergency) {
          updates.sos_emergency = true;
          updates.sos_emergency_time = currentTime;
        }
      }
      
      const logRef = ref(this.database, `runners/${hikerId}/logs/${currentTime}`);
      await update(logRef, updates);
      
      console.log(`Updated SOS status for hiker ${hikerId}:`, updates);
    } catch (error) {
      console.error('Error updating SOS status:', error);
      throw error;
    }
  }

  /**
   * Create a BaseCommand entry for device communication
   */
  async createBaseCommand(toDeviceId: string, fromDeviceId: string, message: string): Promise<boolean> {
    try {
      if (!toDeviceId || !fromDeviceId || !message) {
        console.error('Missing required parameters for BaseCommand');
        return false;
      }
      
      const currentTime = Date.now();
      const command = {
        toDeviceID: toDeviceId,
        fromDeviceID: fromDeviceId,
        message: message,
        timestamp: currentTime
      };
      
      const commandId = `cmd_${currentTime}`;
      const commandRef = ref(this.database, `BaseCommand/${commandId}`);
      await update(commandRef, command);
      
      console.log('BaseCommand created successfully:', { commandId, command });
      return true;
    } catch (error) {
      console.error('Error creating BaseCommand:', error);
      return false;
    }
  }

  /**
   * Update node name
   */
  async updateNodeName(nodeId: string, name: string): Promise<boolean> {
    try {
      if (!nodeId || !name) {
        console.error('Invalid parameters for name update');
        return false;
      }
      
      const nodeRef = ref(this.database, `runners/${nodeId}`);
      await update(nodeRef, { name: name });
      
      console.log(`Name updated for node ${nodeId}`);
      return true;
    } catch (error) {
      console.error(`Error updating node ${nodeId} name:`, error);
      return false;
    }
  }

  /**
   * Clean up all subscriptions
   */
  cleanup(): void {
    this.unsubscribeCallbacks.forEach(unsubscribe => unsubscribe());
    this.unsubscribeCallbacks = [];
  }
}

// Export singleton instance
export const firebaseService = new FirebaseService();