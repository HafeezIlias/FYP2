import React, { useState } from 'react';
import { User, MapPin, Battery, Clock, AlertTriangle, Route, Edit2, Check, X, Share2, Activity } from 'lucide-react';
import { Hiker } from '../../../types';
import { Button } from '../../common/Button';
import { getSosStatusText } from '../../../utils/hikerUtils';
import { hikerHistoryService } from '../../../services/hikerHistory';
import './HikerTracker.css';

interface HikerTrackerProps {
  hiker: Hiker;
  onTrack?: () => void;
  onMessage?: () => void;
  onSosHandle?: () => void;
  onSosReset?: () => void;
  onShowTrackHistory?: () => void;
  onNameChange?: (newName: string) => void;
  onShare?: () => void;
  showActions?: boolean;
  compact?: boolean;
  className?: string;
}

export const HikerTracker: React.FC<HikerTrackerProps> = ({
  hiker,
  onTrack,
  onMessage,
  onSosHandle,
  onSosReset,
  onShowTrackHistory,
  onNameChange,
  onShare,
  showActions = true,
  compact = false,
  className = ''
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(hiker.name);

  const handleNameEdit = () => {
    setIsEditingName(true);
    setEditedName(hiker.name);
  };

  const handleNameSave = () => {
    if (editedName.trim() && editedName.trim() !== hiker.name && onNameChange) {
      onNameChange(editedName.trim());
    }
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setEditedName(hiker.name);
    setIsEditingName(false);
  };

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
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const trackerClasses = [
    'hiker-tracker',
    compact ? 'hiker-tracker--compact' : '',
    hiker.sos ? 'hiker-tracker--sos' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={trackerClasses}>
      {/* Header */}
      <div className="hiker-tracker__header">
        <div className="hiker-tracker__avatar">
          <User size={compact ? 16 : 20} />
        </div>
        <div className="hiker-tracker__info">
          <div className="hiker-tracker__name-container">
            {isEditingName ? (
              <div className="hiker-tracker__name-edit">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="hiker-tracker__name-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleNameSave()}
                  onBlur={handleNameSave}
                  autoFocus
                />
                <div className="hiker-tracker__name-actions">
                  <button onClick={handleNameSave} className="hiker-tracker__name-save">
                    <Check size={12} />
                  </button>
                  <button onClick={handleNameCancel} className="hiker-tracker__name-cancel">
                    <X size={12} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="hiker-tracker__name-display">
                <h4 className="hiker-tracker__name">{hiker.name}</h4>
                {onNameChange && !compact && (
                  <button onClick={handleNameEdit} className="hiker-tracker__name-edit-btn">
                    <Edit2 size={12} />
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="hiker-tracker__status">
            <span 
              className="hiker-tracker__status-dot"
              style={{ backgroundColor: getStatusColor(hiker.status) }}
            />
            <span className="hiker-tracker__status-text">{hiker.status}</span>
            {compact && (
              <div className="hiker-tracker__compact-battery">
                <Battery 
                  size={12} 
                  className="hiker-tracker__compact-battery-icon" 
                  style={{ color: getBatteryColor(hiker.battery) }}
                />
                <span 
                  className="hiker-tracker__compact-battery-text"
                  style={{ color: getBatteryColor(hiker.battery) }}
                >
                  {Math.round(hiker.battery)}%
                </span>
                {hiker.battery <= 5 && (
                  <span className="hiker-tracker__compact-critical"><Battery size={14} /></span>
                )}
                {hiker.battery <= 20 && hiker.battery > 5 && (
                  <span className="hiker-tracker__compact-warning"><AlertTriangle size={14} /></span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      {!compact && (
        <div className="hiker-tracker__details">
          <div className="hiker-tracker__detail">
            <MapPin size={16} className="hiker-tracker__icon" />
            <span className="hiker-tracker__value">
              {hiker.lat.toFixed(5)}, {hiker.lon.toFixed(5)}
            </span>
          </div>
          
          <div className="hiker-tracker__detail">
            <Battery 
              size={16} 
              className="hiker-tracker__icon" 
              style={{ color: getBatteryColor(hiker.battery) }}
            />
            <span 
              className="hiker-tracker__value"
              style={{ color: getBatteryColor(hiker.battery) }}
            >
              {Math.round(hiker.battery)}%
            </span>
            <div className="hiker-tracker__battery-bar">
              <div 
                className="hiker-tracker__battery-fill"
                style={{ 
                  width: `${Math.max(hiker.battery, 5)}%`,
                  backgroundColor: getBatteryColor(hiker.battery)
                }}
              />
            </div>
            {hiker.battery <= 20 && (
              <span className="hiker-tracker__battery-warning"><AlertTriangle size={14} /> Low Battery</span>
            )}
            {hiker.battery <= 5 && (
              <span className="hiker-tracker__battery-critical"><Battery size={14} /> Critical</span>
            )}
          </div>
          
          <div className="hiker-tracker__detail">
            <Clock size={16} className="hiker-tracker__icon" />
            <span className="hiker-tracker__value">{formatLastUpdate(hiker.lastUpdate)}</span>
          </div>

          {/* Pace and Speed */}
          {hikerHistoryService.hasTrackHistory(hiker.id) && (
            <>
              <div className="hiker-tracker__detail">
                <Activity size={16} className="hiker-tracker__icon" />
                <span className="hiker-tracker__value">
                  Speed: {hikerHistoryService.formatSpeed(hikerHistoryService.getCurrentSpeed(hiker.id))} km/h
                </span>
              </div>

              <div className="hiker-tracker__detail">
                <Activity size={16} className="hiker-tracker__icon" />
                <span className="hiker-tracker__value">
                  Pace: {hikerHistoryService.formatPace(hikerHistoryService.getCurrentPace(hiker.id))} /km
                </span>
              </div>

              <div className="hiker-tracker__detail">
                <Route size={16} className="hiker-tracker__icon" />
                <span className="hiker-tracker__value">
                  Distance: {(hikerHistoryService.getTrackDistance(hiker.id) / 1000).toFixed(2)} km
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* SOS Alert */}
      {hiker.sos && (
        <div className="hiker-tracker__sos">
          <div className="hiker-tracker__sos-header">
            <AlertTriangle size={16} />
            <span>SOS ALERT</span>
          </div>
          <p className="hiker-tracker__sos-status">
            {getSosStatusText(hiker)}
          </p>
          {hiker.sosHandledTime && (
            <p className="hiker-tracker__sos-time">
              Handled: {new Date(hiker.sosHandledTime).toLocaleTimeString()}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      {showActions && !compact && (
        <div className="hiker-tracker__actions">
          {hiker.sos ? (
            <div className="hiker-tracker__sos-actions">
              {!hiker.sosHandled && onSosHandle && (
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={onSosHandle}
                  className="hiker-tracker__action"
                >
                  <AlertTriangle size={14} />
                  Send Help
                </Button>
              )}
              {onSosReset && (
                <Button 
                  variant="warning" 
                  size="sm" 
                  onClick={onSosReset}
                  className="hiker-tracker__action"
                >
                  Clear SOS
                </Button>
              )}
            </div>
          ) : (
            <div className="hiker-tracker__normal-actions">
              {onTrack && (
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={onTrack}
                  className="hiker-tracker__action"
                >
                  Track
                </Button>
              )}
              {onMessage && (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={onMessage}
                  className="hiker-tracker__action"
                >
                  Message
                </Button>
              )}
              {onShowTrackHistory && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onShowTrackHistory}
                  className="hiker-tracker__action"
                >
                  <Route size={14} />
                  Track History
                </Button>
              )}
              {onShare && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onShare}
                  className="hiker-tracker__action"
                  title="Share location link"
                >
                  <Share2 size={14} />
                  Share
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};