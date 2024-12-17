import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Loader from '../Loader/Loader';
import './ProductGrid.css';

const ProductGrid = ({ designer }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'perfumes'), where('designer', '==', designer));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [designer]);

  if (loading) {
    return <Loader message={`Cargando perfumes de ${designer}...`} />;
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p className="description">{product.description}</p>
          <p className="price">
            {product.presentations.map((p, index) => (
              <span key={index}>
                {p.size} ml - ${p.price}
                {index < product.presentations.length - 1 && <br />}
              </span>
            ))}
          </p>
          <p className="category">Categoría: {product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
