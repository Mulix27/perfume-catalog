// scripts/importData.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json'); // Ajusta la ruta si es necesario
const data = require('../public/data/perfumes.json'); // Asegúrate de que la ruta al archivo JSON es correcta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const importData = async () => {
  const batch = db.batch();

  data.perfumes.forEach(perfume => {
    const docRef = db.collection('perfumes').doc(perfume.id);
    batch.set(docRef, perfume);
  });

  await batch.commit();
  console.log('Datos importados exitosamente a Firestore');
};

importData().catch(console.error);
