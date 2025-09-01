/**
 * Firebase service for Tower-related operations
 */
import { ref, onValue, get, update, set, remove, DataSnapshot } from "firebase/database";
import { database } from "./firebaseConfig";
import type { Tower } from "../../types";

/**
 * Firebase Tower Service Class
 */
export class FirebaseTowerService {
  private unsubscribeCallbacks: Array<() => void> = [];

  /**
   * Fetch towers data from Firebase
   */
  async fetchTowers(): Promise<Tower[]> {
    try {
      const towersRef = ref(database, 'towers');
      const snapshot = await get(towersRef);
      const towersData = snapshot.val();
      
      console.log('Firebase towers data received:', towersData);
      
      if (!towersData) {
        return [];
      }

      // Convert Firebase object to array of towers
      const towers: Tower[] = Object.keys(towersData).map(id => ({
        id,
        ...towersData[id]
      }));

      return towers;
    } catch (error) {
      console.error('Error fetching towers from Firebase:', error);
      throw error;
    }
  }

  /**
   * Listen for real-time tower updates
   */
  listenForTowerUpdates(callback: (towers: Tower[]) => void): () => void {
    try {
      const towersRef = ref(database, 'towers');
      
      const unsubscribe = onValue(towersRef, (snapshot: DataSnapshot) => {
        const towersData = snapshot.val();
        console.log('Real-time tower update received:', towersData);
        
        if (!towersData) {
          console.warn('No towers data in update');
          callback([]);
          return;
        }
        
        // Convert Firebase object to array of towers
        const towers: Tower[] = Object.keys(towersData).map(id => ({
          id,
          ...towersData[id]
        }));

        callback(towers);
      });
      
      this.unsubscribeCallbacks.push(unsubscribe);
      return unsubscribe;
    } catch (error) {
      console.error('Error setting up towers listener:', error);
      return () => {};
    }
  }

  /**
   * Add a new tower to Firebase
   */
  async addTower(tower: Omit<Tower, 'id'>): Promise<string> {
    try {
      const towerId = `tower_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const towerRef = ref(database, `towers/${towerId}`);
      
      const towerData = {
        ...tower,
        lastUpdate: Date.now()
      };
      
      await set(towerRef, towerData);
      
      console.log('Tower added to Firebase:', { id: towerId, ...towerData });
      return towerId;
    } catch (error) {
      console.error('Error adding tower to Firebase:', error);
      throw error;
    }
  }

  /**
   * Update an existing tower in Firebase
   */
  async updateTower(towerId: string, updates: Partial<Tower>): Promise<void> {
    try {
      if (!towerId) {
        throw new Error('Tower ID is required for update');
      }
      
      const towerRef = ref(database, `towers/${towerId}`);
      const updateData = {
        ...updates,
        lastUpdate: Date.now()
      };
      
      await update(towerRef, updateData);
      
      console.log(`Updated tower ${towerId} in Firebase:`, updateData);
    } catch (error) {
      console.error('Error updating tower in Firebase:', error);
      throw error;
    }
  }

  /**
   * Delete a tower from Firebase
   */
  async deleteTower(towerId: string): Promise<void> {
    try {
      if (!towerId) {
        throw new Error('Tower ID is required for deletion');
      }
      
      const towerRef = ref(database, `towers/${towerId}`);
      await remove(towerRef);
      
      console.log(`Deleted tower ${towerId} from Firebase`);
    } catch (error) {
      console.error('Error deleting tower from Firebase:', error);
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
export const firebaseTowerService = new FirebaseTowerService();