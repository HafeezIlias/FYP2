import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, Map, Database, Bell, Shield } from 'lucide-react';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { AppSettings } from '../../../types';
import './Settings.css';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

const defaultSettings: AppSettings = {
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
};

export const Settings: React.FC<SettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange
}) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    onSettingsChange(localSettings);
    localStorage.setItem('trailBeaconSettings', JSON.stringify(localSettings));
    onClose();
  };

  const handleReset = () => {
    setLocalSettings(defaultSettings);
  };

  const updateSettings = (section: keyof AppSettings, key: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      size="lg"
    >
      <div className="settings">
        
        {/* Map Settings */}
        <div className="settings__section">
          <div className="settings__section-header">
            <Map size={20} />
            <h3>Map Settings</h3>
          </div>
          
          <div className="settings__group">
            <label className="settings__label">Map Style</label>
            <select 
              value={localSettings.map.style}
              onChange={(e) => updateSettings('map', 'style', e.target.value)}
              className="settings__select"
            >
              <option value="default">Default</option>
              <option value="satellite">Satellite</option>
              <option value="terrain">Terrain</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>

          <div className="settings__group">
            <label className="settings__label">Default Zoom Level</label>
            <div className="settings__range-group">
              <input
                type="range"
                min="5"
                max="18"
                value={localSettings.map.defaultZoom}
                onChange={(e) => updateSettings('map', 'defaultZoom', parseInt(e.target.value))}
                className="settings__range"
              />
              <span className="settings__range-value">{localSettings.map.defaultZoom}</span>
            </div>
          </div>
        </div>

        {/* Data Source Settings */}
        <div className="settings__section">
          <div className="settings__section-header">
            <Database size={20} />
            <h3>Data Source</h3>
          </div>
          
          <div className="settings__group">
            <div className="settings__toggle-group">
              <label className="settings__label">Enable Simulation</label>
              <label className="settings__toggle">
                <input
                  type="checkbox"
                  checked={localSettings.simulation.enabled}
                  onChange={(e) => updateSettings('simulation', 'enabled', e.target.checked)}
                />
                <span className="settings__toggle-slider"></span>
              </label>
            </div>
            <small className="settings__description">Turn off to use live data from Firebase</small>
          </div>
        </div>

        {/* Simulation Settings */}
        {localSettings.simulation.enabled && (
          <div className="settings__section">
            <div className="settings__section-header">
              <div className="settings__icon">⚡</div>
              <h3>Simulation Settings</h3>
            </div>
            
            <div className="settings__group">
              <label className="settings__label">Update Interval</label>
              <div className="settings__range-group">
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={localSettings.simulation.speed}
                  onChange={(e) => updateSettings('simulation', 'speed', parseInt(e.target.value))}
                  className="settings__range"
                />
                <span className="settings__range-value">{localSettings.simulation.speed}ms</span>
              </div>
            </div>

            <div className="settings__group">
              <label className="settings__label">Number of Hikers</label>
              <div className="settings__range-group">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={localSettings.simulation.hikersCount}
                  onChange={(e) => updateSettings('simulation', 'hikersCount', parseInt(e.target.value))}
                  className="settings__range"
                />
                <span className="settings__range-value">{localSettings.simulation.hikersCount}</span>
              </div>
            </div>

            <div className="settings__group">
              <div className="settings__toggle-group">
                <label className="settings__label">Random SOS Events</label>
                <label className="settings__toggle">
                  <input
                    type="checkbox"
                    checked={localSettings.simulation.autoSos}
                    onChange={(e) => updateSettings('simulation', 'autoSos', e.target.checked)}
                  />
                  <span className="settings__toggle-slider"></span>
                </label>
              </div>
              <small className="settings__description">Randomly generate SOS events during simulation</small>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        <div className="settings__section">
          <div className="settings__section-header">
            <Bell size={20} />
            <h3>Notifications</h3>
          </div>
          
          <div className="settings__group">
            <div className="settings__toggle-group">
              <label className="settings__label">SOS Alerts</label>
              <label className="settings__toggle">
                <input
                  type="checkbox"
                  checked={localSettings.notifications.sosAlerts}
                  onChange={(e) => updateSettings('notifications', 'sosAlerts', e.target.checked)}
                />
                <span className="settings__toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings__group">
            <div className="settings__toggle-group">
              <label className="settings__label">Low Battery Alerts</label>
              <label className="settings__toggle">
                <input
                  type="checkbox"
                  checked={localSettings.notifications.batteryAlerts}
                  onChange={(e) => updateSettings('notifications', 'batteryAlerts', e.target.checked)}
                />
                <span className="settings__toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings__group">
            <label className="settings__label">Battery Alert Threshold</label>
            <div className="settings__range-group">
              <input
                type="range"
                min="5"
                max="50"
                value={localSettings.notifications.batteryThreshold}
                onChange={(e) => updateSettings('notifications', 'batteryThreshold', parseInt(e.target.value))}
                className="settings__range"
              />
              <span className="settings__range-value">{localSettings.notifications.batteryThreshold}%</span>
            </div>
          </div>

          <div className="settings__group">
            <div className="settings__toggle-group">
              <label className="settings__label">Track Deviation Alerts</label>
              <label className="settings__toggle">
                <input
                  type="checkbox"
                  checked={localSettings.notifications.trackDeviationAlerts}
                  onChange={(e) => updateSettings('notifications', 'trackDeviationAlerts', e.target.checked)}
                />
                <span className="settings__toggle-slider"></span>
              </label>
            </div>
            <small className="settings__description">Alert when hikers deviate from designated tracks</small>
          </div>

          <div className="settings__group">
            <label className="settings__label">Deviation Threshold</label>
            <div className="settings__range-group">
              <input
                type="range"
                min="10"
                max="200"
                value={localSettings.notifications.trackDeviationThreshold}
                onChange={(e) => updateSettings('notifications', 'trackDeviationThreshold', parseInt(e.target.value))}
                className="settings__range"
              />
              <span className="settings__range-value">{localSettings.notifications.trackDeviationThreshold}m</span>
            </div>
          </div>
        </div>

        {/* Safety Settings */}
        <div className="settings__section">
          <div className="settings__section-header">
            <Shield size={20} />
            <h3>Safety Settings</h3>
          </div>
          
          <div className="settings__group">
            <div className="settings__toggle-group">
              <label className="settings__label">Enable Track Safety</label>
              <label className="settings__toggle">
                <input
                  type="checkbox"
                  checked={localSettings.safety.enabled}
                  onChange={(e) => updateSettings('safety', 'enabled', e.target.checked)}
                />
                <span className="settings__toggle-slider"></span>
              </label>
            </div>
            <small className="settings__description">Monitor hikers' adherence to defined safety tracks</small>
          </div>

          <div className="settings__group">
            <div className="settings__toggle-group">
              <label className="settings__label">Highlight Off-Track Hikers</label>
              <label className="settings__toggle">
                <input
                  type="checkbox"
                  checked={localSettings.safety.highlightUnsafeHikers}
                  onChange={(e) => updateSettings('safety', 'highlightUnsafeHikers', e.target.checked)}
                />
                <span className="settings__toggle-slider"></span>
              </label>
            </div>
            <small className="settings__description">Visually highlight hikers that have deviated from safety tracks</small>
          </div>
        </div>

        {/* Actions */}
        <div className="settings__actions">
          <Button 
            variant="primary"
            onClick={handleSave}
          >
            <Save size={16} />
            Save Settings
          </Button>
          <Button 
            variant="secondary"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Reset to Default
          </Button>
        </div>
      </div>
    </Modal>
  );
};