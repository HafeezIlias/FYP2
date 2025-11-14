import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// In-memory storage for hashed password (in production, use a database)
let hashedAdminPassword: string;

// Initialize admin password hash
const initializeAdminPassword = async () => {
  hashedAdminPassword = await bcrypt.hash(authConfig.admin.password, 10);
  console.log('Admin password initialized');
};

initializeAdminPassword();

/**
 * POST /api/auth/login
 * Authenticate admin user and return JWT token
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: 'Username and password are required.'
      });
      return;
    }

    // Check if username matches
    if (username !== authConfig.admin.username) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, hashedAdminPassword);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        username: username,
        isAdmin: true
      },
      authConfig.jwt.secret,
      {
        expiresIn: '24h'
      }
    );

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: authConfig.session.maxAge,
      sameSite: 'strict'
    });

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        username,
        isAdmin: true
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login.'
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user and clear token
 */
router.post('/logout', (req: Request, res: Response): void => {
  // Clear token cookie
  res.clearCookie('token');

  res.json({
    success: true,
    message: 'Logout successful.'
  });
});

/**
 * GET /api/auth/verify
 * Verify if current token is valid
 */
router.get('/verify', authenticateToken, (req: Request, res: Response): void => {
  res.json({
    success: true,
    user: req.user
  });
});

/**
 * POST /api/auth/change-password
 * Change admin password (requires authentication)
 */
router.post('/change-password', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: 'Current password and new password are required.'
      });
      return;
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, hashedAdminPassword);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Current password is incorrect.'
      });
      return;
    }

    // Hash new password
    hashedAdminPassword = await bcrypt.hash(newPassword, 10);

    res.json({
      success: true,
      message: 'Password changed successfully.'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while changing password.'
    });
  }
});

export default router;
