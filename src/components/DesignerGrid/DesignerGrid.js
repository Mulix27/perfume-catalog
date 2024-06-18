// src/components/DesignerGrid/DesignerGrid.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import DesignerCard from '../DesignerCard/DesignerCard';
import './DesignerGrid.css';

const DesignerGrid = ({ onSelectDesigner }) => {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'perfumes'));
        const designersList = [];
        querySnapshot.forEach(doc => {
          const designer = doc.data().designer;
          if (!designersList.includes(designer)) {
            designersList.push(designer);
          }
        });
        setDesigners(designersList);
      } catch (error) {
        console.error('Error fetching designers:', error);
        setError('Error fetching designers');
      } finally {
        setLoading(false);
      }
    };

    fetchDesigners();
  }, []);

  const getImagePath = (designer) => {
    // Normaliza el nombre del diseñador para que coincida con el nombre del archivo
    const normalizedDesigner = designer.toLowerCase().replace(/ /g, '_');

    // Intenta importar tanto png como jpg
    try {
      return require(`../../assets/images/designers/${normalizedDesigner}.png`);
    } catch (err) {
      try {
        return require(`../../assets/images/designers/${normalizedDesigner}.jpg`);
      } catch (err) {
        // Si no se encuentra, devuelve una imagen de respaldo
        return 'https://via.placeholder.com/150';
      }
    }
  };

  if (loading) {
    return <div>Loading designers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (designers.length === 0) {
    return <div>No designers found</div>;
  }

  return (
    <div className="designer-grid">
      {designers.map(designer => (
        <DesignerCard
          key={designer}
          designer={designer}
          image={getImagePath(designer)}
          onClick={() => onSelectDesigner(designer)}
        />
      ))}
    </div>
  );
};

export default DesignerGrid;
