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
 * @param {*} timestamp - Timestamp from server
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
    // Try parsing as number first
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
  return Date.now();
}

/**
 * Fetch hikers data from Firebase
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
    Object.keys(runnersData).forEach((nodeKey) => {
      const nodeData = runnersData[nodeKey];
      console.log(`Processing runner ${nodeKey}:`, nodeData);
      
      // Parse latitude and longitude as numbers
      const latitude = parseFloat(nodeData.latitude) || 0;
      const longitude = parseFloat(nodeData.longitude) || 0;
      
      // Parse timestamp properly
      const timestamp = parseTimestamp(nodeData.timestamp);
      console.log(`${nodeKey} timestamp:`, nodeData.timestamp, '→', timestamp, '(', new Date(timestamp).toLocaleString(), ')');
      
      console.log(`${nodeKey} coordinates:`, latitude, longitude);
      
      // Create a hiker object for each node
      const hiker = new Hiker(
        nodeKey, // Use node key as ID
        `Hiker ${nodeKey}`, // Use node name as a default name
        latitude,
        longitude,
        nodeData.sos_status ? 'SOS' : 'Active',
        parseFloat(nodeData.battery) || 100,
        timestamp,
        nodeData.sos_status === 'true' || nodeData.sos_status === true
      );
      
      hikers.push(hiker);
    });
    
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
      Object.keys(runnersData).forEach((nodeKey) => {
        const nodeData = runnersData[nodeKey];
        console.log(`Real-time update for ${nodeKey}:`, nodeData);
        
        // Parse latitude and longitude as numbers
        const latitude = parseFloat(nodeData.latitude) || 0;
        const longitude = parseFloat(nodeData.longitude) || 0;
        
        // Parse timestamp properly
        const timestamp = parseTimestamp(nodeData.timestamp);
        console.log(`${nodeKey} timestamp:`, nodeData.timestamp, '→', timestamp, '(', new Date(timestamp).toLocaleString(), ')');
        
        // Create a hiker object for each node
        const hiker = new Hiker(
          nodeKey, // Use node key as ID
          `Hiker ${nodeKey}`, // Use node name as a default name
          latitude,
          longitude,
          nodeData.sos_status ? 'SOS' : 'Active',
          parseFloat(nodeData.battery) || 100,
          timestamp,
          nodeData.sos_status === 'true' || nodeData.sos_status === true
        );
        
        hikers.push(hiker);
      });
      
      console.log('Processed hikers from real-time update:', hikers);
      callback(hikers);
    });
    
    // Return a function to unsubscribe
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up hikers listener:', error);
    return () => {};
  }
}

/**
 * Update hiker SOS status in Firebase
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
    
    console.log(`Starting Firebase update for hiker ${hikerId}`, {
      sosStatus,
      sosHandled,
      sosEmergency,
      resetSos
    });
    
    // Create reference to the specific hiker node
    const hikerRef = ref(database, `runners/${hikerId}`);
    
    // Get current data to verify values
    const snapshot = await get(hikerRef);
    const currentData = snapshot.val();
    console.log(`Current data for hiker ${hikerId}:`, currentData);
    
    // Get current server timestamp
    const currentTime = Date.now();
    
    // Prepare update data
    let updates = {};
    
    if (resetSos) {
      // Reset all SOS fields - use null to properly remove values in Firebase
      updates = {
        sos_status: false,
        sos_handled: null,
        sos_handled_time: null,
        sos_emergency: null,
        sos_emergency_time: null,
        status: 'Active',
        timestamp: currentTime // Update the timestamp to the current time
      };
      console.log(`Resetting SOS status for hiker ${hikerId} with values:`, updates);
    } else {
      // Regular update
      updates.sos_status = sosStatus;
      updates.timestamp = currentTime; // Update the timestamp to the current time
      
      // Add handled/emergency status if applicable
      if (sosHandled) {
        updates.sos_handled = true;
        updates.sos_handled_time = currentTime;
      }
      
      if (sosEmergency) {
        updates.sos_emergency = true;
        updates.sos_emergency_time = currentTime;
      }
    }
    
    // Update the database
    console.log(`Sending update to Firebase for hiker ${hikerId}:`, updates);
    await update(hikerRef, updates);
    
    // Verify the update worked by reading data again
    const updatedSnapshot = await get(hikerRef);
    const updatedData = updatedSnapshot.val();
    console.log(`Updated data for hiker ${hikerId}:`, updatedData);
    
  } catch (error) {
    console.error('Error updating hiker SOS status in Firebase:', error);
    throw error;
  }
} 