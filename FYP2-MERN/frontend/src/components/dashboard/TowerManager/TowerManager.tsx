import React, { useState } from 'react';
import { Tower } from '../../../types';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { Plus, Edit, Trash2, Radio as TowerIcon, Settings } from 'lucide-react';
import './TowerManager.css';

interface TowerManagerProps {
  towers: Tower[];
  onAddTower: (tower: Omit<Tower, 'id'>) => void;
  onEditTower: (id: string, tower: Partial<Tower>) => void;
  onDeleteTower: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface TowerFormData {
  name: string;
  type: 'Tower' | 'Basecamp' | 'Relay';
  lat: string;
  lon: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  coverageRadius: string;
  signalStrength: string;
}

const initialFormData: TowerFormData = {
  name: '',
  type: 'Tower',
  lat: '',
  lon: '',
  status: 'Active',
  coverageRadius: '1000',
  signalStrength: '100'
};

export const TowerManager: React.FC<TowerManagerProps> = ({
  towers,
  onAddTower,
  onEditTower,
  onDeleteTower,
  isOpen,
  onClose
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTower, setEditingTower] = useState<Tower | null>(null);
  const [formData, setFormData] = useState<TowerFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<TowerFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<TowerFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tower name is required';
    }

    const lat = parseFloat(formData.lat);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.lat = 'Valid latitude between -90 and 90 is required';
    }

    const lon = parseFloat(formData.lon);
    if (isNaN(lon) || lon < -180 || lon > 180) {
      newErrors.lon = 'Valid longitude between -180 and 180 is required';
    }

    const radius = parseFloat(formData.coverageRadius);
    if (isNaN(radius) || radius <= 0 || radius > 50000) {
      newErrors.coverageRadius = 'Coverage radius must be between 1 and 50000 meters';
    }

    const signal = parseFloat(formData.signalStrength);
    if (isNaN(signal) || signal < 0 || signal > 100) {
      newErrors.signalStrength = 'Signal strength must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof TowerFormData, value: string) => {
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

    const towerData = {
      name: formData.name.trim(),
      type: formData.type,
      lat: parseFloat(formData.lat),
      lon: parseFloat(formData.lon),
      status: formData.status,
      coverageRadius: parseFloat(formData.coverageRadius),
      signalStrength: parseFloat(formData.signalStrength),
      lastUpdate: Date.now()
    };

    if (editingTower) {
      onEditTower(editingTower.id, towerData);
    } else {
      onAddTower(towerData);
    }

    handleCancelForm();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTower(null);
    setFormData(initialFormData);
    setErrors({});
  };

  const handleAddNew = () => {
    setEditingTower(null);
    setFormData(initialFormData);
    setShowForm(true);
  };

  const handleEdit = (tower: Tower) => {
    setEditingTower(tower);
    setFormData({
      name: tower.name,
      type: tower.type,
      lat: tower.lat.toString(),
      lon: tower.lon.toString(),
      status: tower.status,
      coverageRadius: tower.coverageRadius.toString(),
      signalStrength: tower.signalStrength.toString()
    });
    setShowForm(true);
  };

  const handleDelete = (towerId: string, towerName: string) => {
    if (window.confirm(`Are you sure you want to delete "${towerName}"?`)) {
      onDeleteTower(towerId);
    }
  };

  const getStatusColor = (status: Tower['status']) => {
    switch (status) {
      case 'Active': return '#38A169';
      case 'Inactive': return '#E53E3E';
      case 'Maintenance': return '#D69E2E';
      default: return '#718096';
    }
  };

  const getTowerIcon = (type: Tower['type']) => {
    switch (type) {
      case 'Tower': return 'fas fa-broadcast-tower';
      case 'Basecamp': return 'fas fa-campground';
      case 'Relay': return 'fas fa-wifi';
      default: return 'fas fa-broadcast-tower';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tower Management"
      size="lg"
      className="tower-manager"
    >
      <div className="tower-manager__content">
        {!showForm ? (
          <>
            {/* Tower List */}
            <div className="tower-manager__header">
              <h3>Communication Towers ({towers.length})</h3>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddNew}
              >
                <Plus size={16} />
                Add New Tower
              </Button>
            </div>

            <div className="tower-manager__list">
              {towers.length === 0 ? (
                <div className="tower-manager__empty">
                  <TowerIcon size={48} />
                  <h4>No towers configured</h4>
                  <p>Add your first communication tower to get started.</p>
                </div>
              ) : (
                towers.map((tower) => (
                  <div key={tower.id} className="tower-manager__item">
                    <div className="tower-item">
                      <div className="tower-item__icon">
                        <i 
                          className={getTowerIcon(tower.type)} 
                          style={{ color: getStatusColor(tower.status) }}
                        ></i>
                      </div>
                      
                      <div className="tower-item__info">
                        <div className="tower-item__header">
                          <h4>{tower.name}</h4>
                          <span className={`tower-item__status tower-item__status--${tower.status.toLowerCase()}`}>
                            {tower.status}
                          </span>
                        </div>
                        
                        <div className="tower-item__details">
                          <span className="tower-item__type">{tower.type}</span>
                          <span className="tower-item__location">
                            {tower.lat.toFixed(4)}, {tower.lon.toFixed(4)}
                          </span>
                          <span className="tower-item__coverage">
                            {(tower.coverageRadius / 1000).toFixed(1)}km range
                          </span>
                          <span className="tower-item__signal">
                            {tower.signalStrength}% signal
                          </span>
                        </div>
                      </div>
                      
                      <div className="tower-item__actions">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(tower)}
                          title="Edit tower"
                        >
                          <Edit size={14} />
                        </Button>
                        
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(tower.id, tower.name)}
                          title="Delete tower"
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
          /* Tower Form */
          <div className="tower-manager__form">
            <div className="tower-form">
              <div className="tower-form__header">
                <h3>
                  <Settings size={20} />
                  {editingTower ? 'Edit Tower' : 'Add New Tower'}
                </h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCancelForm}
                >
                  Cancel
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="tower-form__content">
                <div className="tower-form__row">
                  <div className="tower-form__field">
                    <label htmlFor="towerName">Tower Name *</label>
                    <input
                      id="towerName"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter tower name"
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="tower-form__error">{errors.name}</span>}
                  </div>

                  <div className="tower-form__field">
                    <label htmlFor="towerType">Type</label>
                    <select
                      id="towerType"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value as Tower['type'])}
                    >
                      <option value="Tower">Communication Tower</option>
                      <option value="Basecamp">Base Camp</option>
                      <option value="Relay">Relay Station</option>
                    </select>
                  </div>
                </div>

                <div className="tower-form__row">
                  <div className="tower-form__field">
                    <label htmlFor="towerLat">Latitude *</label>
                    <input
                      id="towerLat"
                      type="number"
                      step="any"
                      value={formData.lat}
                      onChange={(e) => handleInputChange('lat', e.target.value)}
                      placeholder="e.g. 3.1390"
                      className={errors.lat ? 'error' : ''}
                    />
                    {errors.lat && <span className="tower-form__error">{errors.lat}</span>}
                  </div>

                  <div className="tower-form__field">
                    <label htmlFor="towerLon">Longitude *</label>
                    <input
                      id="towerLon"
                      type="number"
                      step="any"
                      value={formData.lon}
                      onChange={(e) => handleInputChange('lon', e.target.value)}
                      placeholder="e.g. 101.6869"
                      className={errors.lon ? 'error' : ''}
                    />
                    {errors.lon && <span className="tower-form__error">{errors.lon}</span>}
                  </div>
                </div>

                <div className="tower-form__row">
                  <div className="tower-form__field">
                    <label htmlFor="towerStatus">Status</label>
                    <select
                      id="towerStatus"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value as Tower['status'])}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div className="tower-form__field">
                    <label htmlFor="towerSignal">Signal Strength (%)</label>
                    <input
                      id="towerSignal"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.signalStrength}
                      onChange={(e) => handleInputChange('signalStrength', e.target.value)}
                      className={errors.signalStrength ? 'error' : ''}
                    />
                    {errors.signalStrength && <span className="tower-form__error">{errors.signalStrength}</span>}
                  </div>
                </div>

                <div className="tower-form__row">
                  <div className="tower-form__field">
                    <label htmlFor="towerRange">Coverage Radius (meters)</label>
                    <input
                      id="towerRange"
                      type="number"
                      min="1"
                      max="50000"
                      value={formData.coverageRadius}
                      onChange={(e) => handleInputChange('coverageRadius', e.target.value)}
                      className={errors.coverageRadius ? 'error' : ''}
                    />
                    {errors.coverageRadius && <span className="tower-form__error">{errors.coverageRadius}</span>}
                  </div>
                </div>

                <div className="tower-form__actions">
                  <Button type="submit" variant="primary">
                    {editingTower ? 'Update Tower' : 'Add Tower'}
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