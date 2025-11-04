import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Hiker } from '../../../types';

// Fix Leaflet default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PublicMapViewProps {
  hiker: Hiker;
}

export const PublicMapView: React.FC<PublicMapViewProps> = ({ hiker }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = React.useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) {
      console.log('Map container ref not ready');
      return;
    }

    if (mapRef.current) {
      console.log('Map already initialized');
      return;
    }

    // Validate coordinates
    if (!hiker.lat || !hiker.lon || isNaN(hiker.lat) || isNaN(hiker.lon)) {
      const errorMsg = 'Invalid hiker coordinates for map initialization';
      console.error(errorMsg, hiker);
      setMapError(errorMsg);
      return;
    }

    console.log('Initializing map with coordinates:', hiker.lat, hiker.lon);

    try {
      // Create map
      const map = L.map(mapContainerRef.current, {
        center: [hiker.lat, hiker.lon],
        zoom: 15,
        zoomControl: true,
        attributionControl: true,
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
      setMapError(null);

      console.log('Map initialized successfully');

      // Force map to recalculate size after a short delay
      setTimeout(() => {
        if (map) {
          map.invalidateSize();
          console.log('Map size invalidated');
        }
      }, 100);
    } catch (error) {
      const errorMsg = 'Failed to initialize map';
      console.error(errorMsg, error);
      setMapError(errorMsg);
    }

    return () => {
      if (mapRef.current) {
        console.log('Cleaning up map');
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [hiker.lat, hiker.lon]);

  // Update marker when hiker location changes
  useEffect(() => {
    if (!mapRef.current) {
      console.log('Map not initialized yet, skipping marker creation');
      return;
    }

    // Validate coordinates
    if (!hiker.lat || !hiker.lon || isNaN(hiker.lat) || isNaN(hiker.lon)) {
      console.error('Invalid hiker coordinates for marker:', hiker);
      return;
    }

    const map = mapRef.current;
    const position: L.LatLngExpression = [hiker.lat, hiker.lon];

    console.log('Creating/updating marker at position:', position, 'Status:', hiker.status);

    // Create custom icon based on status
    const getMarkerIcon = (): L.DivIcon => {
      let iconColor = '#4299E1';
      let pulseClass = '';

      if (hiker.sos) {
        iconColor = '#E53E3E';
        pulseClass = 'public-marker-pulse-sos';
      } else if (hiker.status === 'Moving') {
        iconColor = '#38A169';
        pulseClass = 'public-marker-pulse';
      }

      const iconHtml = `
        <div class="public-marker-container ${pulseClass}">
          <div class="public-marker" style="background-color: ${iconColor}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      `;

      return L.divIcon({
        html: iconHtml,
        className: 'public-marker-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
    };

    // Update or create marker
    if (markerRef.current) {
      console.log('Updating existing marker');
      markerRef.current.setLatLng(position);
      markerRef.current.setIcon(getMarkerIcon());

      // Update popup content
      const popupContent = `
        <div style="font-family: 'Poppins', sans-serif; padding: 4px;">
          <strong style="font-size: 14px;">${hiker.name}</strong><br/>
          <span style="color: #666; font-size: 12px;">
            Status: ${hiker.status}<br/>
            Battery: ${Math.round(hiker.battery)}%
          </span>
        </div>
      `;
      markerRef.current.setPopupContent(popupContent);
    } else {
      console.log('Creating new marker');
      const marker = L.marker(position, {
        icon: getMarkerIcon(),
      }).addTo(map);

      // Add popup with hiker info
      const popupContent = `
        <div style="font-family: 'Poppins', sans-serif; padding: 4px;">
          <strong style="font-size: 14px;">${hiker.name}</strong><br/>
          <span style="color: #666; font-size: 12px;">
            Status: ${hiker.status}<br/>
            Battery: ${Math.round(hiker.battery)}%
          </span>
        </div>
      `;

      marker.bindPopup(popupContent).openPopup();
      markerRef.current = marker;
      console.log('Marker created successfully');
    }

    // Auto-track: Always center map on hiker with smooth animation
    map.flyTo(position, map.getZoom(), {
      duration: 1.5,
      easeLinearity: 0.5
    });

    console.log('Map auto-tracking to position:', position);

  }, [hiker.lat, hiker.lon, hiker.status, hiker.sos, hiker.name, hiker.battery]);

  return (
    <div className="public-map-view">
      {mapError && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          background: 'rgba(229, 62, 62, 0.9)',
          color: 'white',
          borderRadius: '8px',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          <p style={{ margin: 0 }}>{mapError}</p>
          <p style={{ margin: '10px 0 0 0', fontSize: '0.9em' }}>Please check the browser console for details.</p>
        </div>
      )}
      <div ref={mapContainerRef} className="public-map-view__map"></div>

      {/* Custom CSS for markers */}
      <style>{`
        .public-map-view {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .public-map-view__map {
          width: 100%;
          height: 100%;
          min-height: 400px;
        }

        .public-marker-icon {
          background: transparent;
          border: none;
        }

        .public-marker-container {
          position: relative;
          width: 40px;
          height: 40px;
        }

        .public-marker {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          border: 3px solid white;
          position: relative;
          z-index: 1;
        }

        .public-marker svg {
          stroke: white;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: white;
        }

        /* Pulse animation for moving hikers */
        .public-marker-pulse::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(56, 161, 105, 0.4);
          animation: public-marker-pulse-animation 2s infinite;
        }

        /* SOS pulse animation */
        .public-marker-pulse-sos::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(229, 62, 62, 0.6);
          animation: public-marker-sos-animation 1s infinite;
        }

        @keyframes public-marker-pulse-animation {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.4;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes public-marker-sos-animation {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.8);
            opacity: 0.3;
          }
        }

        /* Responsive map height */
        @media (max-width: 768px) {
          .public-map-view__map {
            min-height: 300px;
          }
        }
      `}</style>
    </div>
  );
};
