/**
 * Firebase configuration and data fetching utilities
 */
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, update } from "firebase/database";

// Your web app's Firebase configuration
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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Safely parse timestamp from server data
 * @param {*} timestamp - Timestamp from server (could be in time field too)
 * @returns {number} Valid timestamp in milliseconds
 */
function parseTimestamp(timestamp) {
  if (!timestamp) return Date.now();
  
  // If it's already a number, ensure it's a valid timestamp
  if (typeof timestamp === 'number') {
    // Check if it's a recent timestamp (within the last year)
    const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
    if (timestamp > oneYearAgo) return timestamp;
    
    // If it's in seconds format (UNIX timestamp), convert to milliseconds
    if (timestamp < 10000000000) return timestamp * 1000;
    
    return timestamp;
  }
  
  // If it's a string, try to parse it
  if (typeof timestamp === 'string') {
    // Handle time format like "03:39:05" (local time)
    if (timestamp.includes(':')) {
      try {
        // Get current date
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        
        // Parse hours, minutes, seconds
        const [hours, minutes, seconds] = timestamp.split(':').map(Number);
        
        // Create date in local time
        const date = new Date(year, month, day, hours, minutes, seconds);
        
        console.log(`Parsed time string "${timestamp}" to:`, {
          localTime: date.toString(),
          milliseconds: date.getTime()
        });
        
        return date.getTime();
      } catch (error) {
        console.error('Error parsing time string:', error);
      }
    }
    
    // Try parsing as number
    const numericTimestamp = Number(timestamp);
    if (!isNaN(numericTimestamp)) {
      // If it's a small number, assume it's seconds and convert to milliseconds
      if (numericTimestamp < 10000000000) return numericTimestamp * 1000;
      return numericTimestamp;
    }
    
    // Try parsing as date string
    const dateTimestamp = new Date(timestamp).getTime();
    if (!isNaN(dateTimestamp)) return dateTimestamp;
  }
  
  // Default to current time if parsing fails
  console.warn(`Failed to parse timestamp: ${timestamp}, using current time instead`);
  return Date.now();
}

/**
 * Calculate the distance between two coordinates in meters using the Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in meters
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d; // Distance in meters
}

/**
 * Determine hiker's movement status based on recent location logs
 * @param {Array} logs - Array of log entries sorted by timestamp (newest first)
 * @returns {string} Movement status: "Moving", "Active", "Resting", or "Unknown"
 */
function determineMovementStatus(logs) {
  // Need at least 2 logs to determine movement
  if (!logs || logs.length < 2) {
    return "Unknown";
  }

  // Configuration values
  const MOVING_THRESHOLD = 5; // meters per minute to be considered "Moving"
  const ACTIVE_THRESHOLD = 2; // meters per minute to be considered "Active"
  const TIME_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds
  
  // Get the most recent log
  const latestLog = logs[0];
  const latestTime = parseTimestamp(latestLog.timestamp || latestLog.time);
  const latestLat = parseFloat(latestLog.latitude) || 0;
  const latestLon = parseFloat(latestLog.longitude) || 0;
  
  // Filter logs that are within the time window
  const recentLogs = logs.filter(log => {
    const logTime = parseTimestamp(log.timestamp || log.time);
    return (latestTime - logTime) <= TIME_WINDOW;
  });
  
  // Calculate distances and times between consecutive points
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
    
    // Calculate distance between points
    const distance = calculateDistance(currentLat, currentLon, previousLat, previousLon);
    
    // Calculate time difference in minutes
    const timeDiffMinutes = (currentTime - previousTime) / (1000 * 60);
    
    // Only count valid measurements
    if (timeDiffMinutes > 0) {
      totalDistance += distance;
      totalTimeMinutes += timeDiffMinutes;
    }
  }
  
  // Calculate average speed in meters per minute
  const averageSpeed = totalTimeMinutes > 0 ? (totalDistance / totalTimeMinutes) : 0;
  
  // Determine status based on average speed
  if (averageSpeed >= MOVING_THRESHOLD) {
    return "Moving";
  } else if (averageSpeed >= ACTIVE_THRESHOLD) {
    return "Active";
  } else {
    return "Resting";
  }
}

