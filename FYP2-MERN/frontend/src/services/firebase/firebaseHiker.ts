/**
 * Firebase service for Hiker-related operations
 */
import { ref, onValue, get, update, DataSnapshot } from "firebase/database";
import { database } from "./firebaseConfig";
import { parseTimestamp, calculateDistance } from "./utils";
import { Hiker } from "../../models/Hiker";

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
 * Firebase Hiker Service Class
 */
export class FirebaseHikerService {
  private unsubscribeCallbacks: Array<() => void> = [];

  /**
   * Fetch hikers data from Firebase
   */
  async fetchHikers(): Promise<Hiker[]> {
    try {
      const runnersRef = ref(database, 'runners');
      const snapshot = await get(runnersRef);
      const runnersData = snapshot.val();
      
      console.log('Firebase hikers data received:', runnersData);
      
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
      const runnersRef = ref(database, 'runners');
      
      const unsubscribe = onValue(runnersRef, (snapshot: DataSnapshot) => {
        const runnersData = snapshot.val();
        console.log('Real-time hiker update received:', runnersData);
        
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
      
      const logRef = ref(database, `runners/${hikerId}/logs/${currentTime}`);
      await update(logRef, updates);
      
      console.log(`Updated SOS status for hiker ${hikerId}:`, updates);
    } catch (error) {
      console.error('Error updating SOS status:', error);
      throw error;
    }
  }

  /**
   * Update hiker name
   */
  async updateHikerName(hikerId: string, newName: string): Promise<void> {
    try {
      if (!hikerId || !newName) {
        throw new Error('Invalid parameters for hiker name update');
      }
      
      const hikerRef = ref(database, `runners/${hikerId}`);
      await update(hikerRef, { 
        name: newName.trim(),
        lastUpdate: Date.now() 
      });
      
      console.log(`Updated hiker ${hikerId} name to: ${newName} in Firebase`);
    } catch (error) {
      console.error('Error updating hiker name in Firebase:', error);
      throw error;
    }
  }

  /**
   * Update node name (legacy support)
   */
  async updateNodeName(nodeId: string, name: string): Promise<boolean> {
    try {
      if (!nodeId || !name) {
        console.error('Invalid parameters for name update');
        return false;
      }
      
      const nodeRef = ref(database, `runners/${nodeId}`);
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
export const firebaseHikerService = new FirebaseHikerService();