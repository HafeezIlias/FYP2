# Hiker Tracking Dashboard

A real-time tracking dashboard for hikers that integrates with Firebase Realtime Database.

## Features

- Real-time tracking of hikers' locations
- Integration with Firebase Realtime Database
- SOS alerts and management
- Battery status monitoring
- Customizable map views
- Automatic hiker movement status detection
- Historical tracking data with timestamps
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

## Firebase Data Structure

The application uses Firebase Realtime Database with the following structure:

```
runners/
  nodeKey1/
    name: "Hiker Name"      // Hiker's display name (stored at node level)
    active: true/false      // Whether the hiker is currently active (stored at node level)
    logs/
      timestamp1/           // Timestamped logs with tracking data (newest first)
        latitude: 3.1456
        longitude: 101.7123
        battery: 95
        sos_status: false
        timestamp: 1234567890123
      timestamp2/
        ... (previous tracking update)
  nodeKey2/
    ... (similar structure)
```

### Data Organization:

- **Node Level**: Identity and status information (name, active status)
- **Logs**: Tracking and emergency data (coordinates, battery, SOS status)

## Hiker Status System

The application automatically determines a hiker's status based on their recent location history:

### Movement Status (Based on location data):

- **Moving**: Traveling at ≥ 5 meters per minute
- **Active**: Moving at 2-5 meters per minute
- **Resting**: Moving less than 2 meters per minute
- **Unknown**: Not enough location data to determine status

### Overall Status Priority:

1. If SOS is active → status = "SOS" (highest priority)
2. If hiker is marked inactive → status = "Inactive"
3. Otherwise → status = movement status (Moving, Active, Resting, or Unknown)

### How Movement Detection Works:

1. The system collects location updates from the past 10 minutes
2. Calculates distances between consecutive points using the Haversine formula
3. Computes the average speed in meters per minute
4. Determines status based on configurable speed thresholds

### Configurable Parameters:

Located in `src/utils/firebase.js`, in the `determineMovementStatus()` function:
- `MOVING_THRESHOLD`: Speed threshold for "Moving" status (default: 5 meters/minute)
- `ACTIVE_THRESHOLD`: Speed threshold for "Active" status (default: 2 meters/minute)
- `TIME_WINDOW`: How far back to look for movement data (default: 10 minutes)

## Development

To start the development server:

```
npm start
```

This will start a development server at http://localhost:8080 with hot reloading enabled.

When making changes to files, especially Firebase utilities, you may need to rebuild:

```
npm run build
```

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
- **Status Indicators**: Hiker cards display current status (Moving, Active, Resting, SOS, etc.)

## API Functions

### Firebase Utilities

```javascript
// Import the utilities
import { 
  fetchHikersFromFirebase,
  listenForHikersUpdates,
  updateHikerData,
  updateHikerSosStatus,
  updateHikerActiveStatus,
  updateNodeName
} from './utils/firebase';

// Get all hikers once
const hikers = await fetchHikersFromFirebase();

// Set up real-time updates
const unsubscribe = listenForHikersUpdates((updatedHikers) => {
  // Handle updated hikers data
  console.log(updatedHikers);
});

// Update a hiker's tracking data (stores in logs)
await updateHikerData('hikerId123', {
  latitude: 3.1456,
  longitude: 101.7123,
  battery: 95
});

// Update SOS status
await updateHikerSosStatus('hikerId123', true); // Activate SOS
await updateHikerSosStatus('hikerId123', false, true); // Mark SOS as handled
await updateHikerSosStatus('hikerId123', false, false, true); // Dispatch emergency
await updateHikerSosStatus('hikerId123', false, false, false, true); // Reset SOS

// Update active status
await updateHikerActiveStatus('hikerId123', false); // Mark inactive
await updateHikerActiveStatus('hikerId123', true);  // Mark active

// Update hiker name
await updateNodeName('hikerId123', 'New Hiker Name');

// Clean up listener when done
unsubscribe();
```

## License

[MIT](LICENSE) 