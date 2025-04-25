# Hiker Tracking Dashboard

A real-time tracking dashboard for hikers that integrates with Firebase Realtime Database.

## Features

- Real-time tracking of hikers' locations
- Integration with Firebase Realtime Database
- SOS alerts and management
- Battery status monitoring
- Customizable map views
- Fallback to simulated data when Firebase is unavailable

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd hiker-tracking-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

The application is configured to connect to Firebase Realtime Database. The Firebase configuration is in `src/utils/firebase.js`.

The database should have the following structure:
```
runners/
  NODE_XX/
    latitude: number
    longitude: number
    battery: number
    sos_status: boolean
    timestamp: number
```

## Development

To start the development server:

```
npm start
```

This will start a development server at http://localhost:8080 with hot reloading enabled.

## Building for Production

To build the application for production:

```
npm run build
```

This will create a bundled version in the `dist` directory.

## Usage

- **Map Controls**: Use the map controls to center the map or toggle visibility of all hikers.
- **Settings**: Click the gear icon to access settings.
- **Hiker Details**: Click on a hiker marker or list item to view detailed information.
- **SOS Management**: Respond to SOS alerts by marking them as handled or dispatching emergency services.
- **Data Source Toggle**: Switch between Firebase real-time data and simulated data in the settings.

## License

[MIT](LICENSE) 