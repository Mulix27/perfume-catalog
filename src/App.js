import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Header se muestra en todas las páginas */}
        <Header />
        
        {/* Contenedor principal para el contenido de la página actual */}
        <div className="content">
          <Routes>
            {/* Ruta principal (Home) */}
            <Route path="/" element={<Home />} />
            
            {/* Página de productos */}
            <Route path="/products" element={<Products />} />
            
            {/* Página de contacto */}
            <Route path="/contact" element={<Contact />} />
            
            {/* Ruta dinámica para productos por diseñador */}
            <Route path="/products/:designer" element={<Products />} />
          </Routes>
        </div>
        
        {/* Footer se muestra en todas las páginas */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