/**
 * Fetch hikers data from Firebase, getting the latest entry from logs for each hiker
 * @returns {Promise<Array>} Promise resolving to an array of hiker objects
 */
export async function fetchHikersFromFirebase() {
  try {
    // Reference to the 'runners' node in the database
    const runnersRef = ref(database, 'runners');
    
    // Get a snapshot of all runners
    const snapshot = await get(runnersRef);
    const runnersData = snapshot.val();
    
    console.log('Firebase data received:', runnersData);
    
    if (!runnersData) {
      console.warn('No hikers data found in Firebase.');
      return [];
    }
    
    // Import Hiker model
    const { default: Hiker } = await import('../models/Hiker.js');
    
    // Transform data into Hiker objects
    const hikers = [];
    for (const nodeKey of Object.keys(runnersData)) {
      const nodeData = runnersData[nodeKey];
      console.log(`Processing runner ${nodeKey}:`, nodeData);
      
      // Get the name and active status from the node level
      const name = nodeData.name || `Hiker ${nodeKey}`;
      const isActive = nodeData.active !== false; // Default to active if not specified
      
      // Get tracking data from logs for this hiker
      let trackingData = {
        latitude: 0,
        longitude: 0,
        battery: 100,
        sos_status: false,
        timestamp: Date.now()
      };
      
      let logs = [];
      let movementStatus = "Unknown";
      
      if (nodeData.logs) {
        // Convert logs object to array and sort by timestamp
        logs = Object.values(nodeData.logs)
          .sort((a, b) => {
            // Use time field if timestamp is not available
            const aTime = a.timestamp || a.time;
            const bTime = b.timestamp || b.time;
            return parseTimestamp(bTime) - parseTimestamp(aTime);
          });
        
        // Use the most recent log entry
        if (logs.length > 0) {
          trackingData = logs[0];
          console.log(`Using latest log for ${nodeKey}:`, {
            time: trackingData.time,
            latitude: trackingData.latitude,
            longitude: trackingData.longitude,
            battery: trackingData.battery,
            sos: trackingData.sos_status
          });
          
          // Determine movement status if there's enough data
          movementStatus = determineMovementStatus(logs);
        }
      }
      
      // Parse latitude and longitude as numbers
      const latitude = parseFloat(trackingData.latitude) || 0;
      const longitude = parseFloat(trackingData.longitude) || 0;
      
      // Parse timestamp properly - look for time field if timestamp is not present
      const timestamp = parseTimestamp(trackingData.timestamp || trackingData.time);
      
      // Determine overall status
      let status;
      if (trackingData.sos_status) {
        status = 'SOS';
      } else if (!isActive) {
        status = 'Inactive';
      } else {
        status = movementStatus;
      }
      
      // Create a hiker object using the latest data
      let hikerId = nodeKey;
      if (trackingData.node_id) {
        if (typeof trackingData.node_id === 'string') {
          hikerId = trackingData.node_id.replace(/"/g, ''); // Remove quotes if present
        } else {
          hikerId = String(trackingData.node_id);
        }
      }
      
      console.log(`Creating hiker with ID: ${hikerId} (from ${nodeKey})`, {
        coordinates: [latitude, longitude],
        parsedTimestamp: new Date(timestamp).toLocaleString(),
        originalTime: trackingData.time
      });
      
      const hiker = new Hiker(
        hikerId,
        name,
        latitude,
        longitude,
        status,
        parseFloat(trackingData.battery) || 100,
        timestamp,
        trackingData.sos_status === 'true' || trackingData.sos_status === true
      );
      
      hikers.push(hiker);
    }
    
    console.log('Processed hikers:', hikers);
    return hikers;
  } catch (error) {
    console.error('Error fetching hikers from Firebase:', error);
    return [];
  }
}

/**
 * Set up a real-time listener for hikers data
 * @param {Function} callback - Function to call when data updates
 * @returns {Function} Function to call to unsubscribe from updates
 */
export function listenForHikersUpdates(callback) {
  try {
    // Reference to the 'runners' node
    const runnersRef = ref(database, 'runners');
    
    // Set up a listener for changes
    const unsubscribe = onValue(runnersRef, async (snapshot) => {
      const runnersData = snapshot.val();
      
      console.log('Real-time update received:', runnersData);
      
      if (!runnersData) {
        console.warn('No runners data in update');
        callback([]);
        return;
      }
      
      // Import Hiker model
      const { default: Hiker } = await import('../models/Hiker.js');
      
      // Transform data into Hiker objects
      const hikers = [];
      for (const nodeKey of Object.keys(runnersData)) {
        const nodeData = runnersData[nodeKey];
        console.log(`Real-time update for ${nodeKey}:`, nodeData);
        
        // Get the name and active status from the node level
        const name = nodeData.name || `Hiker ${nodeKey}`;
        const isActive = nodeData.active !== false; // Default to active if not specified
        
        // Get tracking data from logs for this hiker
        let trackingData = {
          latitude: 0,
          longitude: 0,
          battery: 100,
          sos_status: false,
          timestamp: Date.now()
        };
        
        let logs = [];
        let movementStatus = "Unknown";
        
        if (nodeData.logs) {
          // Convert logs object to array and sort by timestamp
          logs = Object.values(nodeData.logs)
            .sort((a, b) => {
              // Use time field if timestamp is not available
              const aTime = a.timestamp || a.time;
              const bTime = b.timestamp || b.time;
              return parseTimestamp(bTime) - parseTimestamp(aTime);
            });
          
          // Use the most recent log entry
          if (logs.length > 0) {
            trackingData = logs[0];
            console.log(`Using latest log for ${nodeKey}:`, {
              time: trackingData.time,
              latitude: trackingData.latitude,
              longitude: trackingData.longitude,
              battery: trackingData.battery,
              sos: trackingData.sos_status
            });
            
            // Determine movement status if there's enough data
            movementStatus = determineMovementStatus(logs);
          }
        }
        
        // Parse latitude and longitude as numbers
        const latitude = parseFloat(trackingData.latitude) || 0;
        const longitude = parseFloat(trackingData.longitude) || 0;
        
        // Parse timestamp properly - look for time field if timestamp is not present
        const timestamp = parseTimestamp(trackingData.timestamp || trackingData.time);
        
        // Determine overall status
        let status;
        if (trackingData.sos_status) {
          status = 'SOS';
        } else if (!isActive) {
          status = 'Inactive';
        } else {
          status = movementStatus;
        }
        
        // Create a hiker object using the latest data
        let hikerId = nodeKey;
        if (trackingData.node_id) {
          if (typeof trackingData.node_id === 'string') {
            hikerId = trackingData.node_id.replace(/"/g, ''); // Remove quotes if present
          } else {
            hikerId = String(trackingData.node_id);
          }
        }
        
        console.log(`Creating hiker with ID: ${hikerId} (from ${nodeKey})`, {
          coordinates: [latitude, longitude],
          parsedTimestamp: new Date(timestamp).toLocaleString(),
          originalTime: trackingData.time
        });
        
        const hiker = new Hiker(
          hikerId,
          name,
          latitude,
          longitude,
          status,
          parseFloat(trackingData.battery) || 100,
          timestamp,
          trackingData.sos_status === 'true' || trackingData.sos_status === true
        );
        
        hikers.push(hiker);
      }
      
      console.log('Processed hikers from real-time update:', hikers);
      callback(hikers);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up hikers listener:', error);
    return () => {};
  }
}

/**
 * Update hiker's active status at the node level
 * @param {string} hikerId - The ID of the hiker to update
 * @param {boolean} isActive - Whether the hiker is active
 * @returns {Promise<boolean>} Promise resolving to success status
 */
export async function updateHikerActiveStatus(hikerId, isActive) {
  try {
    if (!hikerId) {
      console.error('No hiker ID provided for active status update');
      return false;
    }
    
    console.log(`Updating active status for hiker ${hikerId} to ${isActive}`);
    
    // Update active status at the node level
    const nodeRef = ref(database, `runners/${hikerId}`);
    await update(nodeRef, { active: isActive });
    
    console.log(`Active status updated for hiker ${hikerId}`);
    return true;
  } catch (error) {
    console.error('Error updating hiker active status:', error);
    return false;
  }
}

/**
 * Update hiker tracking data and store in logs
 * @param {string} hikerId - The ID of the hiker to update
 * @param {Object} trackingData - The tracking data to update (latitude, longitude, battery, etc.)
 * @returns {Promise<void>}
 */
export async function updateHikerData(hikerId, trackingData) {
  try {
    if (!hikerId) {
      console.error('No hiker ID provided for update');
      return;
    }
    
    // Get current server timestamp
    const currentTime = Date.now();
    
    // Add timestamp to tracking data
    const dataWithTimestamp = {
      ...trackingData,
      timestamp: currentTime
    };
    
    // Only create a log entry for tracking data
    const logRef = ref(database, `runners/${hikerId}/logs/${currentTime}`);
    await update(logRef, dataWithTimestamp);
    
    console.log(`Updated tracking data for hiker ${hikerId}:`, dataWithTimestamp);
  } catch (error) {
    console.error('Error updating hiker tracking data:', error);
    throw error;
  }
}

/**
 * Update hiker SOS status and store in logs
 * @param {string} hikerId - The ID of the hiker to update
 * @param {boolean} sosStatus - The new SOS status
 * @param {boolean} sosHandled - Whether SOS is handled (optional)
 * @param {boolean} sosEmergency - Whether emergency services are dispatched (optional)
 * @param {boolean} resetSos - Whether to reset all SOS statuses (optional)
 * @returns {Promise<void>}
 */
export async function updateHikerSosStatus(hikerId, sosStatus, sosHandled = false, sosEmergency = false, resetSos = false) {
  try {
    if (!hikerId) {
      console.error('No hiker ID provided for SOS status update');
      return;
    }
    
    // Get current server timestamp
    const currentTime = Date.now();
    
    // Prepare update data
    let updates = {};
    
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
    
    // Create a log entry for SOS status
    const logRef = ref(database, `runners/${hikerId}/logs/${currentTime}`);
    await update(logRef, updates);
    
    console.log(`Updated SOS status for hiker ${hikerId}:`, updates);
  } catch (error) {
    console.error('Error updating SOS status:', error);
    throw error;
  }
}

/**
 * Create a BaseCommand entry for device communication
 * @param {string} toDeviceId - The target device ID (e.g., "NODE_1")
 * @param {string} fromDeviceId - The source device ID (e.g., "BASECAMP_01")
 * @param {string} message - The message to send
 * @returns {Promise<boolean>} Promise resolving to success status
 */
export async function createBaseCommand(toDeviceId, fromDeviceId, message) {
  try {
    if (!toDeviceId || !fromDeviceId || !message) {
      console.error('Missing required parameters for BaseCommand:', {
        toDeviceId,
        fromDeviceId,
        message
      });
      return false;
    }
    
    // Get current server timestamp
    const currentTime = Date.now();
    
    // Create command object
    const command = {
      toDeviceID: toDeviceId,
      fromDeviceID: fromDeviceId,
      message: message,
      timestamp: currentTime
    };
    
    // Create unique command ID using timestamp
    const commandId = `cmd_${currentTime}`;
    
    // Store command in BaseCommand path
    const commandRef = ref(database, `BaseCommand/${commandId}`);
    await update(commandRef, command);
    
    console.log(`BaseCommand created successfully:`, {
      commandId,
      command
    });
    
    return true;
  } catch (error) {
    console.error('Error creating BaseCommand:', error);
    return false;
  }
}

/**
 * Update node name in Firebase - storing it at the node level, not in logs
 * @param {string} nodeId - The ID of the node to update
 * @param {string} name - The new name for the node
 * @returns {Promise<boolean>} Promise resolving to success status
 */
export async function updateNodeName(nodeId, name) {
  try {
    if (!nodeId) {
      console.error('No node ID provided for name update');
      return false;
    }
    
    if (!name || typeof name !== 'string') {
      console.error('Invalid name provided for update:', name);
      return false;
    }
    
    console.log(`Starting Firebase name update for node ${nodeId}:`, name);
    
    // Update just the name at the node level
    const nodeRef = ref(database, `runners/${nodeId}`);
    await update(nodeRef, { name: name });
    
    console.log(`Name update successful for node ${nodeId}`);
    return true;
  } catch (error) {
    console.error(`Error updating node ${nodeId} name:`, error);
    return false;
  }
} 