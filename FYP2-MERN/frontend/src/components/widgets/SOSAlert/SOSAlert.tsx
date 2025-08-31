import React, { useEffect, useState } from 'react';
import { AlertTriangle, X, Phone, MapPin, Clock } from 'lucide-react';
import { Hiker } from '../../../types';
import { Button } from '../../common/Button';
import './SOSAlert.css';

interface SOSAlertProps {
  hiker: Hiker;
  onHandle: () => void;
  onDismiss?: () => void;
  onViewLocation?: () => void;
  autoExpand?: boolean;
  className?: string;
}

export const SOSAlert: React.FC<SOSAlertProps> = ({
  hiker,
  onHandle,
  onDismiss,
  onViewLocation,
  autoExpand = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Show alert when SOS becomes active
  useEffect(() => {
    if (hiker.sos && !hiker.sosHandled && autoExpand) {
      setIsVisible(true);
    }
  }, [hiker.sos, hiker.sosHandled, autoExpand]);

  // Update time elapsed
  useEffect(() => {
    if (!hiker.sos) {
      setTimeElapsed(0);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const sosTime = hiker.lastUpdate; // Assuming SOS time is last update
      setTimeElapsed(Math.floor((now - sosTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [hiker.sos, hiker.lastUpdate]);

  const formatElapsedTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const getUrgencyLevel = (): 'critical' | 'high' | 'medium' => {
    if (timeElapsed > 300) return 'critical'; // 5+ minutes
    if (timeElapsed > 120) return 'high';     // 2+ minutes
    return 'medium';
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!hiker.sos || hiker.sosHandled) {
    return null;
  }

  const urgency = getUrgencyLevel();
  const alertClasses = [
    'sos-alert',
    `sos-alert--${urgency}`,
    isVisible ? 'sos-alert--visible' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={alertClasses}>
      {/* Alert Header */}
      <div className="sos-alert__header">
        <div className="sos-alert__icon">
          <AlertTriangle size={24} />
        </div>
        <div className="sos-alert__title">
          <h3>SOS EMERGENCY</h3>
          <p className="sos-alert__hiker-name">{hiker.name}</p>
        </div>
        {onDismiss && (
          <button 
            className="sos-alert__dismiss" 
            onClick={handleDismiss}
            aria-label="Dismiss alert"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Alert Content */}
      <div className="sos-alert__content">
        <div className="sos-alert__details">
          <div className="sos-alert__detail">
            <Clock size={16} />
            <span>Active for: {formatElapsedTime(timeElapsed)}</span>
          </div>
          
          <div className="sos-alert__detail">
            <MapPin size={16} />
            <span>
              {hiker.lat.toFixed(5)}, {hiker.lon.toFixed(5)}
            </span>
          </div>
          
          <div className="sos-alert__detail">
            <span className="sos-alert__battery">
              Battery: {Math.round(hiker.battery)}%
            </span>
          </div>
        </div>

        <div className="sos-alert__status">
          <div className={`sos-alert__urgency sos-alert__urgency--${urgency}`}>
            {urgency.toUpperCase()} PRIORITY
          </div>
          <p className="sos-alert__message">
            Hiker requires immediate assistance
          </p>
        </div>
      </div>

      {/* Alert Actions */}
      <div className="sos-alert__actions">
        <Button 
          variant="danger" 
          onClick={onHandle}
          className="sos-alert__action sos-alert__action--primary"
        >
          <Phone size={16} />
          Send Help
        </Button>
        
        {onViewLocation && (
          <Button 
            variant="secondary" 
            onClick={onViewLocation}
            className="sos-alert__action"
          >
            <MapPin size={16} />
            View Location
          </Button>
        )}
      </div>

      {/* Pulse Animation Background */}
      <div className="sos-alert__pulse"></div>
    </div>
  );
};