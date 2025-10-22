/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  collection, getDocs, limit, orderBy, query, startAt, endAt
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import DesignerGrid from '../../components/DesignerGrid/DesignerGrid';
import NicheGrid from '../../components/NicheGrid/NicheGrid';
import ProductGrid from '../../components/ProductGrid/ProductGrid';

import './Products.css';
import perfumesNicho from '../../assets/images/perfumes-nicho.png';
import perfumesDiseñador from '../../assets/images/perfume-dis.png';

const Products = () => {
  const { designer } = useParams();
  const navigate = useNavigate();

  // ---------- Buscador embebido ----------
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);

  // Caché local para fallback
  const [allPerfumes, setAllPerfumes] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  const debounced = useDebounce(term, 300);
  const boxRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const normalize = (s) =>
    (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  const ensureAllPerfumes = async () => {
    if (allLoaded) return;
    const snap = await getDocs(collection(db, 'perfumes'));
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setAllPerfumes(list);
    setAllLoaded(true);
  };

  useEffect(() => {
    const run = async () => {
      const t = debounced.trim();
      if (!t) {
        setResults([]);
        setOpen(false);
        return;
      }
      setLoading(true);
      try {
        const perfumesRef = collection(db, 'perfumes');
        let list = [];

        // Intento 1: nameLower (recomendado)
        try {
          const q1 = query(
            perfumesRef,
            orderBy('nameLower'),
            startAt(normalize(t)),
            endAt(normalize(t) + '\uf8ff'),
            limit(8)
          );
          const snap = await getDocs(q1);
          list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch { /* puede fallar si no existe el campo/índice */ }

        // Intento 2: designerLower
        if (!list.length) {
          try {
            const q2 = query(
              perfumesRef,
              orderBy('designerLower'),
              startAt(normalize(t)),
              endAt(normalize(t) + '\uf8ff'),
              limit(8)
            );
            const snap2 = await getDocs(q2);
            list = snap2.docs.map(d => ({ id: d.id, ...d.data() }));
          } catch { /* ignora */ }
        }

        // Fallback: buscar en memoria
        if (!list.length) {
          await ensureAllPerfumes();
          const tt = normalize(t);
          list = allPerfumes
            .filter(p =>
              normalize(p.name).includes(tt) ||
              normalize(p.designer).includes(tt)
            )
            .slice(0, 8);
        }

        setResults(list);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const onPick = (p) => {
    // Lleva a la página del diseñador con el id del perfume en ?p=
    navigate(`/products/${encodeURIComponent(p.designer)}?p=${encodeURIComponent(p.id)}`);
    setOpen(false);
    setTerm('');
  };

  const handleSelectDesigner = (designerName) => {
    navigate(`/products/${designerName}`);
  };

  const handleSelectCategory = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="products-page">
      {/* Buscador elegante arriba */}
      <div className="products-search" ref={boxRef}>
        <div className="search-input-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 20.49 21.49 19 15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"/>
          </svg>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Busca por nombre o diseñador…"
            onFocus={() => results.length && setOpen(true)}
            aria-label="Buscar perfumes"
          />
          {loading && <div className="spinner" aria-hidden="true" />}
        </div>

        {open && results.length > 0 && (
          <div className="search-results">
            {results.map(r => (
              <button
                key={r.id}
                className="result-item"
                onClick={() => onPick(r)}
                title={`${r.designer} • ${r.name}`}
              >
                {r.image && <img src={r.image} alt="" loading="lazy" />}
                <div className="result-text">
                  <div className="result-name">{r.name}</div>
                  <div className="result-designer">{r.designer}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {open && !loading && results.length === 0 && (
          <div className="search-results empty">Sin resultados</div>
        )}
      </div>

      {/* Contenido principal */}
      {!designer ? (
        <>
          <h1 className="title">SELECCIONA UNA CATEGORÍA</h1>
          <div className="category-grid">
            <div className="category-card" onClick={() => handleSelectCategory('diseñador')}>
              <img src={perfumesDiseñador} alt="Perfumes de diseñador" />
              <h2>Perfumes de Diseñador</h2>
            </div>
            <div className="category-card" onClick={() => handleSelectCategory('nicho')}>
              <img src={perfumesNicho} alt="Perfumería nicho" />
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

/* ---------- utils locales ---------- */
function useDebounce(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return useMemo(() => v, [v]);
}

function useQueryParam(key) {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search).get(key), [search, key]);
}
