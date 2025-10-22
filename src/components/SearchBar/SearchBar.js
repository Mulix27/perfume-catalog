import React, { useEffect, useMemo, useRef, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, startAt, endAt } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const MAX_RESULTS = 8;

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef(null);
  const debounced = useDebounce(term, 300);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

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

        // --- Preferido: usar nameLower ---
        let list = [];
        try {
          const q1 = query(
            perfumesRef,
            orderBy('nameLower'),
            startAt(t.toLowerCase()),
            endAt(t.toLowerCase() + '\uf8ff'),
            limit(MAX_RESULTS)
          );
          const snap = await getDocs(q1);
          list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (_) {
          // Fallback: descarga un pequeño set (no ideal) y filtra en cliente
          const snap = await getDocs(query(perfumesRef, limit(50)));
          const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          const tt = t.toLowerCase();
          list = all
            .filter(p =>
              (p.name || '').toLowerCase().includes(tt) ||
              (p.designer || '').toLowerCase().includes(tt)
            )
            .slice(0, MAX_RESULTS);
        }

        setResults(list);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [debounced]);

  const onPick = (p) => {
    // Navega al diseñador y manda el id del perfume como query param `p`
    navigate(`/designer/${encodeURIComponent(p.designer) }?p=${encodeURIComponent(p.id)}`);
    setOpen(false);
    setTerm('');
  };

  return (
    <div className="searchbar" ref={boxRef}>
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
        <div className="results">
          {results.map((r) => (
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
        <div className="results empty">Sin resultados</div>
      )}
    </div>
  );
};

export default SearchBar;

/* ------- util: debounce ------- */
function useDebounce(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return useMemo(() => v, [v]);
}
