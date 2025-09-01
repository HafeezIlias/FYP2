# Firebase Services - Modular Structure

This directory contains Firebase services organized by functionality for better maintainability and debugging.

## File Structure

- **`firebaseConfig.ts`** - Firebase configuration and initialization
- **`utils.ts`** - Shared utility functions (timestamp parsing, distance calculation)
- **`firebaseHiker.ts`** - Hiker-related operations (fetch, listen, update SOS, update names)
- **`firebaseTower.ts`** - Tower-related operations (CRUD operations for towers)
- **`firebaseTrack.ts`** - Safety track operations (CRUD operations for hiking tracks)
- **`firebaseCommand.ts`** - Command and communication operations (BaseCommand, notifications, alerts)
- **`index.ts`** - Main export file with backward compatibility

## Usage

### Direct Service Import (Recommended for new code)
```typescript
import { firebaseHikerService } from './services/firebase/firebaseHiker';
import { firebaseTowerService } from './services/firebase/firebaseTower';

// Use specific service
const hikers = await firebaseHikerService.fetchHikers();
const towers = await firebaseTowerService.fetchTowers();
```

### Combined Service Import (For backward compatibility)
```typescript
import { firebaseService } from './services/firebase';

// Use combined service (same API as before)
const hikers = await firebaseService.fetchHikers();
const towers = await firebaseService.fetchTowers();
```

### Individual Service Classes
```typescript
import { 
  FirebaseHikerService, 
  FirebaseTowerService, 
  FirebaseTrackService,
  FirebaseCommandService 
} from './services/firebase';

// Create custom instances if needed
const customHikerService = new FirebaseHikerService();
```

## Benefits

1. **Better Organization** - Each entity has its own service file
2. **Easier Debugging** - Clear separation of concerns
3. **Improved Maintainability** - Smaller, focused files
4. **Better Testing** - Test individual services in isolation
5. **Backward Compatibility** - Existing code continues to work unchanged

## Services Overview

### FirebaseHikerService
- `fetchHikers()` - Get all hikers from Firebase
- `listenForHikerUpdates()` - Real-time hiker updates
- `updateHikerSosStatus()` - Update SOS status
- `updateHikerName()` - Update hiker name
- `updateNodeName()` - Legacy node name update

### FirebaseTowerService  
- `fetchTowers()` - Get all towers
- `listenForTowerUpdates()` - Real-time tower updates
- `addTower()` - Add new tower
- `updateTower()` - Update existing tower
- `deleteTower()` - Remove tower

### FirebaseTrackService
- `fetchSafetyTracks()` - Get all safety tracks
- `listenForSafetyTrackUpdates()` - Real-time track updates
- `addSafetyTrack()` - Add new safety track
- `updateSafetyTrack()` - Update existing track
- `deleteSafetyTrack()` - Remove safety track

### FirebaseCommandService
- `createBaseCommand()` - Create device commands
- `sendCommand()` - Send generic command
- `sendNotification()` - Send notification to device
- `sendEmergencyAlert()` - Send emergency alert