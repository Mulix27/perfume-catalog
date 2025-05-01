import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DesignerGrid from '../../components/DesignerGrid/DesignerGrid';
import NicheGrid from '../../components/NicheGrid/NicheGrid';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './Products.css';
import perfumesNicho from '../../assets/images/perfumes-nicho.png';
import perfumesDiseñador from '../../assets/images/perfume-dis.png';

const Products = () => {
  const { designer } = useParams();
  const navigate = useNavigate();

  const handleSelectDesigner = (designer) => {
    navigate(`/products/${designer}`);
  };

  const handleSelectCategory = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="products-page">
      {!designer ? (
        <>
          <h1 className="title">SELECCIONA UNA CATEGORÍA</h1>
          <div className="category-grid">
            <div className="category-card" onClick={() => handleSelectCategory('diseñador')}>
              <img src={perfumesDiseñador} alt="Logo de Smashes Store" />
              <h2>Perfumes de Diseñador</h2>
            </div>
            <div className="category-card" onClick={() => handleSelectCategory('nicho')}>
              <img src={perfumesNicho} alt="Logo de Smashes Store" />
              <h2>Perfumería Nicho</h2>
            </div>
          </div>
        </>
      ) : designer === 'diseñador' ? (
        <>
          <h1 className="title">SELECCIÓN POR DISEÑADOR</h1>
          <DesignerGrid onSelectDesigner={handleSelectDesigner} />
        </>
      ) : designer === 'nicho' ? (
        <>
          <h1 className="title">SELECCIÓN POR CASA NICHO</h1>
          <NicheGrid onSelectDesigner={handleSelectDesigner} />
        </>
      ) : (
        <>
          <h2 className="designer-title">{designer}</h2>
          <ProductGrid designer={designer} />
        </>
      )}
    </div>
  );
};

export default Products;
