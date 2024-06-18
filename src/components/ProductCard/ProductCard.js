// src/components/ProductCard/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>No product data available</div>;
  }

  console.log('Rendering product:', product);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p>{product.designer}</p>
      <p>{product.description}</p>
      <ul>
        {product.presentations.map((presentation, index) => (
          <li key={index}>
            {presentation.size} ml - ${presentation.price}
          </li>
        ))}
      </ul>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductCard;
