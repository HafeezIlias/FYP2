/**
 * Firebase Services - Main Index
 * Exports all Firebase services for easy importing
 */

// Legacy compatibility imports
import { firebaseHikerService } from "./firebaseHiker";
import { firebaseTowerService } from "./firebaseTower";
import { firebaseTrackService } from "./firebaseTrack";
import { firebaseCommandService } from "./firebaseCommand";

// Export configuration and utilities
export { database, app } from "./firebaseConfig";
export { parseTimestamp, calculateDistance } from "./utils";

// Export service classes
export { FirebaseHikerService, firebaseHikerService } from "./firebaseHiker";
export { FirebaseTowerService, firebaseTowerService } from "./firebaseTower";
export { FirebaseTrackService, firebaseTrackService } from "./firebaseTrack";
export { FirebaseCommandService, firebaseCommandService } from "./firebaseCommand";
export { FirebaseSharingService, firebaseSharingService, type ShareToken } from "./firebaseSharing";

/**
 * Legacy FirebaseService class for backward compatibility
 * Combines all services into a single interface
 */
export class FirebaseService {
  // Delegate to individual services
  private hikerService = firebaseHikerService;
  private towerService = firebaseTowerService;
  private trackService = firebaseTrackService;
  private commandService = firebaseCommandService;

  // Hiker methods
  async fetchHikers() {
    return this.hikerService.fetchHikers();
  }

  listenForHikerUpdates(callback: (hikers: any[]) => void) {
    return this.hikerService.listenForHikerUpdates(callback);
  }

  async updateHikerSosStatus(hikerId: string, sosStatus: boolean, sosHandled?: boolean, sosEmergency?: boolean, resetSos?: boolean) {
    return this.hikerService.updateHikerSosStatus(hikerId, sosStatus, sosHandled, sosEmergency, resetSos);
  }

  async updateHikerName(hikerId: string, newName: string) {
    return this.hikerService.updateHikerName(hikerId, newName);
  }

  async updateNodeName(nodeId: string, name: string) {
    return this.hikerService.updateNodeName(nodeId, name);
  }

  // Tower methods
  async fetchTowers() {
    return this.towerService.fetchTowers();
  }

  listenForTowerUpdates(callback: (towers: any[]) => void) {
    return this.towerService.listenForTowerUpdates(callback);
  }

  async addTower(tower: any) {
    return this.towerService.addTower(tower);
  }

  async updateTower(towerId: string, updates: any) {
    return this.towerService.updateTower(towerId, updates);
  }

  async deleteTower(towerId: string) {
    return this.towerService.deleteTower(towerId);
  }

  // Track methods
  async fetchSafetyTracks() {
    return this.trackService.fetchSafetyTracks();
  }

  listenForSafetyTrackUpdates(callback: (tracks: any[]) => void) {
    return this.trackService.listenForSafetyTrackUpdates(callback);
  }

  async addSafetyTrack(track: any) {
    return this.trackService.addSafetyTrack(track);
  }

  async updateSafetyTrack(trackId: string, updates: any) {
    return this.trackService.updateSafetyTrack(trackId, updates);
  }

  async deleteSafetyTrack(trackId: string) {
    return this.trackService.deleteSafetyTrack(trackId);
  }

  // Command methods
  async createBaseCommand(toDeviceId: string, fromDeviceId: string, message: string) {
    return this.commandService.createBaseCommand(toDeviceId, fromDeviceId, message);
  }

  async sendCommand(deviceId: string, command: string, data?: any) {
    return this.commandService.sendCommand(deviceId, command, data);
  }

  async sendNotification(deviceId: string, title: string, message: string, priority?: 'low' | 'normal' | 'high') {
    return this.commandService.sendNotification(deviceId, title, message, priority);
  }

  async sendEmergencyAlert(deviceId: string, message: string) {
    return this.commandService.sendEmergencyAlert(deviceId, message);
  }

  // Cleanup method
  cleanup(): void {
    this.hikerService.cleanup();
    this.towerService.cleanup();
    this.trackService.cleanup();
  }
}

// Export singleton instance for backward compatibility
export const firebaseService = new FirebaseService();