import React, { useState } from 'react';
import { SafetyTrack, TrackPoint } from '../../../types';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { MapContainer, TileLayer, Polyline, useMapEvents } from 'react-leaflet';
import { Plus, Edit, Trash2, Route, Settings, Save, X, Map as MapIcon } from 'lucide-react';
import L from 'leaflet';
import './TrackManager.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface TrackManagerProps {
  tracks: SafetyTrack[];
  onAddTrack: (track: Omit<SafetyTrack, 'id'>) => void;
  onEditTrack: (id: string, track: Partial<SafetyTrack>) => void;
  onDeleteTrack: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  mapCenter: [number, number];
  mapZoom: number;
}

interface TrackFormData {
  name: string;
  width: string;
  color: string;
  enabled: boolean;
  points: TrackPoint[];
}

const initialFormData: TrackFormData = {
  name: '',
  width: '50',
  color: '#3B82F6',
  enabled: true,
  points: []
};

// Component for handling map clicks during track creation
const TrackCreator: React.FC<{
  isCreating: boolean;
  onPointAdd: (point: TrackPoint) => void;
  points: TrackPoint[];
}> = ({ isCreating, onPointAdd, points }) => {
  useMapEvents({
    click: (e) => {
      if (isCreating) {
        const newPoint: TrackPoint = {
          lat: e.latlng.lat,
          lon: e.latlng.lng,
          timestamp: Date.now()
        };
        onPointAdd(newPoint);
      }
    }
  });

  return (
    <>
      {points.length > 1 && (
        <Polyline
          positions={points.map(p => [p.lat, p.lon])}
          pathOptions={{
            color: '#3B82F6',
            weight: 4,
            opacity: 0.8,
            dashArray: '5, 10'
          }}
        />
      )}
    </>
  );
};

