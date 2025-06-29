// Main components barrel export - centralizes all component imports
// Similar to Next.js routing system

// Map components
export { default as MapComponent } from './Map/Map.js';

// Sidebar components  
export { default as SidebarComponent } from './Sidebar/Sidebar.js';

// Modal components
export { default as HikerModal, default as ModalComponent } from './Modal/Hiker/HikerModal.js';
export { default as TowerModal, default as TowerModalComponent } from './Modal/Tower/TowerModal.js';

// Settings components
export { default as SettingsComponent } from './Settings/Settings.js';
export { default as SettingsMainComponent } from './Settings/SettingsComponent.js';
export { default as TrackSafetySettings } from './Settings/TrackSafetySettings.js';

// Tower components
export { default as TowerControls } from './Tower/TowerControls.js';
export { default as TowerManager } from './Tower/TowerManager.js'; 