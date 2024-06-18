// scripts/interactiveScript.js
const inquirer = require('inquirer');
const db = require('./firebaseAdminConfig');
const fs = require('fs');
const path = require('path');

const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '¿Qué deseas hacer?',
      choices: [
        'Añadir un nuevo perfume',
        'Eliminar un perfume',
        'Actualizar un perfume',
        'Ver todos los perfumes',
        'Importar perfumes desde JSON',
        'Salir'
      ]
    }
  ]);

  switch (answers.action) {
    case 'Añadir un nuevo perfume':
      await addNewPerfume();
      break;
    case 'Eliminar un perfume':
      await deletePerfume();
      break;
    case 'Actualizar un perfume':
      await updatePerfume();
      break;
    case 'Ver todos los perfumes':
      await viewAllPerfumes();
      break;
    case 'Importar perfumes desde JSON':
      await importFromJson();
      break;
    case 'Salir':
      console.log('Saliendo...');
      process.exit();
      break;
  }

  mainMenu();
};

const addNewPerfume = async () => {
  const perfume = await inquirer.prompt([
    { name: 'id', message: 'ID del perfume:' },
    { name: 'name', message: 'Nombre del perfume:' },
    { name: 'designer', message: 'Diseñador:' },
    { name: 'description', message: 'Descripción:' },
    { name: 'category', message: 'Categoría (Caballero, Dama, Unisex):' },
    { name: 'image', message: 'URL de la imagen:' },
    { name: 'size50', message: 'Tamaño 50ml (Precio):' },
    { name: 'size100', message: 'Tamaño 100ml (Precio):' }
  ]);

  await db.collection('perfumes').doc(perfume.id).set({
    name: perfume.name,
    designer: perfume.designer,
    description: perfume.description,
    category: perfume.category,
    image: perfume.image,
    presentations: [
      { size: 50, price: parseFloat(perfume.size50) },
      { size: 100, price: parseFloat(perfume.size100) }
    ]
  });

  console.log('Perfume añadido exitosamente.');
};

const deletePerfume = async () => {
  const { id } = await inquirer.prompt([
    { name: 'id', message: 'ID del perfume a eliminar:' }
  ]);

  await db.collection('perfumes').doc(id).delete();

  console.log('Perfume eliminado exitosamente.');
};

const updatePerfume = async () => {
  const { id } = await inquirer.prompt([
    { name: 'id', message: 'ID del perfume a actualizar:' }
  ]);

  const perfume = await inquirer.prompt([
    { name: 'name', message: 'Nombre del perfume (deja en blanco para no cambiar):' },
    { name: 'designer', message: 'Diseñador (deja en blanco para no cambiar):' },
    { name: 'description', message: 'Descripción (deja en blanco para no cambiar):' },
    { name: 'category', message: 'Categoría (deja en blanco para no cambiar):' },
    { name: 'image', message: 'URL de la imagen (deja en blanco para no cambiar):' },
    { name: 'size50', message: 'Tamaño 50ml (Precio, deja en blanco para no cambiar):' },
    { name: 'size100', message: 'Tamaño 100ml (Precio, deja en blanco para no cambiar):' }
  ]);

  const docRef = db.collection('perfumes').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    console.log('El perfume no existe.');
    return;
  }

  const data = doc.data();
  await docRef.update({
    name: perfume.name || data.name,
    designer: perfume.designer || data.designer,
    description: perfume.description || data.description,
    category: perfume.category || data.category,
    image: perfume.image || data.image,
    presentations: [
      { size: 50, price: perfume.size50 ? parseFloat(perfume.size50) : data.presentations[0].price },
      { size: 100, price: perfume.size100 ? parseFloat(perfume.size100) : data.presentations[1].price }
    ]
  });

  console.log('Perfume actualizado exitosamente.');
};

const viewAllPerfumes = async () => {
  const perfumesSnapshot = await db.collection('perfumes').get();
  perfumesSnapshot.forEach(doc => {
    const data = doc.data();
    console.log(`${doc.id}: ${data.name} (${data.designer})`);
  });
};

const importFromJson = async () => {
  const { filePath } = await inquirer.prompt([
    { name: 'filePath', message: 'Ruta del archivo JSON con los perfumes:' }
  ]);

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const batch = db.batch();

    data.perfumes.forEach(perfume => {
      const docRef = db.collection('perfumes').doc(perfume.id);
      batch.set(docRef, perfume);
    });

    await batch.commit();
    console.log('Datos importados exitosamente a Firestore desde JSON.');
  } catch (error) {
    console.error('Error al importar datos desde JSON:', error);
  }
};

mainMenu();
