import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mountain, MapPin, Battery, Clock, AlertTriangle, Activity, RefreshCw } from 'lucide-react';
import { firebaseSharingService } from '../../../services/firebase';
import { Hiker } from '../../../types';
import { PublicMapView } from './PublicMapView';
import './PublicHikerView.css';

export const PublicHikerView: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const [hiker, setHiker] = useState<Hiker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError('Invalid tracking link');
      setLoading(false);
      return;
    }

    // Listen for real-time updates
    const unsubscribe = firebaseSharingService.listenToSharedHiker(
      token,
      (hikerData) => {
        if (hikerData) {
          setHiker(hikerData);
          setError(null);
        } else {
          setError('This tracking link is invalid, expired, or has been revoked.');
          setHiker(null);
        }
        setLoading(false);
      }
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [token]);

  const getBatteryColor = (battery: number): string => {
    if (battery > 50) return '#38A169';
    if (battery > 20) return '#D69E2E';
    return '#E53E3E';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'SOS': return '#E53E3E';
      case 'Moving': return '#38A169';
      case 'Active': return '#4299E1';
      case 'Resting': return '#718096';
      case 'Inactive': return '#A0AEC0';
      default: return '#4299E1';
    }
  };

  const formatLastUpdate = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);

    if (seconds < 30) return 'Just now';
    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const formatDateTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="public-hiker-view">
        <div className="public-hiker-view__loading">
          <RefreshCw size={40} className="public-hiker-view__spinner" />
          <p>Loading tracker information...</p>
        </div>
      </div>
    );
  }

  if (error || !hiker) {
    return (
      <div className="public-hiker-view">
        <div className="public-hiker-view__error">
          <AlertTriangle size={60} />
          <h2>Unable to Load Tracker</h2>
          <p>{error || 'This tracking link is no longer valid.'}</p>
          <p className="public-hiker-view__error-hint">
            Please contact the person who shared this link with you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="public-hiker-view">
      {/* Header */}
      <header className="public-hiker-view__header">
        <div className="public-hiker-view__brand">
          <Mountain size={28} />
          <h1>Trail Beacon</h1>
        </div>
        <div className="public-hiker-view__subtitle">
          Real-time Location Tracker
        </div>
      </header>

      {/* Main Content */}
      <div className="public-hiker-view__content">
        {/* Hiker Info Card */}
        <div className="public-hiker-view__info-card">
          <div className="public-hiker-view__hiker-header">
            <h2 className="public-hiker-view__hiker-name">{hiker.name}</h2>
            <div className="public-hiker-view__status-badge" style={{ backgroundColor: getStatusColor(hiker.status) }}>
              <Activity size={16} />
              <span>{hiker.status}</span>
            </div>
          </div>

          {/* SOS Alert */}
          {hiker.sos && (
            <div className="public-hiker-view__sos-alert">
              <div className="public-hiker-view__sos-header">
                <AlertTriangle size={20} />
                <strong>SOS ALERT ACTIVE</strong>
              </div>
              <p>This hiker has activated an emergency SOS signal.</p>
              {hiker.sosHandled && (
                <p className="public-hiker-view__sos-handled">
                  ✓ Emergency services have been notified
                </p>
              )}
            </div>
          )}

          {/* Stats Grid */}
          <div className="public-hiker-view__stats">
            <div className="public-hiker-view__stat">
              <div className="public-hiker-view__stat-icon">
                <MapPin size={20} />
              </div>
              <div className="public-hiker-view__stat-content">
                <div className="public-hiker-view__stat-label">Location</div>
                <div className="public-hiker-view__stat-value">
                  {hiker.lat.toFixed(5)}, {hiker.lon.toFixed(5)}
                </div>
              </div>
            </div>

            <div className="public-hiker-view__stat">
              <div className="public-hiker-view__stat-icon" style={{ color: getBatteryColor(hiker.battery) }}>
                <Battery size={20} />
              </div>
              <div className="public-hiker-view__stat-content">
                <div className="public-hiker-view__stat-label">Battery</div>
                <div className="public-hiker-view__stat-value" style={{ color: getBatteryColor(hiker.battery) }}>
                  {Math.round(hiker.battery)}%
                  {hiker.battery <= 20 && (
                    <span className="public-hiker-view__battery-warning">
                      <AlertTriangle size={14} /> Low
                    </span>
                  )}
                </div>
                <div className="public-hiker-view__battery-bar">
                  <div
                    className="public-hiker-view__battery-fill"
                    style={{
                      width: `${Math.max(hiker.battery, 5)}%`,
                      backgroundColor: getBatteryColor(hiker.battery)
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="public-hiker-view__stat">
              <div className="public-hiker-view__stat-icon">
                <Clock size={20} />
              </div>
              <div className="public-hiker-view__stat-content">
                <div className="public-hiker-view__stat-label">Last Update</div>
                <div className="public-hiker-view__stat-value">
                  {formatLastUpdate(hiker.lastUpdate)}
                </div>
                <div className="public-hiker-view__stat-timestamp">
                  {formatDateTime(hiker.lastUpdate)}
                </div>
              </div>
            </div>
          </div>

          {/* Auto-refresh indicator */}
          <div className="public-hiker-view__refresh-info">
            <RefreshCw size={14} />
            <span>Updates automatically in real-time</span>
          </div>
        </div>

        {/* Map */}
        <div className="public-hiker-view__map-container">
          <PublicMapView hiker={hiker} />
        </div>
      </div>

      {/* Footer */}
      <footer className="public-hiker-view__footer">
        <p>Powered by Trail Beacon - Hiker Safety & Tracking System</p>
        <p className="public-hiker-view__footer-note">
          This is a read-only view. You cannot control or modify the hiker's device.
        </p>
      </footer>
    </div>
  );
};
