import React from 'react';
import { X } from 'lucide-react';

// A simple reusable modal overlay with smooth fade‑in/out animation.
// Usage: <Modal onClose={handleClose}> <YourContent/> </Modal>
import './Modal.css';
import { useEffect } from 'react';

const Modal = ({ onClose, children, title }) => {
  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="modal-backdrop" onClick={onClose} style={backdropStyle}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={contentStyle}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            style={closeButtonStyle}
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// Inline styles keep the design self‑contained and avoid extra CSS files.
const backdropStyle = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  animation: 'fadeIn 0.3s ease-out',
};

const contentStyle = {
  background: '#fff',
  color: '#222',
  borderRadius: '12px',
  maxWidth: '90%',
  maxHeight: '85vh',
  padding: '0',
  overflowY: 'auto',
  position: 'relative',
  boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
  animation: 'scaleIn 0.25s ease-out',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '12px',
  right: '12px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--text-muted, #666)',
};

export default Modal;
