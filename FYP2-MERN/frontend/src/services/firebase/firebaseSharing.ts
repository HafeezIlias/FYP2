/**
 * Firebase service for Hiker Sharing/Public View operations
 */
import { ref, get, set, update, onValue, DataSnapshot } from "firebase/database";
import { database } from "./firebaseConfig";
import { Hiker } from "../../types";
import { parseTimestamp, calculateDistance } from "./utils";

/**
 * Share token interface
 */
export interface ShareToken {
  id: string;
  token: string;
  hikerId: string;
  hikerName: string;
  createdAt: number;
  createdBy?: string;
  expiresAt?: number;
  enabled: boolean;
  lastAccessed?: number;
  accessCount?: number;
}

/**
 * Generate a cryptographically secure random token
 */
function generateSecureToken(): string {
  // Use crypto.randomUUID if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, '');
  }

  // Fallback: generate random hex string
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Determine hiker's movement status based on recent location logs
 */
function determineMovementStatus(logs: any[]): string {
  if (!logs || logs.length < 2) return "Resting";

  const MOVING_THRESHOLD = 5; // meters per minute
  const ACTIVE_THRESHOLD = 2; // meters per minute
  const TIME_WINDOW = 10 * 60 * 1000; // 10 minutes
  const MIN_DISTANCE_THRESHOLD = 1; // minimum 1 meter to consider any movement

  const latestLog = logs[0];
  const latestTime = parseTimestamp(latestLog.timestamp || latestLog.time);

  const recentLogs = logs.filter(log => {
    const logTime = parseTimestamp(log.timestamp || log.time);
    return (latestTime - logTime) <= TIME_WINDOW;
  });

  if (recentLogs.length < 2) return "Resting";

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

  // If total distance is negligible, hiker is resting regardless of time
  if (totalDistance < MIN_DISTANCE_THRESHOLD) return "Resting";

  const averageSpeed = totalTimeMinutes > 0 ? (totalDistance / totalTimeMinutes) : 0;

  if (averageSpeed >= MOVING_THRESHOLD) return "Moving";
  if (averageSpeed >= ACTIVE_THRESHOLD) return "Active";
  return "Resting";
}

/**
 * Transform Firebase data to a single Hiker object
 */
function transformFirebaseDataToHiker(nodeData: any, hikerId: string): Hiker | null {
  if (!nodeData) return null;

  const name = nodeData.name || `Hiker ${hikerId}`;
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

  const sosStatus = trackingData.sos_status === true || trackingData.sos_status === 'true';
  const sosHandled = trackingData.sos_handled === true || trackingData.sos_handled === 'true';

  return {
    id: hikerId,
    name,
    lat: latitude,
    lon: longitude,
    status,
    battery: parseFloat(String(trackingData.battery)) || 100,
    lastUpdate: timestamp,
    sos: sosStatus,
    sosHandled,
    sosHandledTime: trackingData.sos_handled_time,
    sosEmergencyDispatched: trackingData.sos_emergency === true || trackingData.sos_emergency === 'true',
    sosEmergencyTime: trackingData.sos_emergency_time,
    sosNotified: false,
    batteryNotified: false
  };
}

/**
 * Firebase Sharing Service Class
 */
export class FirebaseSharingService {
  /**
   * Generate a shareable token for a hiker
   */
  async generateShareToken(
    hikerId: string,
    hikerName: string,
    expiresInDays?: number,
    createdBy?: string
  ): Promise<ShareToken> {
    try {
      const token = generateSecureToken();
      const tokenId = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const createdAt = Date.now();
      const expiresAt = expiresInDays ? createdAt + (expiresInDays * 24 * 60 * 60 * 1000) : undefined;

      const shareToken: ShareToken = {
        id: tokenId,
        token,
        hikerId,
        hikerName,
        createdAt,
        createdBy,
        expiresAt,
        enabled: true,
        accessCount: 0
      };

      // Save to Firebase under the hiker's sharedAccess node
      // Remove undefined fields as Firebase doesn't accept them
      const firebaseData: any = {
        id: tokenId,
        token,
        hikerId,
        hikerName,
        createdAt,
        enabled: true,
        accessCount: 0
      };

      // Only add optional fields if they are defined
      if (createdBy !== undefined) {
        firebaseData.createdBy = createdBy;
      }
      if (expiresAt !== undefined) {
        firebaseData.expiresAt = expiresAt;
      }

      const tokenRef = ref(database, `runners/${hikerId}/sharedAccess/${tokenId}`);
      await set(tokenRef, firebaseData);

      console.log(`Generated share token for hiker ${hikerId}:`, tokenId);
      return shareToken;
    } catch (error) {
      console.error('Error generating share token:', error);
      throw error;
    }
  }

