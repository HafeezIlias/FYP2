/**
 * Firebase service for SafetyTrack-related operations
 */
import { ref, onValue, get, update, set, remove, DataSnapshot } from "firebase/database";
import { database } from "./firebaseConfig";
import type { SafetyTrack } from "../../types";

/**
 * Firebase Safety Track Service Class
 */
export class FirebaseTrackService {
  private unsubscribeCallbacks: Array<() => void> = [];

  /**
   * Fetch safety tracks data from Firebase
   */
  async fetchSafetyTracks(): Promise<SafetyTrack[]> {
    try {
      const tracksRef = ref(database, 'safetyTracks');
      const snapshot = await get(tracksRef);
      const tracksData = snapshot.val();
      
      console.log('Firebase safety tracks data received:', tracksData);
      
      if (!tracksData) {
        return [];
      }

      // Convert Firebase object to array of tracks
      const tracks: SafetyTrack[] = Object.keys(tracksData).map(id => ({
        id,
        ...tracksData[id]
      }));

      return tracks;
    } catch (error) {
      console.error('Error fetching safety tracks from Firebase:', error);
      throw error;
    }
  }

  /**
   * Listen for real-time safety track updates
   */
  listenForSafetyTrackUpdates(callback: (tracks: SafetyTrack[]) => void): () => void {
    try {
      const tracksRef = ref(database, 'safetyTracks');
      
      const unsubscribe = onValue(tracksRef, (snapshot: DataSnapshot) => {
        const tracksData = snapshot.val();
        console.log('Real-time safety track update received:', tracksData);
        
        if (!tracksData) {
          console.warn('No safety tracks data in update');
          callback([]);
          return;
        }
        
        // Convert Firebase object to array of tracks
        const tracks: SafetyTrack[] = Object.keys(tracksData).map(id => ({
          id,
          ...tracksData[id]
        }));

        callback(tracks);
      });
      
      this.unsubscribeCallbacks.push(unsubscribe);
      return unsubscribe;
    } catch (error) {
      console.error('Error setting up safety tracks listener:', error);
      return () => {};
    }
  }

  /**
   * Add a new safety track to Firebase
   */
  async addSafetyTrack(track: Omit<SafetyTrack, 'id'>): Promise<string> {
    try {
      const trackId = `track_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const trackRef = ref(database, `safetyTracks/${trackId}`);
      
      const trackData = {
        ...track
      };
      
      await set(trackRef, trackData);
      
      console.log('Safety track added to Firebase:', { id: trackId, ...trackData });
      return trackId;
    } catch (error) {
      console.error('Error adding safety track to Firebase:', error);
      throw error;
    }
  }

  /**
   * Update an existing safety track in Firebase
   */
  async updateSafetyTrack(trackId: string, updates: Partial<SafetyTrack>): Promise<void> {
    try {
      if (!trackId) {
        throw new Error('Track ID is required for update');
      }
      
      const trackRef = ref(database, `safetyTracks/${trackId}`);
      
      await update(trackRef, updates);
      
      console.log(`Updated safety track ${trackId} in Firebase:`, updates);
    } catch (error) {
      console.error('Error updating safety track in Firebase:', error);
      throw error;
    }
  }

  /**
   * Delete a safety track from Firebase
   */
  async deleteSafetyTrack(trackId: string): Promise<void> {
    try {
      if (!trackId) {
        throw new Error('Track ID is required for deletion');
      }
      
      const trackRef = ref(database, `safetyTracks/${trackId}`);
      await remove(trackRef);
      
      console.log(`Deleted safety track ${trackId} from Firebase`);
    } catch (error) {
      console.error('Error deleting safety track from Firebase:', error);
      throw error;
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
export const firebaseTrackService = new FirebaseTrackService();