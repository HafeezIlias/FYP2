import React, { useState } from 'react';
import { Users, RadioTower, AlertTriangle, Battery } from 'lucide-react';
import { Hiker, Tower } from '../../../types';
import { SearchBox } from '../SearchBox';
import { StatCard } from '../StatCard';
import { HikerTracker } from '../../widgets/HikerTracker';
import './Sidebar.css';

interface SidebarProps {
  hikers: Hiker[];
  towers: Tower[];
  onHikerClick: (hiker: Hiker) => void;
  onTowerClick: (tower: Tower) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  hikers,
  towers,
  onHikerClick,
  onTowerClick,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'hikers' | 'towers'>('hikers');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on search query
  const filteredHikers = hikers.filter(hiker =>
    hiker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTowers = towers.filter(tower =>
    tower.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const stats = {
    totalHikers: hikers.length,
    sosCount: hikers.filter(h => h.sos && !h.sosHandled).length,
    totalTowers: towers.length,
    activeTowers: towers.filter(t => t.status === 'Active').length,
    lowBatteryCount: hikers.filter(h => h.battery < 20).length,
    criticalBatteryCount: hikers.filter(h => h.battery <= 5).length,
    averageBattery: hikers.length > 0 ? Math.round(hikers.reduce((sum, h) => sum + h.battery, 0) / hikers.length) : 0
  };

  const sidebarClasses = [
    'sidebar',
    className
  ].filter(Boolean).join(' ');

  return (
    <aside className={sidebarClasses}>
      {/* Search */}
      <div className="sidebar__search">
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={`Search ${activeTab}...`}
        />
      </div>

      {/* Tabs */}
      <div className="sidebar__tabs">
        <button
          className={`sidebar__tab ${activeTab === 'hikers' ? 'sidebar__tab--active' : ''}`}
          onClick={() => setActiveTab('hikers')}
        >
          <Users size={16} />
          Hikers
        </button>
        <button
          className={`sidebar__tab ${activeTab === 'towers' ? 'sidebar__tab--active' : ''}`}
          onClick={() => setActiveTab('towers')}
        >
          <RadioTower size={16} />
          Towers
        </button>
      </div>

      {/* Stats */}
      <div className="sidebar__stats">
        {activeTab === 'hikers' ? (
          <>
            <StatCard
              icon={<Users size={18} />}
              value={stats.totalHikers}
              label="Hikers"
              variant={stats.totalHikers > 0 ? 'success' : 'default'}
            />
            {stats.sosCount > 0 && (
              <StatCard
                icon={<AlertTriangle size={18} />}
                value={stats.sosCount}
                label="SOS"
                variant="danger"
              />
            )}
            {stats.lowBatteryCount > 0 && (
              <StatCard
                icon={<Battery size={18} />}
                value={stats.lowBatteryCount}
                label="Low Battery"
                variant="warning"
              />
            )}
            {stats.criticalBatteryCount > 0 && (
              <StatCard
                icon={<Battery size={18} />}
                value={stats.criticalBatteryCount}
                label="Critical"
                variant="danger"
              />
            )}
          </>
        ) : (
          <>
            <StatCard
              icon={<RadioTower size={18} />}
              value={stats.totalTowers}
              label="Towers"
              variant={stats.totalTowers > 0 ? 'success' : 'default'}
            />
            <StatCard
              icon={<span style={{ color: '#38A169' }}>●</span>}
              value={stats.activeTowers}
              label="Active"
              variant="success"
            />
          </>
        )}
      </div>

      {/* Content List */}
      <div className="sidebar__content">
        {activeTab === 'hikers' ? (
          <div className="sidebar__hiker-list">
            {filteredHikers.length === 0 ? (
              <div className="sidebar__empty-state">
                <Users size={48} />
                <p>No hikers found</p>
                {searchQuery && (
                  <small>Try adjusting your search terms</small>
                )}
              </div>
            ) : (
              filteredHikers.map(hiker => (
                <div
                  key={hiker.id}
                  onClick={() => onHikerClick(hiker)}
                  className="sidebar__hiker-item"
                >
                  <HikerTracker
                    hiker={hiker}
                    compact={true}
                    showActions={false}
                  />
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="sidebar__tower-list">
            {filteredTowers.length === 0 ? (
              <div className="sidebar__empty-state">
                <RadioTower size={48} />
                <p>No towers found</p>
                {searchQuery && (
                  <small>Try adjusting your search terms</small>
                )}
              </div>
            ) : (
              filteredTowers.map(tower => (
                <div
                  key={tower.id}
                  onClick={() => onTowerClick(tower)}
                  className="sidebar__tower-item"
                >
                  <div className="tower-card">
                    <div className="tower-card__header">
                      <div className="tower-card__icon">
                        <RadioTower size={16} />
                      </div>
                      <div className="tower-card__info">
                        <h4 className="tower-card__name">{tower.name}</h4>
                        <span className={`tower-card__status tower-card__status--${tower.status.toLowerCase()}`}>
                          {tower.status}
                        </span>
                      </div>
                    </div>
                    <div className="tower-card__details">
                      <div className="tower-card__detail">
                        <span className="tower-card__label">Type:</span>
                        <span className="tower-card__value">{tower.type}</span>
                      </div>
                      <div className="tower-card__detail">
                        <span className="tower-card__label">Range:</span>
                        <span className="tower-card__value">{tower.coverageRadius}m</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </aside>
  );
};