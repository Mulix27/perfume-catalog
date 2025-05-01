import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import DesignerCard from '../DesignerCard/DesignerCard';
import Loader from '../Loader/Loader';
import nicheImages from '../../assets/images/nicheImages';
import './NicheGrid.css';

const NicheGrid = ({ onSelectDesigner }) => {
  const [nicheDesigners, setNicheDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNicheDesigners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'perfumes'));
        const designersList = [];
        querySnapshot.forEach(doc => {
          const designer = doc.data().designer.toLowerCase().trim();
          if (Object.keys(nicheImages).includes(designer) && !designersList.includes(designer)) {
            designersList.push(designer);
          }
        });

        // Solo actualiza el estado si hay cambios
        if (JSON.stringify(nicheDesigners) !== JSON.stringify(designersList)) {
          setNicheDesigners(designersList);
        }
      } catch (error) {
        console.error('Error fetching niche designers:', error);
        setError('Error al cargar casas nicho.');
      } finally {
        setLoading(false);
      }
    };

    fetchNicheDesigners();
  }, [nicheDesigners]);

  const getImagePath = (designer) => {
    const normalizedDesigner = designer.toLowerCase().replace(/ /g, '_');
    try {
      return require(`../../assets/images/niche/${normalizedDesigner}.png`);
    } catch (err) {
      try {
        return require(`../../assets/images/niche/${normalizedDesigner}.jpg`);
      } catch (err) {
        return 'https://via.placeholder.com/150';
      }
    }
  };
  

  if (loading) {
    return <Loader message="Cargando casas nicho..." />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="niche-grid">
      {nicheDesigners.map(designer => (
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

export default NicheGrid;
