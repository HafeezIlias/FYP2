import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Crosshair, Users, Radio } from 'lucide-react';
import { Hiker, Tower, SafetyTrack, TrackPoint } from '../../../types';
import { Button } from '../../common/Button';
import { getSosStatusText } from '../../../utils/hikerUtils';
import './MapView.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface MapViewProps {
  hikers: Hiker[];
  towers: Tower[];
  center: [number, number];
  zoom: number;
  style: 'default' | 'satellite' | 'terrain' | 'dark';
  onHikerClick: (hiker: Hiker) => void;
  onTowerClick: (tower: Tower) => void;
  trackingHikerId?: string | null;
  safetyTracks?: SafetyTrack[];
  showSafetyTracks?: boolean;
  highlightUnsafeHikers?: boolean;
  unsafeHikerIds?: string[];
  hikerTrackHistory?: { hikerId: string; trackPoints: TrackPoint[] } | null;
  showTrackHistory?: boolean;
  showTowerRanges?: boolean;
  className?: string;
}

// Map style configurations
const mapStyles = {
  default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
};

export const MapView: React.FC<MapViewProps> = ({
  hikers,
  towers,
  center,
  zoom,
  style,
  onHikerClick,
  onTowerClick,
  trackingHikerId,
  safetyTracks = [],
  showSafetyTracks = false,
  highlightUnsafeHikers = false,
  unsafeHikerIds = [],
  hikerTrackHistory = null,
  showTrackHistory = false,
  showTowerRanges = true,
  className = ''
}) => {
  const mapRef = useRef<any>(null);
  const [showAllHikers, setShowAllHikers] = useState(true);
  const [showTowerCoverage, setShowTowerCoverage] = useState(showTowerRanges);

  // Create custom marker icons
  const createHikerIcon = (hiker: Hiker, isUnsafe: boolean = false): L.DivIcon => {
    const isTracking = trackingHikerId === hiker.id;
    const issos = hiker.sos;
    
    // Priority-based color assignment (highest priority first)
    let iconColor = 'rgb(56, 161, 105)'; // Default green for healthy/active hikers
    
    if (issos && !hiker.sosHandled) {
      iconColor = 'rgb(229, 62, 62)'; // Red for active SOS (highest priority)
    } else if (issos && hiker.sosHandled) {
      iconColor = 'rgb(214, 158, 46)'; // Orange for handled SOS
    } else if (isUnsafe) {
      iconColor = 'rgb(245, 101, 101)'; // Light red for unsafe hikers
    } else if (hiker.battery <= 10) {
      iconColor = 'rgb(229, 62, 62)'; // Red for critical battery
    } else if (hiker.battery <= 25) {
      iconColor = 'rgb(221, 107, 32)'; // Orange for low battery
    } else if (hiker.status === 'Inactive') {
      iconColor = 'rgb(160, 174, 192)'; // Gray for inactive
    } else if (hiker.status === 'Resting') {
      iconColor = 'rgb(66, 153, 225)'; // Blue for resting
    }
    // Active/Moving hikers with good battery stay green

    return L.divIcon({
      className: 'custom-hiker-marker',
      html: `
        <div class="hiker-marker ${isTracking ? 'hiker-marker--tracking' : ''} ${issos ? 'hiker-marker--sos' : ''} ${isUnsafe ? 'hiker-marker--unsafe' : ''}">
          <div class="hiker-marker__name" style="background: ${iconColor} !important;">${hiker.name}</div>
          <div class="hiker-marker__icon" style="background: ${iconColor} !important;">
            <i class="fas fa-user"></i>
          </div>
          <div class="hiker-marker__pulse" style="background: ${iconColor} !important;"></div>
          ${isUnsafe ? '<div class="hiker-marker__warning">⚠</div>' : ''}
        </div>
      `,
      iconSize: [120, 55],
      iconAnchor: [60, 45],
      popupAnchor: [0, -15]
    });
  };

  const createTowerIcon = (tower: Tower): L.DivIcon => {
    let iconColor = '#38A169'; // Green for active
    if (tower.status === 'Inactive') {
      iconColor = '#E53E3E'; // Red for inactive
    } else if (tower.status === 'Maintenance') {
      iconColor = '#D69E2E'; // Orange for maintenance
    }

    const towerTypeIcon = {
      'Tower': 'fas fa-broadcast-tower',
      'Basecamp': 'fas fa-campground',
      'Relay': 'fas fa-wifi'
    };

    return L.divIcon({
      className: 'custom-tower-marker',
      html: `
        <div class="tower-marker">
          <div class="tower-marker__icon" style="background-color: ${iconColor}">
            <i class="${towerTypeIcon[tower.type]}"></i>
          </div>
        </div>
      `,
      iconSize: [25, 25],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
  };

  // Center map on specific hiker (currently unused but kept for future use)
  // const centerOnHiker = (hikerId: string) => {
  //   const hiker = hikers.find(h => h.id === hikerId);
  //   if (hiker && mapRef.current) {
  //     mapRef.current.setView([hiker.lat, hiker.lon], 16);
  //   }
  // };

  // Toggle show all hikers
  const toggleAllHikers = () => {
    setShowAllHikers(!showAllHikers);
    if (mapRef.current && !showAllHikers && hikers.length > 0) {
      // Fit bounds to show all hikers
      const bounds = L.latLngBounds(hikers.map(h => [h.lat, h.lon]));
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    }
  };

  // Center map to default position
  const centerMap = () => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom);
    }
  };

  return (
    <div className={`map-view ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="map-view__container"
        ref={mapRef}
      >
        <TileLayer
          url={mapStyles[style]}
          attribution='&copy; OpenStreetMap contributors'
        />
        
        {/* Render hikers */}
        {showAllHikers && hikers.map((hiker) => {
          const isUnsafe = highlightUnsafeHikers && unsafeHikerIds.includes(hiker.id);
          return (
            <Marker
              key={hiker.id}
              position={[hiker.lat, hiker.lon]}
              icon={createHikerIcon(hiker, isUnsafe)}
              eventHandlers={{
                click: () => onHikerClick(hiker)
              }}
            >
            <Popup>
              <div className="map-popup">
                <h4 className="map-popup__title">{hiker.name}</h4>
                <div className="map-popup__content">
                  <p><strong>Status:</strong> {hiker.status}</p>
                  <p><strong>Battery:</strong> {Math.round(hiker.battery)}%</p>
                  <p><strong>Last Update:</strong> {new Date(hiker.lastUpdate).toLocaleTimeString()}</p>
                  {hiker.sos && (
                    <p className="map-popup__sos">
                      <strong>SOS:</strong> {getSosStatusText(hiker)}
                    </p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
          );
        })}

        {/* Render towers */}
        {towers.map((tower) => (
          <React.Fragment key={tower.id}>
            <Marker
              position={[tower.lat, tower.lon]}
              icon={createTowerIcon(tower)}
              eventHandlers={{
                click: () => onTowerClick(tower)
              }}
            >
              <Popup>
                <div className="map-popup">
                  <h4 className="map-popup__title">{tower.name}</h4>
                  <div className="map-popup__content">
                    <p><strong>Type:</strong> {tower.type}</p>
                    <p><strong>Status:</strong> {tower.status}</p>
                    <p><strong>Coverage:</strong> {tower.coverageRadius}m</p>
                    <p><strong>Signal:</strong> {tower.signalStrength}%</p>
                  </div>
                </div>
              </Popup>
            </Marker>
            
            {/* Tower coverage circle */}
            {showTowerCoverage && (
              <Circle
                center={[tower.lat, tower.lon]}
                radius={tower.coverageRadius}
                pathOptions={{
                  color: tower.status === 'Active' ? '#38A169' : '#E53E3E',
                  fillColor: tower.status === 'Active' ? '#38A169' : '#E53E3E',
                  fillOpacity: 0.1,
                  weight: 2,
                  opacity: 0.6
                }}
              />
            )}
          </React.Fragment>
        ))}

        {/* Render safety tracks */}
        {showSafetyTracks && safetyTracks.map((track) => {
          if (!track.enabled || track.points.length < 2) return null;
          
          const trackPath = track.points.map(point => [point.lat, point.lon] as [number, number]);
          
          return (
            <Polyline
              key={track.id}
              positions={trackPath}
              pathOptions={{
                color: track.color,
                weight: Math.max(track.width / 10, 3), // Convert width to line weight
                opacity: 0.8,
                dashArray: track.enabled ? undefined : '10, 10'
              }}
            >
              <Popup>
                <div className="map-popup">
                  <h4 className="map-popup__title">{track.name}</h4>
                  <div className="map-popup__content">
                    <p><strong>Width:</strong> {track.width}m</p>
                    <p><strong>Points:</strong> {track.points.length}</p>
                    <p><strong>Status:</strong> {track.enabled ? 'Enabled' : 'Disabled'}</p>
                  </div>
                </div>
              </Popup>
            </Polyline>
          );
        })}
        
        {/* Render hiker track history */}
        {showTrackHistory && hikerTrackHistory && hikerTrackHistory.trackPoints.length > 1 && (
          <Polyline
            key={`history-${hikerTrackHistory.hikerId}`}
            positions={hikerTrackHistory.trackPoints.map(point => [point.lat, point.lon])}
            pathOptions={{
              color: '#FF6B6B', // Distinctive red color for history
              weight: 4,
              opacity: 0.8,
              dashArray: '5, 10' // Dashed line to differentiate from safety tracks
            }}
          >
            <Popup>
              <div className="map-popup">
                <h4 className="map-popup__title">Track History</h4>
                <div className="map-popup__content">
                  <p><strong>Points:</strong> {hikerTrackHistory.trackPoints.length}</p>
                  <p><strong>Start:</strong> {new Date(hikerTrackHistory.trackPoints[0].timestamp).toLocaleString()}</p>
                  <p><strong>End:</strong> {new Date(hikerTrackHistory.trackPoints[hikerTrackHistory.trackPoints.length - 1].timestamp).toLocaleString()}</p>
                </div>
              </div>
            </Popup>
          </Polyline>
        )}
      </MapContainer>

      {/* Map Controls */}
      <div className="map-controls">
        <Button
          variant="secondary"
          size="sm"
          onClick={centerMap}
          title="Center map"
        >
          <Crosshair size={18} />
        </Button>
        
        <Button
          variant={showAllHikers ? "primary" : "secondary"}
          size="sm"
          onClick={toggleAllHikers}
          title="Toggle all hikers"
        >
          <Users size={18} />
        </Button>
        
        <Button
          variant={showTowerCoverage ? "primary" : "secondary"}
          size="sm"
          onClick={() => setShowTowerCoverage(!showTowerCoverage)}
          title="Toggle tower coverage"
        >
          <Radio size={18} />
        </Button>
      </div>
    </div>
  );
};