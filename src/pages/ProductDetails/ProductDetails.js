// src/pages/ProductDetails.js
import React from 'react';

const product = {
  // Aquí pondrías los detalles del producto seleccionado
};

function ProductDetails() {
  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <button>Contactar para comprar</button>
    </div>
  );
}

export default ProductDetails;
