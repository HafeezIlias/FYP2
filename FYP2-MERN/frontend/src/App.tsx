import React, { useEffect, useState } from 'react';
import { Mountain, Settings, Radio, Route, Plane } from 'lucide-react';
import { MapView } from './components/dashboard/MapView';
import { HikerTracker } from './components/widgets/HikerTracker';
import { SOSAlert } from './components/widgets/SOSAlert';
import { Button } from './components/common/Button';
import { Modal } from './components/common/Modal';
import { Sidebar } from './components/common/Sidebar';
import { Settings as SettingsModal } from './components/dashboard/Settings';
import { TowerManager } from './components/dashboard/TowerManager/TowerManager';
import { TrackManager } from './components/dashboard/TrackManager/TrackManager';
import { ShareLinkModal } from './components/dashboard/ShareLinkModal/ShareLinkModal';
import { firebaseService } from './services/firebase';
import { socketService } from './services/socket';
import { authService } from './services/auth';
import { simulationService } from './services/simulation';
import { safetyTrackService } from './services/safetyTracks';
import { hikerHistoryService } from './services/hikerHistory';
import { Hiker, Tower, AppSettings, SafetyTrack } from './types';
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
  const [showTrackHistory, setShowTrackHistory] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [towerManagerOpen, setTowerManagerOpen] = useState(false);
  const [trackManagerOpen, setTrackManagerOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [hikerToShare, setHikerToShare] = useState<Hiker | null>(null);
  
  // Location state
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  
  // Local SOS handling state - persists handled SOS alerts to prevent re-showing
  const [handledSosAlerts, setHandledSosAlerts] = useState<Set<string>>(new Set());

  // App Settings
  const [appSettings, setAppSettings] = useState<AppSettings>({
    map: {
      style: 'default',
      defaultZoom: 13,
      center: [3.2084, 101.7333] // Fallback center
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

  // Get user's current location
  useEffect(() => {
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        console.warn('Geolocation is not supported by this browser');
        return;
      }

      console.log('Requesting user location...');
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation: [number, number] = [latitude, longitude];
          
          console.log('User location detected:', { latitude, longitude });
          setUserLocation(newLocation);
          
          // Update app settings with user's location
          setAppSettings(prev => ({
            ...prev,
            map: {
              ...prev.map,
              center: newLocation
            }
          }));
        },
        (error) => {
          console.warn('Error getting user location:', error.message);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.warn('User denied the request for Geolocation');
              break;
            case error.POSITION_UNAVAILABLE:
              console.warn('Location information is unavailable');
              break;
            case error.TIMEOUT:
              console.warn('The request to get user location timed out');
              break;
          }
          // Fallback location will be used from initial state
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    };

    getCurrentLocation();
  }, []);

  // Load handled SOS alerts from localStorage
  useEffect(() => {
    const savedHandledSos = localStorage.getItem('trailBeaconHandledSos');
    if (savedHandledSos) {
      try {
        const handledArray = JSON.parse(savedHandledSos);
        setHandledSosAlerts(new Set(handledArray));
        console.log('Loaded handled SOS alerts from localStorage:', handledArray);
      } catch (error) {
        console.error('Error loading handled SOS alerts:', error);
      }
    }
  }, []);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('trailBeaconSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        
        // If user location is available, use it instead of saved center
        if (userLocation) {
          parsed.map.center = userLocation;
        }
        
        setAppSettings(parsed);
        
        // Load safety tracks from Firebase if not in simulation mode
        if (!parsed.simulation?.enabled) {
          initializeTracksData();
        } else if (parsed.safety?.tracks) {
          safetyTrackService.setTracks(parsed.safety.tracks);
        }
      } catch (error) {
        console.error('Error loading saved settings:', error);
      }
    } else {
      // Initialize with empty tracks - users can create their own
      setAppSettings(prev => ({
        ...prev,
        safety: {
          ...prev.safety,
          tracks: []
        },
        map: {
          ...prev.map,
          center: userLocation || prev.map.center
        }
      }));
    }
  }, [userLocation]);

  // Initialize towers data from Firebase (only when not in simulation mode)
  useEffect(() => {
    if (!appSettings.simulation.enabled) {
      initializeTowersData();
    }
  }, [appSettings.simulation.enabled]);

  // Initialize towers data from Firebase
  const initializeTowersData = async () => {
    try {
      console.log('Loading towers from Firebase...');
      
      // Set up Firebase real-time listener for towers
      const unsubscribeTowers = firebaseService.listenForTowerUpdates((updatedTowers: Tower[]) => {
        console.log('Received tower updates:', updatedTowers);
        setTowers(updatedTowers);
      });
      
      // Initial fetch as fallback
      const initialTowers = await firebaseService.fetchTowers();
      if (initialTowers.length > 0) {
        setTowers(initialTowers);
      }
      
      console.log('Towers loaded from Firebase:', initialTowers.length);
      
      // Cleanup function would be returned if needed
      return () => {
        unsubscribeTowers();
      };
    } catch (error) {
      console.error('Error initializing towers data:', error);
    }
  };

  // Initialize simulation service callbacks
  useEffect(() => {
    // Set up simulation service callbacks
    simulationService.onHikerUpdate = (updatedHikers: Hiker[]) => {
      console.log('Simulation hikers updated:', updatedHikers.length);
      setHikers(updatedHikers);
    };
    
    simulationService.onSosAlert = (hiker: Hiker) => {
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
      
      // Add sample towers for simulation mode
      const simulationTowers: Tower[] = [
        {
          id: 'sim_tower_001',
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
          id: 'sim_tower_002', 
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
          id: 'sim_tower_003',
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
      setTowers(simulationTowers);
    } else {
      console.log('Stopping simulation mode, starting live data');
      simulationService.stop();
      // Clear simulation towers and load from Firebase
      setTowers([]);
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
      const unsubscribe = firebaseService.listenForHikerUpdates((updatedHikers: Hiker[]) => {
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

  // Track hiker movements for history
  useEffect(() => {
    hikers.forEach(hiker => {
      hikerHistoryService.addTrackPoint(hiker.id, hiker.name, hiker.lat, hiker.lon, hiker.lastUpdate);
    });
  }, [hikers]);

  // Clean up handled SOS alerts for hikers that are no longer in SOS
  useEffect(() => {
    const currentSosHikerIds = new Set(hikers.filter(h => h.sos).map(h => h.id));
    const handledToRemove: string[] = [];
    
    handledSosAlerts.forEach(hikerId => {
      if (!currentSosHikerIds.has(hikerId)) {
        handledToRemove.push(hikerId);
      }
    });
    
    if (handledToRemove.length > 0) {
      const newHandledSet = new Set(handledSosAlerts);
      handledToRemove.forEach(hikerId => {
        newHandledSet.delete(hikerId);
        console.log(`[SOS TRACKING] Cleaned up handled alert for ${hikerId} (no longer in SOS)`);
      });
      
      setHandledSosAlerts(newHandledSet);
      saveHandledSosAlerts(newHandledSet);
    }
  }, [hikers, handledSosAlerts]);

  // Initialize app
  useEffect(() => {
    initializeLiveData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Record hiker track history
  useEffect(() => {
    if (hikers.length > 0) {
      hikers.forEach(hiker => {
        // Only add track points for active hikers with valid coordinates
        if (hiker.lat !== 0 && hiker.lon !== 0) {
          hikerHistoryService.addTrackPoint(
            hiker.id,
            hiker.name,
            hiker.lat,
            hiker.lon,
            hiker.lastUpdate
          );
        }
      });
    }
  }, [hikers]);

  // Handle hiker click - opens modal and centers map (one-time, no tracking)
  const handleHikerClick = (hiker: Hiker) => {
    setSelectedHiker(hiker);
    // Don't set trackingHikerId - only the Track button should enable tracking
  };

  // Handle tower click
  const handleTowerClick = (tower: Tower) => {
    console.log('Tower clicked:', tower);
    // Focus map on tower location
    // TODO: Implement tower detail modal
  };

  // Save handled SOS alerts to localStorage
  const saveHandledSosAlerts = (handledSet: Set<string>) => {
    const handledArray = Array.from(handledSet);
    localStorage.setItem('trailBeaconHandledSos', JSON.stringify(handledArray));
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

      if (action === 'handle') {
        // Add to handled SOS alerts set
        const newHandledSet = new Set(handledSosAlerts);
        newHandledSet.add(hikerId);
        setHandledSosAlerts(newHandledSet);
        saveHandledSosAlerts(newHandledSet);
        
        console.log(`[SOS TRACKING] Added ${hikerId} to handled SOS alerts`);
      } else if (action === 'reset') {
        // Remove from handled SOS alerts set
        const newHandledSet = new Set(handledSosAlerts);
        newHandledSet.delete(hikerId);
        setHandledSosAlerts(newHandledSet);
        saveHandledSosAlerts(newHandledSet);
        
        console.log(`[SOS TRACKING] Removed ${hikerId} from handled SOS alerts`);
      }

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
              return { 
                ...h, 
                sosHandled: true, 
                sosEmergencyDispatched: true,
                sosHandledTime: Date.now()
              };
            } else {
              return { 
                ...h, 
                sos: false, 
                sosHandled: false, 
                sosEmergencyDispatched: false, 
                sosHandledTime: undefined,
                status: 'Active' as const 
              };
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

  // Handle track history toggle
  const handleToggleTrackHistory = (hikerId: string) => {
    setShowTrackHistory(showTrackHistory === hikerId ? null : hikerId);
  };

  // Handle share link
  const handleShareHiker = (hiker: Hiker) => {
    setHikerToShare(hiker);
    setShareModalOpen(true);
    setSelectedHiker(null); // Close the hiker detail modal
  };

  // Handle hiker name change
  const handleHikerNameChange = async (hikerId: string, newName: string) => {
    try {
      // Update in simulation or live data
      if (appSettings.simulation.enabled) {
        // Update simulation hiker name
        const success = simulationService.updateHikerName(hikerId, newName);
        if (success) {
          const updatedHikers = hikers.map(h => 
            h.id === hikerId ? { ...h, name: newName } : h
          );
          setHikers(updatedHikers);
          
          // Update selected hiker if it's the one being edited
          if (selectedHiker && selectedHiker.id === hikerId) {
            setSelectedHiker({ ...selectedHiker, name: newName });
          }
          
          console.log(`Updated simulation hiker ${hikerId} name to: ${newName}`);
        }
      } else {
        // For live data, update via Firebase
        await firebaseService.updateHikerName(hikerId, newName);
        console.log(`Updated hiker ${hikerId} name to: ${newName} in Firebase`);
        
        // Update local state immediately for better UX
        const updatedHikers = hikers.map(h => 
          h.id === hikerId ? { ...h, name: newName } : h
        );
        setHikers(updatedHikers);
        
        if (selectedHiker && selectedHiker.id === hikerId) {
          setSelectedHiker({ ...selectedHiker, name: newName });
        }
      }
    } catch (error) {
      console.error('Error updating hiker name:', error);
    }
  };

  // Initialize tracks data from Firebase
  const initializeTracksData = async () => {
    try {
      console.log('Loading safety tracks from Firebase...');
      
      // Set up Firebase real-time listener for tracks
      const unsubscribeTracks = firebaseService.listenForSafetyTrackUpdates((updatedTracks: SafetyTrack[]) => {
        console.log('Received safety track updates:', updatedTracks);
        // Update the safety track service
        safetyTrackService.setTracks(updatedTracks);
        // Update app settings
        setAppSettings(prev => ({
          ...prev,
          safety: {
            ...prev.safety,
            tracks: updatedTracks
          }
        }));
      });
      
      // Initial fetch as fallback
      const initialTracks = await firebaseService.fetchSafetyTracks();
      if (initialTracks.length > 0) {
        safetyTrackService.setTracks(initialTracks);
        setAppSettings(prev => ({
          ...prev,
          safety: {
            ...prev.safety,
            tracks: initialTracks
          }
        }));
      }
      
      console.log('Safety tracks loaded from Firebase:', initialTracks.length);
      
      // Cleanup function would be returned if needed
      return () => {
        unsubscribeTracks();
      };
    } catch (error) {
      console.error('Error initializing tracks data:', error);
    }
  };

  // Handle track management
  const handleAddTrack = async (trackData: Omit<SafetyTrack, 'id'>) => {
    try {
      if (appSettings.simulation.enabled) {
        // In simulation mode, just update local state
        const newTrack = safetyTrackService.addTrack(trackData);
        updateAppSettingsWithTracks();
        console.log('Added new track (simulation):', newTrack);
      } else {
        // In live mode, save to Firebase
        const trackId = await firebaseService.addSafetyTrack(trackData);
        console.log('Added new track to Firebase:', trackId);
        // Real-time listener will update the state automatically
      }
    } catch (error) {
      console.error('Error adding track:', error);
    }
  };

  const handleEditTrack = async (trackId: string, updates: Partial<SafetyTrack>) => {
    try {
      if (appSettings.simulation.enabled) {
        // In simulation mode, just update local state
        safetyTrackService.updateTrack(trackId, updates);
        updateAppSettingsWithTracks();
        console.log(`Updated track (simulation) ${trackId}:`, updates);
      } else {
        // In live mode, save to Firebase
        await firebaseService.updateSafetyTrack(trackId, updates);
        console.log(`Updated track in Firebase ${trackId}:`, updates);
        // Real-time listener will update the state automatically
      }
    } catch (error) {
      console.error('Error updating track:', error);
    }
  };

  const handleDeleteTrack = async (trackId: string) => {
    try {
      if (appSettings.simulation.enabled) {
        // In simulation mode, just update local state
        safetyTrackService.removeTrack(trackId);
        updateAppSettingsWithTracks();
        console.log(`Deleted track (simulation) ${trackId}`);
      } else {
        // In live mode, delete from Firebase
        await firebaseService.deleteSafetyTrack(trackId);
        console.log(`Deleted track from Firebase ${trackId}`);
        // Real-time listener will update the state automatically
      }
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };

  const updateAppSettingsWithTracks = () => {
    const currentTracks = safetyTrackService.getTracks();
    setAppSettings(prev => ({
      ...prev,
      safety: {
        ...prev.safety,
        tracks: currentTracks
      }
    }));
  };

  // Handle tower management
  const handleAddTower = async (towerData: Omit<Tower, 'id'>) => {
    try {
      if (appSettings.simulation.enabled) {
        // In simulation mode, just update local state
        const newTower: Tower = {
          ...towerData,
          id: `tower_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
        
        setTowers(prev => [...prev, newTower]);
        console.log('Added new tower (simulation):', newTower);
      } else {
        // In live mode, save to Firebase
        const towerId = await firebaseService.addTower(towerData);
        console.log('Added new tower to Firebase:', towerId);
        // Real-time listener will update the state automatically
      }
    } catch (error) {
      console.error('Error adding tower:', error);
    }
  };

  const handleEditTower = async (towerId: string, updates: Partial<Tower>) => {
    try {
      if (appSettings.simulation.enabled) {
        // In simulation mode, just update local state
        setTowers(prev => prev.map(tower => 
          tower.id === towerId 
            ? { ...tower, ...updates, lastUpdate: Date.now() }
            : tower
        ));
        console.log(`Updated tower (simulation) ${towerId}:`, updates);
      } else {
        // In live mode, save to Firebase
        await firebaseService.updateTower(towerId, updates);
        console.log(`Updated tower in Firebase ${towerId}:`, updates);
        // Real-time listener will update the state automatically
      }
    } catch (error) {
      console.error('Error updating tower:', error);
    }
  };

  const handleDeleteTower = async (towerId: string) => {
    try {
      if (appSettings.simulation.enabled) {
        // In simulation mode, just update local state
        setTowers(prev => prev.filter(tower => tower.id !== towerId));
        console.log(`Deleted tower (simulation) ${towerId}`);
      } else {
        // In live mode, delete from Firebase
        await firebaseService.deleteTower(towerId);
        console.log(`Deleted tower from Firebase ${towerId}`);
        // Real-time listener will update the state automatically
      }
    } catch (error) {
      console.error('Error deleting tower:', error);
    }
  };

  // Get SOS hikers (pending help) - exclude locally handled ones
  const sosHikers = hikers.filter(hiker => 
    hiker.sos && 
    !hiker.sosHandled && 
    !handledSosAlerts.has(hiker.id)
  );
  
  // Get hikers with help on the way - include locally handled ones
  const sosHelpOnWayHikers = hikers
    .filter(hiker => 
      hiker.sos && 
      (hiker.sosHandled || handledSosAlerts.has(hiker.id))
    )
    .map(hiker => {
      // If locally handled but Firebase hasn't updated yet, ensure sosHandled is true
      if (handledSosAlerts.has(hiker.id) && !hiker.sosHandled) {
        return {
          ...hiker,
          sosHandled: true,
          sosHandledTime: hiker.sosHandledTime || Date.now()
        };
      }
      return hiker;
    });

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
        <div className="app-header__actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setTrackManagerOpen(true)}
            title="Manage hiking tracks"
          >
            <Route size={16} />
            Tracks
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setTowerManagerOpen(true)}
            title="Manage towers"
          >
            <Radio size={16} />
            Towers
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings size={16} />
            Settings
          </Button>
        </div>
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

          {/* SOS Help On Way Status */}
          {sosHelpOnWayHikers.length > 0 && (
            <div className="app-sos-help-status">
              {sosHelpOnWayHikers.map(hiker => (
                <div key={hiker.id} className="sos-help-status">
                  <div className="sos-help-status__content">
                    <div className="sos-help-status__icon">
                      <Plane size={20} />
                    </div>
                    <div className="sos-help-status__info">
                      <h4>SOS - Help On The Way</h4>
                      <p><strong>{hiker.name}</strong> - Emergency services dispatched</p>
                      {hiker.sosHandledTime && (
                        <span className="sos-help-status__time">
                          Dispatched: {new Date(hiker.sosHandledTime).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                    <div className="sos-help-status__actions">
                      <Button 
                        variant="warning" 
                        size="sm" 
                        onClick={() => handleSosAction(hiker.id, 'reset')}
                      >
                        Clear SOS
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => handleHikerClick(hiker)}
                      >
                        View Location
                      </Button>
                    </div>
                  </div>
                </div>
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
              selectedHikerId={selectedHiker?.id || null}
              trackingHikerId={trackingHikerId}
              onTrackingCancelled={() => setTrackingHikerId(null)}
              safetyTracks={appSettings.safety.tracks}
              showSafetyTracks={appSettings.safety.enabled}
              highlightUnsafeHikers={appSettings.safety.highlightUnsafeHikers}
              unsafeHikerIds={unsafeHikers.map(u => u.hiker.id)}
              hikerTrackHistory={showTrackHistory ? {
                hikerId: showTrackHistory,
                trackPoints: hikerHistoryService.getHikerTrackHistory(showTrackHistory)?.trackPoints || []
              } : null}
              showTrackHistory={showTrackHistory !== null}
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
            onShowTrackHistory={() => handleToggleTrackHistory(selectedHiker.id)}
            onNameChange={(newName) => handleHikerNameChange(selectedHiker.id, newName)}
            onShare={() => handleShareHiker(selectedHiker)}
          />
        )}
      </Modal>

      {/* Share Link Modal */}
      {hikerToShare && (
        <ShareLinkModal
          isOpen={shareModalOpen}
          onClose={() => {
            setShareModalOpen(false);
            setHikerToShare(null);
          }}
          hiker={hikerToShare}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={appSettings}
        onSettingsChange={handleSettingsChange}
      />

      {/* Track Manager Modal */}
      <TrackManager
        isOpen={trackManagerOpen}
        onClose={() => setTrackManagerOpen(false)}
        tracks={appSettings.safety.tracks}
        onAddTrack={handleAddTrack}
        onEditTrack={handleEditTrack}
        onDeleteTrack={handleDeleteTrack}
        mapCenter={appSettings.map.center}
        mapZoom={appSettings.map.defaultZoom}
      />

      {/* Tower Manager Modal */}
      <TowerManager
        isOpen={towerManagerOpen}
        onClose={() => setTowerManagerOpen(false)}
        towers={towers}
        onAddTower={handleAddTower}
        onEditTower={handleEditTower}
        onDeleteTower={handleDeleteTower}
      />
    </div>
  );
}

export default App;
