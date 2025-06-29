# Centralized Import System

This project uses a Next.js-style centralized import system with barrel exports for cleaner and more maintainable code.

## Structure

```
src/
├── index.js              # Main entry point - exports everything
├── components/
│   ├── index.js          # All component exports
│   ├── Modal/
│   │   ├── index.js      # Modal component exports
│   │   ├── Hiker/
│   │   └── Tower/
│   ├── Map/
│   ├── Sidebar/
│   ├── Settings/
│   └── Tower/
├── utils/
│   └── index.js          # Utility function exports
├── modules/
│   └── index.js          # Module exports
└── models/
    └── index.js          # Model exports
```

## Usage Examples

### Before (Old Way)
```javascript
import { createSampleHikers, createSampleTowers } from './utils/helpers.js';
import { fetchHikersFromFirebase, listenForHikersUpdates } from './utils/firebase.js';
import MapComponent from './components/Map/Map.js';
import SidebarComponent from './components/Sidebar/Sidebar.js';
import ModalComponent from './components/Modal/Hiker/HikerModal.js';
import TowerModalComponent from './components/Modal/Tower/TowerModal.js';
```

### After (New Way)
```javascript
import { 
  createSampleHikers, 
  createSampleTowers,
  fetchHikersFromFirebase, 
  listenForHikersUpdates 
} from './utils/index.js';

import {
  MapComponent,
  SidebarComponent,
  ModalComponent,
  TowerModalComponent
} from './components/index.js';
```

### From Main Entry Point
```javascript
// Import everything from the main index
import {
  MapComponent,
  SidebarComponent,
  createSampleHikers,
  TrackSafetyModule,
  Hiker,
  Tower
} from './src/index.js';
```

## Benefits

1. **Cleaner Imports**: Group related imports together
2. **Better Organization**: Clear separation of concerns
3. **Easier Refactoring**: Change file locations without updating all imports
4. **Next.js Style**: Familiar pattern for React developers
5. **Legacy Compatibility**: Old import paths still work through aliases

## Adding New Components

When adding new components:

1. Create your component file
2. Add export to the appropriate `index.js`
3. Optionally add to main `src/index.js`

Example:
```javascript
// In components/NewFeature/index.js
export { default as NewComponent } from './NewComponent.js';

// In components/index.js
export * from './NewFeature/index.js';
``` 