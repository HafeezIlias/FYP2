/**
 * Firebase Authentication Service
 */
import { getAuth, signInAnonymously, Auth, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Firebase configuration (same as firebase.ts)
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

// Initialize Firebase Auth
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export class AuthService {
  private auth: Auth = auth;
  private currentUser: User | null = null;

  /**
   * Sign in anonymously (for development/demo purposes)
   */
  async signInAnonymously(): Promise<User> {
    try {
      console.log('Attempting anonymous sign in...');
      const result = await signInAnonymously(this.auth);
      this.currentUser = result.user;
      console.log('Anonymous sign in successful:', this.currentUser.uid);
      return this.currentUser;
    } catch (error) {
      console.error('Error signing in anonymously:', error);
      throw error;
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser || this.currentUser;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  /**
   * Wait for auth state to be ready
   */
  waitForAuth(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = this.auth.onAuthStateChanged((user) => {
        unsubscribe();
        this.currentUser = user;
        resolve(user);
      });
    });
  }

  /**
   * Sign out
   */
  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
      this.currentUser = null;
      console.log('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();