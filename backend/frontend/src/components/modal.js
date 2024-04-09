import React from 'react';
import '../App.css'; // Adjust the path if your App.css is in a different location

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
