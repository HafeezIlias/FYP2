# Admin Authentication Setup

This document describes the admin authentication system implemented for the TrailBeacon Dashboard.

## Features

- **Admin Login Page**: Beautiful, responsive login interface
- **JWT-based Authentication**: Secure token-based authentication
- **Protected Routes**: Dashboard is accessible only after authentication
- **Session Management**: Persistent login sessions with automatic token verification
- **Logout Functionality**: Secure logout with token cleanup

## Default Credentials

```
Username: admin
Password: admin123
```

**⚠️ IMPORTANT**: Change these credentials in production by updating the `.env` file!

## Architecture

### Backend (Express.js)

1. **Authentication Routes** (`/api/auth`)
   - `POST /api/auth/login` - Login with username/password
   - `POST /api/auth/logout` - Logout and clear session
   - `GET /api/auth/verify` - Verify JWT token
   - `POST /api/auth/change-password` - Change admin password

2. **Middleware**
   - `authenticateToken`: Verifies JWT token from Authorization header or cookie
   - `requireAdmin`: Ensures user has admin privileges

3. **Configuration** (`backend/src/config/auth.config.ts`)
   - Admin credentials (from environment variables)
   - JWT secret and expiration
   - Session configuration

### Frontend (React)

1. **Pages**
   - `/login` - Login page (public)
   - `/dashboard` - Main dashboard (protected)
   - `/track/:token` - Public hiker tracking (public)

2. **Components**
   - `Login` - Login form component
   - `ProtectedRoute` - Higher-order component for protected routes

3. **Context**
   - `AuthContext` - Global authentication state management
   - `useAuth` hook - Access authentication state and methods

4. **Services**
   - `adminAuthService` - Handles API calls for authentication

## Setup Instructions

### 1. Backend Setup

```bash
cd backend

# Install dependencies (already done)
npm install

# Copy and configure .env file
cp .env.example .env

# Edit .env and change these values in production:
# - ADMIN_USERNAME
# - ADMIN_PASSWORD
# - JWT_SECRET
# - SESSION_SECRET

# Start the backend server
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Ensure .env file exists with correct API URL
# The file should contain:
# REACT_APP_API_URL=http://localhost:5000

# Start the frontend
npm start
```

### 3. Access the Application

1. Open your browser and navigate to `http://localhost:3000`
2. You'll be automatically redirected to `/login`
3. Enter the default credentials:
   - Username: `admin`
   - Password: `admin123`
4. Click "Login"
5. Upon successful authentication, you'll be redirected to the dashboard

## Security Notes

### For Production Deployment

1. **Change Default Credentials**
   - Update `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`
   - Use strong passwords

2. **Generate Secure Secrets**
   ```bash
   # Generate random secrets for JWT and session
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   - Use output for `JWT_SECRET` and `SESSION_SECRET`

3. **Enable HTTPS**
   - The session cookies are set to `secure: true` in production
   - Ensure your production server uses HTTPS

4. **Environment Variables**
   - Never commit `.env` files to version control
   - Use secure environment variable management in production (e.g., AWS Secrets Manager, Azure Key Vault)

5. **Consider Database Storage**
   - Current implementation stores admin credentials in memory
   - For production, consider using a database with properly hashed passwords
   - Implement multiple admin users with role-based access control

## API Endpoints

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGc...",
  "user": {
    "username": "admin",
    "isAdmin": true
  }
}
```

### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "username": "admin",
    "isAdmin": true
  }
}
```

### Logout
```http
POST /api/auth/logout

Response:
{
  "success": true,
  "message": "Logout successful."
}
```

### Change Password
```http
POST /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "admin123",
  "newPassword": "newSecurePassword123"
}

Response:
{
  "success": true,
  "message": "Password changed successfully."
}
```

## File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── auth.config.ts        # Authentication configuration
│   ├── middleware/
│   │   └── auth.middleware.ts    # JWT verification middleware
│   ├── routes/
│   │   └── auth.routes.ts        # Authentication routes
│   └── index.ts                  # Main server file
├── .env                          # Environment variables
└── .env.example                  # Example environment variables

frontend/
├── src/
│   ├── components/
│   │   └── auth/
│   │       ├── Login/            # Login component
│   │       │   ├── Login.tsx
│   │       │   ├── Login.css
│   │       │   └── index.ts
│   │       └── ProtectedRoute/   # Protected route wrapper
│   │           ├── ProtectedRoute.tsx
│   │           └── index.ts
│   ├── contexts/
│   │   └── AuthContext.tsx       # Authentication context
│   ├── pages/
│   │   ├── Dashboard.tsx         # Main dashboard (moved from App.tsx)
│   │   └── LoginPage.tsx         # Login page wrapper
│   ├── services/
│   │   └── adminAuth.ts          # Authentication service
│   └── index.tsx                 # App entry with routing
└── .env                          # Frontend environment variables
```

## Testing

### Test Login Flow

1. **Access Protected Route Without Login**
   - Navigate to `http://localhost:3000/dashboard`
   - Should redirect to `/login`

2. **Login with Valid Credentials**
   - Enter username: `admin`
   - Enter password: `admin123`
   - Should redirect to `/dashboard`

3. **Login with Invalid Credentials**
   - Enter wrong username or password
   - Should show error message

4. **Logout**
   - Click "Logout" button in dashboard header
   - Should redirect to `/login`
   - Attempting to access `/dashboard` should redirect back to login

5. **Token Persistence**
   - Login successfully
   - Refresh the page
   - Should remain logged in

## Troubleshooting

### Cannot connect to backend
- Ensure backend is running on `http://localhost:5000`
- Check `REACT_APP_API_URL` in `frontend/.env`
- Check CORS settings in backend

### Token not persisting
- Check browser localStorage for `adminToken`
- Ensure cookies are enabled
- Check browser console for errors

### Login not working
- Check backend logs for errors
- Verify `.env` file is loaded
- Check network tab in browser developer tools

## Future Enhancements

1. **Multi-user Support**: Add database storage for multiple admin accounts
2. **Role-based Access Control**: Implement different permission levels
3. **Two-factor Authentication**: Add 2FA for enhanced security
4. **Password Reset**: Implement forgot password functionality
5. **Audit Logging**: Track login attempts and admin actions
6. **Rate Limiting**: Prevent brute force attacks
7. **Refresh Tokens**: Implement refresh token mechanism

## Support

For issues or questions, please refer to the main project documentation or contact the development team.
