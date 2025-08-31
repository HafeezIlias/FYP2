/**
 * Socket.IO client service for real-time communication
 */
import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '../types';

class SocketService {
  private socket: Socket | null = null;
  private url: string;

  constructor() {
    this.url = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  }

  /**
   * Connect to the Socket.IO server
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve();
        return;
      }

      this.socket = io(this.url, {
        transports: ['websocket', 'polling'],
        timeout: 20000,
        forceNew: true
      });

      this.socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket.IO connection error:', error);
        reject(error);
      });

      this.socket.on('disconnect', (reason) => {
        console.log('Disconnected from Socket.IO server:', reason);
      });
    });
  }

  /**
   * Disconnect from the Socket.IO server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Check if socket is connected
   */
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  /**
   * Listen for events
   */
  on<K extends keyof SocketEvents>(event: K, callback: (data: SocketEvents[K]) => void): void {
    if (!this.socket) {
      console.warn('Socket not initialized. Call connect() first.');
      return;
    }

    this.socket.on(event as string, callback as any);
  }

  /**
   * Remove event listener
   */
  off<K extends keyof SocketEvents>(event: K, callback?: (data: SocketEvents[K]) => void): void {
    if (!this.socket) return;

    if (callback) {
      this.socket.off(event as string, callback as any);
    } else {
      this.socket.off(event as string);
    }
  }

  /**
   * Emit events
   */
  emit<K extends keyof SocketEvents>(event: K, data: SocketEvents[K]): void {
    if (!this.socket) {
      console.warn('Socket not initialized. Call connect() first.');
      return;
    }

    this.socket.emit(event as string, data);
  }

  /**
   * Join a room
   */
  joinRoom(room: string): void {
    if (!this.socket) {
      console.warn('Socket not initialized. Call connect() first.');
      return;
    }

    this.socket.emit('join_room', room);
  }

  /**
   * Leave a room
   */
  leaveRoom(room: string): void {
    if (!this.socket) {
      console.warn('Socket not initialized. Call connect() first.');
      return;
    }

    this.socket.emit('leave_room', room);
  }

  /**
   * Send hiker position update
   */
  sendHikerUpdate(hikerId: string, lat: number, lon: number, battery: number): void {
    this.emit('hiker:update', {
      hikerId,
      lat,
      lon,
      battery,
      timestamp: Date.now()
    });
  }

  /**
   * Send SOS alert
   */
  sendSosAlert(hikerId: string, status: boolean): void {
    this.emit('hiker:sos', { hikerId, status });
  }

  /**
   * Listen for hiker updates
   */
  onHikerUpdates(callback: (hikers: any[]) => void): void {
    this.on('hikers:update', callback);
  }

  /**
   * Listen for SOS alerts
   */
  onSosAlert(callback: (data: { hikerId: string; status: boolean }) => void): void {
    this.on('hiker:sos', callback);
  }

  /**
   * Listen for notifications
   */
  onNotification(callback: (notification: { type: string; message: string }) => void): void {
    this.on('notification', callback);
  }

  /**
   * Get socket instance (for advanced usage)
   */
  getSocket(): Socket | null {
    return this.socket;
  }
}

// Export singleton instance
export const socketService = new SocketService();