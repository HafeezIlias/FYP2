import React, { useEffect, useState } from 'react';
import { Mountain, Settings } from 'lucide-react';
import { MapView } from './components/dashboard/MapView';
import { HikerTracker } from './components/widgets/HikerTracker';
import { SOSAlert } from './components/widgets/SOSAlert';
import { Button } from './components/common/Button';
import { Modal } from './components/common/Modal';
import { Sidebar } from './components/common/Sidebar';
import { Settings as SettingsModal } from './components/dashboard/Settings';
import { firebaseService } from './services/firebase';
import { socketService } from './services/socket';
import { authService } from './services/auth';
import { simulationService } from './services/simulation';
import { safetyTrackService } from './services/safetyTracks';
import { Hiker, Tower, AppSettings } from './types';
import { Hiker as HikerModel } from './models/Hiker';
import './styles/globals.css';
import './App.css';

function App() {
  // State management
  const [hikers, setHikers] = useState<Hiker[]>([]);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unsafeHikers, setUnsafeHikers] = useState<{
    hiker: Hiker;
    distance: number;
  }[]>([]);
  
  // UI State
  const [selectedHiker, setSelectedHiker] = useState<Hiker | null>(null);
  const [trackingHikerId, setTrackingHikerId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // App Settings
  const [appSettings, setAppSettings] = useState<AppSettings>({
    map: {
      style: 'default',
      defaultZoom: 12,
      center: [3.139, 101.6869]
    },
    simulation: {
      enabled: false,
      speed: 3000,
      hikersCount: 10,
      autoSos: true
    },
    notifications: {
      sosAlerts: true,
      batteryAlerts: true,
      batteryThreshold: 20,
      trackDeviationAlerts: true,
      trackDeviationThreshold: 50
    },
    safety: {
      enabled: true,
      highlightUnsafeHikers: true,
      tracks: []
    }
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('trailBeaconSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setAppSettings(parsed);
        
        // Load safety tracks into the service
        if (parsed.safety?.tracks) {
          safetyTrackService.setTracks(parsed.safety.tracks);
        }
      } catch (error) {
        console.error('Error loading saved settings:', error);
      }
    } else {
      // Create a sample safety track for demonstration
      safetyTrackService.createSampleTrack();
      const sampleTracks = safetyTrackService.getTracks();
      setAppSettings(prev => ({
        ...prev,
        safety: {
          ...prev.safety,
          tracks: sampleTracks
        }
      }));
    }
  }, []);

  // Initialize towers data
  useEffect(() => {
    const sampleTowers: Tower[] = [
      {
        id: 'tower_001',
        name: 'Main Communication Tower',
        type: 'Tower',
        lat: 3.140,
        lon: 101.687,
        status: 'Active',
        coverageRadius: 5000,
        lastUpdate: Date.now(),
        signalStrength: 95
      },
      {
        id: 'tower_002', 
        name: 'Emergency Beacon Tower',
        type: 'Basecamp',
        lat: 3.138,
        lon: 101.686,
        status: 'Active',
        coverageRadius: 3000,
        lastUpdate: Date.now(),
        signalStrength: 87
      },
      {
        id: 'tower_003',
        name: 'Weather Monitoring Tower',
        type: 'Relay',
        lat: 3.142,
        lon: 101.688,
        status: 'Maintenance',
        coverageRadius: 2000,
        lastUpdate: Date.now(),
        signalStrength: 65
      }
    ];
    setTowers(sampleTowers);
  }, []);

  // Initialize simulation service callbacks
  useEffect(() => {
    // Set up simulation service callbacks
    (simulationService as any).onHikerUpdate = (updatedHikers: Hiker[]) => {
      setHikers(updatedHikers);
    };
    
    (simulationService as any).onSosAlert = (hiker: Hiker) => {
      console.log('Simulation SOS Alert:', hiker.name);
      // The hiker update will be handled by the main callback
    };
  }, []);

  // Handle simulation vs live data toggle
  useEffect(() => {
    if (appSettings.simulation.enabled) {
      console.log('Starting simulation mode');
      simulationService.start(appSettings.simulation);
      // Stop Firebase/Socket connections when using simulation
      socketService.disconnect();
    } else {
      console.log('Stopping simulation mode, starting live data');
      simulationService.stop();
      // Restart live data connections
      initializeLiveData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appSettings.simulation.enabled, appSettings.simulation.speed, appSettings.simulation.hikersCount, appSettings.simulation.autoSos]);

  // Initialize live data connections
  const initializeLiveData = async () => {
    if (appSettings.simulation.enabled) return;
    
    try {
      setLoading(true);
      
      // First, authenticate with Firebase
      console.log('Authenticating with Firebase...');
      await authService.signInAnonymously();
      console.log('Firebase authentication successful');
      
      // Initialize socket connection
      await socketService.connect();
      
      // Set up Firebase real-time listener
      const unsubscribe = firebaseService.listenForHikerUpdates((updatedHikers) => {
        if (!appSettings.simulation.enabled) { // Only update if not in simulation mode
          console.log('Received hiker updates:', updatedHikers);
          setHikers(updatedHikers as Hiker[]);
        }
      });
      
      // Set up socket listeners
      socketService.onHikerUpdates((socketHikers) => {
        if (!appSettings.simulation.enabled) { // Only update if not in simulation mode
          console.log('Received socket hiker updates:', socketHikers);
          setHikers(socketHikers);
        }
      });
      
      socketService.onSosAlert(({ hikerId, status }) => {
        if (!appSettings.simulation.enabled) { // Only update if not in simulation mode
          console.log('SOS Alert received:', { hikerId, status });
          setHikers(prev => prev.map(h => 
            h.id === hikerId ? { ...h, sos: status } : h
          ));
        }
      });
      
      // Initial data fetch as fallback
      const initialHikers = await firebaseService.fetchHikers();
      if (initialHikers.length > 0 && !appSettings.simulation.enabled) {
        setHikers(initialHikers as Hiker[]);
      }
      
      setLoading(false);
      
      // Return cleanup function
      return () => {
        unsubscribe();
        socketService.disconnect();
      };
    } catch (err) {
      console.error('Error initializing live data:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize live data');
      setLoading(false);
    }
  };

  // Monitor hikers for safety violations
  useEffect(() => {
    if (appSettings.safety.enabled && hikers.length > 0) {
      const unsafe = safetyTrackService.getUnsafeHikers(
        hikers, 
        appSettings.notifications.trackDeviationThreshold
      );
      setUnsafeHikers(unsafe);
    } else {
      setUnsafeHikers([]);
    }
  }, [hikers, appSettings.safety.enabled, appSettings.notifications.trackDeviationThreshold]);

  // Initialize app
  useEffect(() => {
    initializeLiveData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle hiker click
  const handleHikerClick = (hiker: Hiker) => {
    setSelectedHiker(hiker);
    setTrackingHikerId(hiker.id);
  };

  // Handle tower click
  const handleTowerClick = (tower: Tower) => {
    console.log('Tower clicked:', tower);
    // Focus map on tower location
    // TODO: Implement tower detail modal
  };

  // Handle settings change
  const handleSettingsChange = (newSettings: AppSettings) => {
    setAppSettings(newSettings);
    
    // Update safety tracks service
    if (newSettings.safety?.tracks) {
      safetyTrackService.setTracks(newSettings.safety.tracks);
    }
    
    localStorage.setItem('trailBeaconSettings', JSON.stringify(newSettings));
  };

  // Handle SOS actions
  const handleSosAction = async (hikerId: string, action: 'handle' | 'reset') => {
    try {
      const hiker = hikers.find(h => h.id === hikerId);
      if (!hiker) return;

      if (appSettings.simulation.enabled) {
        // Handle SOS in simulation mode
        if (action === 'handle') {
          simulationService.handleSos(hikerId, true);
        } else if (action === 'reset') {
          simulationService.resetSos(hikerId);
        }
        
        // Update local state immediately for simulation
        setHikers(prev => prev.map(h => {
          if (h.id === hikerId) {
            if (action === 'handle') {
              return { ...h, sosHandled: true, sosEmergencyDispatched: true };
            } else {
              return { ...h, sos: false, sosHandled: false, sosEmergencyDispatched: false, status: 'Active' as const };
            }
          }
          return h;
        }));
      } else {
        // Handle SOS in live data mode
        const hikerModel = HikerModel.fromJSON(hiker);
        
        if (action === 'handle') {
          if (hikerModel.handleSos()) {
            await firebaseService.updateHikerSosStatus(hikerId, true, true);
            await firebaseService.createBaseCommand(hikerId, 'BASECAMP_01', 'Help is on the way!');
          }
        } else if (action === 'reset') {
          if (hikerModel.resetSosStatus()) {
            await firebaseService.updateHikerSosStatus(hikerId, false, false, false, true);
            await firebaseService.createBaseCommand(hikerId, 'BASECAMP_01', 'SOS cleared');
          }
        }
        
        // Update local state
        setHikers(prev => prev.map(h => 
          h.id === hikerId ? hikerModel.toJSON() as Hiker : h
        ));
      }
    } catch (error) {
      console.error('Error handling SOS action:', error);
    }
  };

  // Get SOS hikers
  const sosHikers = hikers.filter(hiker => hiker.sos && !hiker.sosHandled);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading TrailBeacon Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>Error Loading Dashboard</h2>
        <p>{error}</p>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="app-header__title">
          <Mountain size={24} />
          <h1>TrailBeacon Dashboard</h1>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings size={16} />
          Settings
        </Button>
      </header>

      {/* Main Layout */}
      <div className="app-layout">
        {/* Sidebar */}
        <Sidebar
          hikers={hikers}
          towers={towers}
          onHikerClick={handleHikerClick}
          onTowerClick={handleTowerClick}
        />

        {/* Main Content */}
        <main className="app-main">
          {/* SOS Alerts */}
          {sosHikers.length > 0 && (
            <div className="app-sos-alerts">
              {sosHikers.map(hiker => (
                <SOSAlert
                  key={hiker.id}
                  hiker={hiker}
                  onHandle={() => handleSosAction(hiker.id, 'handle')}
                  onViewLocation={() => handleHikerClick(hiker)}
                />
              ))}
            </div>
          )}

          {/* Map */}
          <div className="app-map">
            <MapView
              hikers={hikers}
              towers={towers}
              center={appSettings.map.center}
              zoom={appSettings.map.defaultZoom}
              style={appSettings.map.style}
              onHikerClick={handleHikerClick}
              onTowerClick={handleTowerClick}
              trackingHikerId={trackingHikerId}
              safetyTracks={appSettings.safety.tracks}
              showSafetyTracks={appSettings.safety.enabled}
              highlightUnsafeHikers={appSettings.safety.highlightUnsafeHikers}
              unsafeHikerIds={unsafeHikers.map(u => u.hiker.id)}
            />
          </div>
        </main>
      </div>

      {/* Hiker Detail Modal */}
      <Modal
        isOpen={selectedHiker !== null}
        onClose={() => setSelectedHiker(null)}
        title={selectedHiker?.name}
        size="md"
      >
        {selectedHiker && (
          <HikerTracker
            hiker={selectedHiker}
            onTrack={() => setTrackingHikerId(selectedHiker.id)}
            onMessage={() => console.log('Message hiker:', selectedHiker.id)}
            onSosHandle={() => handleSosAction(selectedHiker.id, 'handle')}
            onSosReset={() => handleSosAction(selectedHiker.id, 'reset')}
          />
        )}
      </Modal>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={appSettings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}

export default App;