export const TrackManager: React.FC<TrackManagerProps> = ({
  tracks,
  onAddTrack,
  onEditTrack,
  onDeleteTrack,
  isOpen,
  onClose,
  mapCenter,
  mapZoom
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showMapCreator, setShowMapCreator] = useState(false);
  const [editingTrack, setEditingTrack] = useState<SafetyTrack | null>(null);
  const [formData, setFormData] = useState<TrackFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof TrackFormData, string>>>({});
  const [isCreatingTrack, setIsCreatingTrack] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<TrackPoint[]>([]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TrackFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Track name is required';
    }

    const width = parseFloat(formData.width);
    if (isNaN(width) || width <= 0 || width > 1000) {
      newErrors.width = 'Width must be between 1 and 1000 meters';
    }

    if (formData.points.length < 2) {
      newErrors.points = 'Track must have at least 2 points';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof TrackFormData, value: string | boolean | TrackPoint[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const trackData = {
      name: formData.name.trim(),
      points: formData.points,
      width: parseFloat(formData.width),
      color: formData.color,
      enabled: formData.enabled
    };

    if (editingTrack) {
      onEditTrack(editingTrack.id, trackData);
    } else {
      onAddTrack(trackData);
    }

    handleCancelForm();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setShowMapCreator(false);
    setEditingTrack(null);
    setFormData(initialFormData);
    setErrors({});
    setIsCreatingTrack(false);
    setCurrentPoints([]);
  };

  const handleAddNew = () => {
    setEditingTrack(null);
    setFormData(initialFormData);
    setShowForm(true);
  };

  const handleEdit = (track: SafetyTrack) => {
    setEditingTrack(track);
    setFormData({
      name: track.name,
      width: track.width.toString(),
      color: track.color,
      enabled: track.enabled,
      points: [...track.points]
    });
    setShowForm(true);
  };

  const handleDelete = (trackId: string, trackName: string) => {
    if (window.confirm(`Are you sure you want to delete track "${trackName}"?`)) {
      onDeleteTrack(trackId);
    }
  };

  const handleCreateOnMap = () => {
    setShowMapCreator(true);
    setIsCreatingTrack(true);
    setCurrentPoints([]);
  };

  const handlePointAdd = (point: TrackPoint) => {
    const newPoints = [...currentPoints, point];
    setCurrentPoints(newPoints);
    setFormData(prev => ({ ...prev, points: newPoints }));
  };

  const handleSaveMapTrack = () => {
    if (currentPoints.length >= 2) {
      setFormData(prev => ({ ...prev, points: currentPoints }));
      setShowMapCreator(false);
      setIsCreatingTrack(false);
      // Show the form to complete track details
    } else {
      alert('Please add at least 2 points to create a track');
    }
  };

  const handleCancelMapCreation = () => {
    setShowMapCreator(false);
    setIsCreatingTrack(false);
    setCurrentPoints([]);
  };

  const formatDistance = (track: SafetyTrack): string => {
    if (track.points.length < 2) return '0m';
    
    let totalDistance = 0;
    for (let i = 1; i < track.points.length; i++) {
      const prev = track.points[i - 1];
      const curr = track.points[i];
      
      // Haversine distance formula
      const R = 6371000; // Earth's radius in meters
      const φ1 = (prev.lat * Math.PI) / 180;
      const φ2 = (curr.lat * Math.PI) / 180;
      const Δφ = ((curr.lat - prev.lat) * Math.PI) / 180;
      const Δλ = ((curr.lon - prev.lon) * Math.PI) / 180;
      
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
      totalDistance += R * c;
    }
    
    if (totalDistance >= 1000) {
      return `${(totalDistance / 1000).toFixed(1)}km`;
    }
    return `${Math.round(totalDistance)}m`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Track Management"
      size="lg"
      className="track-manager"
    >
      <div className="track-manager__content">
        {showMapCreator ? (
          /* Map Creator Interface */
          <div className="track-creator">
            <div className="track-creator__header">
              <h3>
                <MapIcon size={20} />
                Create Track on Map
              </h3>
              <div className="track-creator__actions">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveMapTrack}
                  disabled={currentPoints.length < 2}
                >
                  <Save size={16} />
                  Save Track ({currentPoints.length} points)
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCancelMapCreation}
                >
                  <X size={16} />
                  Cancel
                </Button>
              </div>
            </div>

            <div className="track-creator__instructions">
              <p>Click on the map to add points to your hiking track. You need at least 2 points to create a track.</p>
            </div>

            <div className="track-creator__map">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '400px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                <TrackCreator
                  isCreating={isCreatingTrack}
                  onPointAdd={handlePointAdd}
                  points={currentPoints}
                />
              </MapContainer>
            </div>
          </div>
        ) : !showForm ? (
          /* Track List */
          <>
            <div className="track-manager__header">
              <h3>Hiking Tracks ({tracks.length})</h3>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddNew}
              >
                <Plus size={16} />
                Add New Track
              </Button>
            </div>

            <div className="track-manager__list">
              {tracks.length === 0 ? (
                <div className="track-manager__empty">
                  <Route size={48} />
                  <h4>No hiking tracks configured</h4>
                  <p>Create your first hiking track to define safe paths for hikers.</p>
                </div>
              ) : (
                tracks.map((track) => (
                  <div key={track.id} className="track-manager__item">
                    <div className="track-item">
                      <div className="track-item__indicator">
                        <div 
                          className="track-item__color-bar"
                          style={{ backgroundColor: track.color }}
                        />
                      </div>
                      
                      <div className="track-item__info">
                        <div className="track-item__header">
                          <h4>{track.name}</h4>
                          <span className={`track-item__status track-item__status--${track.enabled ? 'enabled' : 'disabled'}`}>
                            {track.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                        
                        <div className="track-item__details">
                          <span className="track-item__width">{track.width}m wide</span>
                          <span className="track-item__points">{track.points.length} points</span>
                          <span className="track-item__distance">{formatDistance(track)} long</span>
                        </div>
                      </div>
                      
                      <div className="track-item__actions">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(track)}
                          title="Edit track"
                        >
                          <Edit size={14} />
                        </Button>
                        
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(track.id, track.name)}
                          title="Delete track"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          /* Track Form */
          <div className="track-manager__form">
            <div className="track-form">
              <div className="track-form__header">
                <h3>
                  <Settings size={20} />
                  {editingTrack ? 'Edit Track' : 'Add New Track'}
                </h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCancelForm}
                >
                  Cancel
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="track-form__content">
                <div className="track-form__row">
                  <div className="track-form__field">
                    <label htmlFor="trackName">Track Name *</label>
                    <input
                      id="trackName"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter track name"
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="track-form__error">{errors.name}</span>}
                  </div>

                  <div className="track-form__field">
                    <label htmlFor="trackWidth">Track Width (meters)</label>
                    <input
                      id="trackWidth"
                      type="number"
                      min="1"
                      max="1000"
                      value={formData.width}
                      onChange={(e) => handleInputChange('width', e.target.value)}
                      className={errors.width ? 'error' : ''}
                    />
                    {errors.width && <span className="track-form__error">{errors.width}</span>}
                  </div>
                </div>

                <div className="track-form__row">
                  <div className="track-form__field">
                    <label htmlFor="trackColor">Track Color</label>
                    <input
                      id="trackColor"
                      type="color"
                      value={formData.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      className="track-form__color-input"
                    />
                  </div>

                  <div className="track-form__field">
                    <label className="track-form__checkbox">
                      <input
                        type="checkbox"
                        checked={formData.enabled}
                        onChange={(e) => handleInputChange('enabled', e.target.checked)}
                      />
                      <span>Enable track monitoring</span>
                    </label>
                  </div>
                </div>

                <div className="track-form__points">
                  <div className="track-form__points-header">
                    <label>Track Points</label>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={handleCreateOnMap}
                    >
                      <MapIcon size={14} />
                      Create on Map
                    </Button>
                  </div>
                  
                  <div className="track-form__points-info">
                    {formData.points.length === 0 ? (
                      <p>No points added. Use "Create on Map" to draw your hiking track.</p>
                    ) : (
                      <p>{formData.points.length} points added. Distance: {formatDistance({ points: formData.points } as SafetyTrack)}</p>
                    )}
                  </div>
                  
                  {errors.points && <span className="track-form__error">{errors.points}</span>}
                </div>

                <div className="track-form__actions">
                  <Button type="submit" variant="primary">
                    {editingTrack ? 'Update Track' : 'Add Track'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={handleCancelForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};