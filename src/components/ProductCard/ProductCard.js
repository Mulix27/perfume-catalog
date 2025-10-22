import React, { useMemo, useState } from 'react';
import './ProductCard.css';

/**
 * Reemplaza con tu número de WhatsApp en formato internacional sin espacios:
 * MX: +52XXXXXXXXXX  -> escribe "521234567890" (sin + ni espacios)
 * Sugerencia: lee de env var: import.meta.env.VITE_WA_NUMBER o process.env.REACT_APP_WA_NUMBER
 */
const WHATSAPP_NUMBER = import.meta?.env?.VITE_WA_NUMBER || process.env.REACT_APP_WA_NUMBER || '529994982533'; // <- cámbialo

const ProductCard = ({ product }) => {
  if (!product) return <div>No product data available</div>;

  // Opcional: si hay varios tamaños, permite elegir uno
  const sizes = useMemo(() => (product.presentations ?? []).map(p => p.size).filter(Boolean), [product]);
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? null);

  const openWhatsApp = () => {
    const title   = product.name ?? '';
    const brand   = product.designer ?? '';
    const cat     = product.category ?? '';
    const sizeTxt = selectedSize ? `Tamaño: ${selectedSize} ml\n` : '';
    const msg =
`Hola 👋, me interesa este perfume:
Marca/Diseñador: ${brand}
Nombre: ${title}
${sizeTxt}Categoría: ${cat}

¿Me puedes dar más información y precio, por favor?`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
      </div>

      <h2 className="product-title">{product.name}</h2>
      {product.designer && <p className="product-designer">{product.designer}</p>}
      {product.description && <p className="product-desc">{product.description}</p>}

      {/* Elegante: mostramos tallas sin precio. Si solo hay una, omitimos el selector */}
      {!!sizes.length && (
        <div className="product-size-row">
          {sizes.length > 1 ? (
            <>
              <label htmlFor={`size-${product.id || product.name}`} className="size-label">Tamaño</label>
              <select
                id={`size-${product.id || product.name}`}
                className="size-select"
                value={selectedSize ?? ''}
                onChange={(e) => setSelectedSize(Number(e.target.value))}
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>{s} ml</option>
                ))}
              </select>
            </>
          ) : (
            <span className="size-chip">{sizes[0]} ml</span>
          )}
        </div>
      )}

      {product.category && <p className="product-category"><strong>Categoría:</strong> {product.category}</p>}

      {/* CTA principal */}
      <button
        type="button"
        className="btn-quote"
        onClick={openWhatsApp}
        aria-label={`Cotizar ${product.designer ?? ''} ${product.name ?? ''} en WhatsApp`}
      >
        Cotizar por WhatsApp
      </button>

      {/* Alternativa sutil */}
      <button
        type="button"
        className="btn-ghost"
        onClick={openWhatsApp}
        aria-label={`Más información de ${product.designer ?? ''} ${product.name ?? ''} en WhatsApp`}
      >
        Más información
      </button>
    </div>
  );
};

export default ProductCard;
