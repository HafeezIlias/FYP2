import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { ModalProps } from '../../../types';
import { Button } from '../Button';
import './Modal.css';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  className = '',
  style
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClass = `modal__content--${size}`;
  const contentClasses = `modal__content ${sizeClass} ${className}`.trim();

  return createPortal(
    <div className="modal" onClick={handleBackdropClick}>
      <div className={contentClasses} style={style}>
        <div className="modal__header">
          {title && <h3 className="modal__title">{title}</h3>}
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="modal__close"
            aria-label="Close modal"
          >
            <X size={18} />
          </Button>
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};