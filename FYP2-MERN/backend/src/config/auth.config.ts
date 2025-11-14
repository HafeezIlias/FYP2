import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  // Admin credentials (in production, this should be stored securely in a database)
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123', // This will be hashed
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
    expiresIn: (process.env.JWT_EXPIRES_IN || '24h') as string | number,
  },

  // Session configuration
  session: {
    secret: process.env.SESSION_SECRET || 'your-super-secret-session-key-change-this-in-production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
};
