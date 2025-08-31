import React from 'react';
import { ButtonProps } from '../../../types';
import './Button.css';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  title,
  className = '',
  style,
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const disabledClass = disabled ? 'btn--disabled' : '';
  const loadingClass = loading ? 'btn--loading' : '';

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    disabledClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      title={title}
      style={style}
      {...props}
    >
      {loading && <span className="btn__spinner"></span>}
      {children}
    </button>
  );
};