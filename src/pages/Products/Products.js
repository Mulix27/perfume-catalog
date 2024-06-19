// src/pages/Products.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DesignerGrid from '../../components/DesignerGrid/DesignerGrid';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './Products.css';

const Products = () => {
  const { designer } = useParams();
  const navigate = useNavigate();

  const handleSelectDesigner = (designer) => {
    navigate(`/products/${designer}`);
  };

  return (
    <div className="products-page">
      <h1 className="title">Perfumes por Diseñador</h1>
      {designer ? (
        <>
          <h2 className="designer-title">Perfumes de {designer}</h2>
          <ProductGrid designer={designer} />
        </>
      ) : (
        <DesignerGrid onSelectDesigner={handleSelectDesigner} />
      )}
    </div>
  );
};

export default Products;
