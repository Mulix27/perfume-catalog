// src/components/Filters/Filters.js
import React from 'react';
import './Filters.css';

const Filters = ({ onFilterChange }) => {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filters">
      <label>
        Marca:
        <select name="brand" onChange={handleFilterChange}>
          <option value="">Todas</option>
          <option value="Dior">Dior</option>
          <option value="Chanel">Chanel</option>
        </select>
      </label>
      <label>
        Disponibilidad:
        <select name="availability" onChange={handleFilterChange}>
          <option value="">Todas</option>
          <option value="available">Disponible</option>
          <option value="unavailable">No Disponible</option>
        </select>
      </label>
      <label>
        Precio:
        <select name="price" onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="low-high">Menor a Mayor</option>
          <option value="high-low">Mayor a Menor</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
