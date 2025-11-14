/**
 * Admin Authentication Service
 * Handles admin login, logout, and token verification
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    username: string;
    isAdmin: boolean;
  };
}

export interface VerifyResponse {
  success: boolean;
  user?: {
    username: string;
    isAdmin: boolean;
  };
}

class AdminAuthService {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('adminToken');
  }

  /**
   * Login with username and password
   */
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data: LoginResponse = await response.json();

      if (data.success && data.token) {
        this.token = data.token;
        localStorage.setItem('adminToken', data.token);
        console.log('Admin login successful');
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Failed to connect to server. Please try again.',
      };
    }
  }

  /**
   * Logout and clear token
   */
  async logout(): Promise<void> {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('adminToken');
      console.log('Admin logout successful');
    }
  }

  /**
   * Verify if current token is valid
   */
  async verifyToken(): Promise<boolean> {
    if (!this.token) {
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        credentials: 'include',
      });

      const data: VerifyResponse = await response.json();

      if (!data.success) {
        this.token = null;
        localStorage.removeItem('adminToken');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      this.token = null;
      localStorage.removeItem('adminToken');
      return false;
    }
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.token;
  }

  /**
   * Change admin password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: 'Failed to connect to server. Please try again.',
      };
    }
  }
}

export const adminAuthService = new AdminAuthService();
