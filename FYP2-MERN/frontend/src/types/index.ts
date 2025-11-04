// Core data types
export interface Hiker {
  id: string;
  name: string;
  lat: number;
  lon: number;
  status: 'Active' | 'Resting' | 'Moving' | 'SOS' | 'Inactive';
  battery: number;
  lastUpdate: number;
  sos: boolean;
  sosHandled: boolean;
  sosHandledTime?: number;
  sosEmergencyDispatched: boolean;
  sosEmergencyTime?: number;
  sosNotified: boolean;
  batteryNotified: boolean;
  // Methods
  getSosStatusText?: () => string;
}

export interface Tower {
  id: string;
  name: string;
  type: 'Tower' | 'Basecamp' | 'Relay';
  lat: number;
  lon: number;
  status: 'Active' | 'Inactive' | 'Maintenance';
  coverageRadius: number;
  lastUpdate: number;
  signalStrength: number;
}

export interface TrackPoint {
  lat: number;
  lon: number;
  timestamp: number;
  altitude?: number; // Optional: For future elevation tracking (meters)
}

export interface SafetyTrack {
  id: string;
  name: string;
  points: TrackPoint[];
  width: number;
  color: string;
  enabled: boolean;
}

// UI Component Props
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

// Settings types
export interface MapSettings {
  style: 'default' | 'satellite' | 'terrain' | 'dark';
  defaultZoom: number;
  center: [number, number];
}

export interface SimulationSettings {
  enabled: boolean;
  speed: number;
  hikersCount: number;
  autoSos: boolean;
}

export interface NotificationSettings {
  sosAlerts: boolean;
  batteryAlerts: boolean;
  batteryThreshold: number;
  trackDeviationAlerts: boolean;
  trackDeviationThreshold: number;
}

export interface SafetySettings {
  enabled: boolean;
  highlightUnsafeHikers: boolean;
  tracks: SafetyTrack[];
}

export interface AppSettings {
  map: MapSettings;
  simulation: SimulationSettings;
  notifications: NotificationSettings;
  safety: SafetySettings;
}

// Redux state types
export interface HikerState {
  hikers: Hiker[];
  selectedHiker: Hiker | null;
  loading: boolean;
  error: string | null;
}

export interface TowerState {
  towers: Tower[];
  selectedTower: Tower | null;
  loading: boolean;
  error: string | null;
}

export interface UIState {
  sidebarOpen: boolean;
  activeTab: 'hikers' | 'towers';
  modalOpen: boolean;
  settingsOpen: boolean;
}

export interface RootState {
  hikers: HikerState;
  towers: TowerState;
  ui: UIState;
  settings: AppSettings;
}

// Socket.IO event types
export interface SocketEvents {
  'hikers:update': Hiker[];
  'hiker:sos': { hikerId: string; status: boolean };
  'hiker:update': { hikerId: string; lat: number; lon: number; battery: number; timestamp: number };
  'tower:status': { towerId: string; status: string };
  'notification': { type: string; message: string };
}