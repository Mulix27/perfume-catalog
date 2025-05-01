import React from 'react';
import './DesignerCard.css';

const DesignerCard = ({ designer, image, onClick }) => {
  return (
    <div className="designer-card" onClick={onClick}>
      <img src={image} alt={designer} className="designer-image transparent-background" />
      <p className="designer-name">{designer}</p>
    </div>
  );
};

export default DesignerCard;
