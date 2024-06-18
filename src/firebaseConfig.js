// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB7ueM6bhex-C1eCnhIWO3nQhIj3fwQZbI",
  authDomain: "smashes-cat-perfumes.firebaseapp.com",
  projectId: "smashes-cat-perfumes",
  storageBucket: "smashes-cat-perfumes.appspot.com",
  messagingSenderId: "165792094863",
  appId: "1:165792094863:web:14822f914f03daaec8eefa"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener una instancia de Firestore
const db = getFirestore(app);

export { db };
