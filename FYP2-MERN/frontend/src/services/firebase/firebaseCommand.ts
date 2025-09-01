/**
 * Firebase service for Command/Communication-related operations
 */
import { ref, update } from "firebase/database";
import { database } from "./firebaseConfig";

/**
 * Firebase Command Service Class
 */
export class FirebaseCommandService {

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
      const commandRef = ref(database, `BaseCommand/${commandId}`);
      await update(commandRef, command);
      
      console.log('BaseCommand created successfully:', { commandId, command });
      return true;
    } catch (error) {
      console.error('Error creating BaseCommand:', error);
      return false;
    }
  }

  /**
   * Send command to specific device
   */
  async sendCommand(deviceId: string, command: string, data?: any): Promise<boolean> {
    try {
      const timestamp = Date.now();
      const commandData = {
        command,
        data: data || {},
        timestamp,
        status: 'pending'
      };

      const commandRef = ref(database, `commands/${deviceId}/${timestamp}`);
      await update(commandRef, commandData);

      console.log(`Command sent to device ${deviceId}:`, commandData);
      return true;
    } catch (error) {
      console.error('Error sending command:', error);
      return false;
    }
  }

  /**
   * Send notification command
   */
  async sendNotification(deviceId: string, title: string, message: string, priority: 'low' | 'normal' | 'high' = 'normal'): Promise<boolean> {
    try {
      return await this.sendCommand(deviceId, 'notification', {
        title,
        message,
        priority,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }

  /**
   * Send emergency alert to device
   */
  async sendEmergencyAlert(deviceId: string, message: string): Promise<boolean> {
    try {
      return await this.sendCommand(deviceId, 'emergency_alert', {
        message,
        priority: 'high',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      return false;
    }
  }
}

// Export singleton instance
export const firebaseCommandService = new FirebaseCommandService();