// scripts/firebaseAdminConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json'); // Ajusta la ruta si es necesario

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