  /**
   * Validate a share token and return associated hiker ID
   */
  async validateToken(token: string): Promise<{ valid: boolean; hikerId?: string; shareToken?: ShareToken }> {
    try {
      // Search for the token across all hikers
      const runnersRef = ref(database, 'runners');
      const snapshot = await get(runnersRef);

      if (!snapshot.exists()) {
        return { valid: false };
      }

      const runnersData = snapshot.val();

      // Search through all hikers' sharedAccess
      for (const hikerId of Object.keys(runnersData)) {
        const hikerData = runnersData[hikerId];

        if (hikerData.sharedAccess) {
          const tokens = Object.values(hikerData.sharedAccess) as ShareToken[];
          const matchingToken = tokens.find(t => t.token === token);

          if (matchingToken) {
            // Check if token is enabled
            if (!matchingToken.enabled) {
              console.log('Token found but disabled:', token);
              return { valid: false };
            }

            // Check if token has expired
            if (matchingToken.expiresAt && Date.now() > matchingToken.expiresAt) {
              console.log('Token found but expired:', token);
              return { valid: false };
            }

            // Update last accessed time and access count
            await this.updateTokenAccess(hikerId, matchingToken.id);

            return {
              valid: true,
              hikerId,
              shareToken: matchingToken
            };
          }
        }
      }

      console.log('Token not found:', token);
      return { valid: false };
    } catch (error) {
      console.error('Error validating token:', error);
      return { valid: false };
    }
  }

  /**
   * Update token access statistics
   */
  private async updateTokenAccess(hikerId: string, tokenId: string): Promise<void> {
    try {
      const tokenRef = ref(database, `runners/${hikerId}/sharedAccess/${tokenId}`);
      const snapshot = await get(tokenRef);
      const currentCount = snapshot.val()?.accessCount || 0;

      await update(tokenRef, {
        lastAccessed: Date.now(),
        accessCount: currentCount + 1
      });
    } catch (error) {
      console.error('Error updating token access:', error);
    }
  }

  /**
   * Get hiker data by share token
   */
  async getHikerByToken(token: string): Promise<Hiker | null> {
    try {
      const validation = await this.validateToken(token);

      if (!validation.valid || !validation.hikerId) {
        return null;
      }

      const hikerRef = ref(database, `runners/${validation.hikerId}`);
      const snapshot = await get(hikerRef);

      if (!snapshot.exists()) {
        return null;
      }

      const hikerData = snapshot.val();
      return transformFirebaseDataToHiker(hikerData, validation.hikerId);
    } catch (error) {
      console.error('Error getting hiker by token:', error);
      return null;
    }
  }

  /**
   * Listen for real-time updates to a shared hiker
   */
  listenToSharedHiker(token: string, callback: (hiker: Hiker | null) => void): () => void {
    let unsubscribe: (() => void) | null = null;

    // First validate the token
    this.validateToken(token).then(validation => {
      if (!validation.valid || !validation.hikerId) {
        callback(null);
        return;
      }

      const hikerRef = ref(database, `runners/${validation.hikerId}`);

      unsubscribe = onValue(hikerRef, (snapshot: DataSnapshot) => {
        if (!snapshot.exists()) {
          callback(null);
          return;
        }

        const hikerData = snapshot.val();
        const hiker = transformFirebaseDataToHiker(hikerData, validation.hikerId!);
        callback(hiker);
      });
    }).catch(error => {
      console.error('Error setting up shared hiker listener:', error);
      callback(null);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }

  /**
   * Get all share tokens for a hiker
   */
  async getHikerShareTokens(hikerId: string): Promise<ShareToken[]> {
    try {
      const tokensRef = ref(database, `runners/${hikerId}/sharedAccess`);
      const snapshot = await get(tokensRef);

      if (!snapshot.exists()) {
        return [];
      }

      const tokensData = snapshot.val();
      return Object.values(tokensData) as ShareToken[];
    } catch (error) {
      console.error('Error getting hiker share tokens:', error);
      return [];
    }
  }

  /**
   * Revoke/disable a share token
   */
  async revokeShareToken(hikerId: string, tokenId: string): Promise<void> {
    try {
      const tokenRef = ref(database, `runners/${hikerId}/sharedAccess/${tokenId}`);
      await update(tokenRef, {
        enabled: false,
        revokedAt: Date.now()
      });

      console.log(`Revoked share token ${tokenId} for hiker ${hikerId}`);
    } catch (error) {
      console.error('Error revoking share token:', error);
      throw error;
    }
  }

  /**
   * Delete a share token permanently
   */
  async deleteShareToken(hikerId: string, tokenId: string): Promise<void> {
    try {
      const tokenRef = ref(database, `runners/${hikerId}/sharedAccess/${tokenId}`);
      await set(tokenRef, null);

      console.log(`Deleted share token ${tokenId} for hiker ${hikerId}`);
    } catch (error) {
      console.error('Error deleting share token:', error);
      throw error;
    }
  }

  /**
   * Re-enable a revoked share token
   */
  async enableShareToken(hikerId: string, tokenId: string): Promise<void> {
    try {
      const tokenRef = ref(database, `runners/${hikerId}/sharedAccess/${tokenId}`);

      // First get the token to preserve its data
      const snapshot = await get(tokenRef);
      const tokenData = snapshot.val();

      if (tokenData) {
        // Remove revokedAt field by setting it to undefined, then update
        const updatedData = { ...tokenData, enabled: true };
        delete updatedData.revokedAt;

        await set(tokenRef, updatedData);
      } else {
        // If token doesn't exist, just update enabled status
        await update(tokenRef, { enabled: true });
      }

      console.log(`Enabled share token ${tokenId} for hiker ${hikerId}`);
    } catch (error) {
      console.error('Error enabling share token:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const firebaseSharingService = new FirebaseSharingService();
