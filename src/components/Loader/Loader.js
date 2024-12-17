import React from 'react';
import './Loader.css';

const Loader = ({ message = 'Cargando...' }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loader;
