import React from 'react';
import { BaseComponentProps } from '../../../types';
import './StatCard.css';

interface StatCardProps extends BaseComponentProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'danger' | 'warning' | 'success';
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  trend,
  variant = 'default',
  loading = false,
  className = '',
  style,
  children
}) => {
  const cardClasses = [
    'stat-card',
    `stat-card--${variant}`,
    loading ? 'stat-card--loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} style={style}>
      <div className="stat-card__content">
        <div className="stat-card__icon">
          {loading ? (
            <div className="stat-card__skeleton stat-card__skeleton--icon"></div>
          ) : (
            icon
          )}
        </div>
        <div className="stat-card__info">
          {loading ? (
            <>
              <div className="stat-card__skeleton stat-card__skeleton--value"></div>
              <div className="stat-card__skeleton stat-card__skeleton--label"></div>
            </>
          ) : (
            <>
              <span className="stat-card__value">{value}</span>
              <span className="stat-card__label">{label}</span>
            </>
          )}
        </div>
        {trend && !loading && (
          <div className={`stat-card__trend ${trend.isPositive ? 'stat-card__trend--positive' : 'stat-card__trend--negative'}`}>
            {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      {children && (
        <div className="stat-card__extra">
          {children}
        </div>
      )}
    </div>
  );
};