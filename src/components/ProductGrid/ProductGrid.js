import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Loader from '../Loader/Loader';
import './ProductGrid.css';

// Cambia por tu número en formato internacional sin "+" ni espacios (ej: 529994982533)
const WHATSAPP_NUMBER = process.env.REACT_APP_WA_NUMBER || '529994982533';

const ProductGrid = ({ designer }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Tamaño elegido por producto: { [productId]: number }
  const [selectedSizes, setSelectedSizes] = useState({});

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

        // Preseleccionar primer tamaño por producto
        const initial = {};
        productsList.forEach(p => {
          const sizes = (p.presentations ?? []).map(x => x.size).filter(Boolean);
          if (sizes.length) initial[p.id] = sizes[0];
        });
        setSelectedSizes(initial);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [designer]);

  const handleSizeChange = (productId, value) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: Number(value) }));
  };

  const openWhatsApp = (product) => {
    const size = selectedSizes[product.id];
    const msg =
`Hola 👋, me interesa este perfume:
Marca/Diseñador: ${product.designer ?? ''}
Nombre: ${product.name ?? ''}
${size ? `Tamaño: ${size} ml\n` : ''}Categoría: ${product.category ?? ''}

¿Me puedes dar más información y precio, por favor?`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return <Loader message={`Cargando perfumes de ${designer}...`} />;
  }

  return (
    <div className="product-grid">
      {products.map(product => {
        // Derivar tallas disponibles sin hooks dentro del map
        const sizes = (product.presentations ?? []).map(p => p.size).filter(Boolean);
        const hasMultipleSizes = sizes.length > 1;
        const onlySize = sizes[0];

        return (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            {product.description && <p className="description">{product.description}</p>}

            {/* Tamaños sin precio */}
            {!!sizes.length && (
              <div className="size-row">
                {hasMultipleSizes ? (
                  <>
                    <label htmlFor={`size-${product.id}`} className="size-label">Tamaño</label>
                    <select
                      id={`size-${product.id}`}
                      className="size-select"
                      value={selectedSizes[product.id] ?? sizes[0]}
                      onChange={(e) => handleSizeChange(product.id, e.target.value)}
                    >
                      {sizes.map((s) => (
                        <option key={s} value={s}>{s} ml</option>
                      ))}
                    </select>
                  </>
                ) : (
                  <span className="size-chip">{onlySize} ml</span>
                )}
              </div>
            )}

            <p className="category">Categoría: {product.category}</p>

            {/* CTA premium único */}
            <button
              type="button"
              className="btn-cta btn-wa"
              onClick={() => openWhatsApp(product)}
              aria-label={`Cotizar ${product.name} por WhatsApp`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .2 5.3.2 11.86c0 2.09.54 4.07 1.56 5.86L0 24l6.45-1.7a11.7 11.7 0 0 0 5.61 1.44h.01c6.55 0 11.86-5.3 11.86-11.86 0-3.17-1.23-6.15-3.47-8.4ZM12.07 21.1h-.01a9.23 9.23 0 0 1-4.7-1.28l-.34-.2-3.83 1L4.3 16.9l-.22-.36a9.26 9.26 0 1 1 8 4.57Zm5.33-6.91c-.29-.15-1.72-.85-1.98-.95-.27-.1-.47-.15-.67.15-.2.29-.77.95-.95 1.15-.18.2-.35.22-.64.07-.29-.15-1.2-.44-2.3-1.41-.85-.75-1.42-1.67-1.58-1.96-.16-.29-.02-.45.13-.6.14-.14.29-.35.44-.53.15-.18.2-.29.29-.49.1-.2.05-.37-.02-.53-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.35Z"/>
              </svg>
              Cotizar por WhatsApp
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
