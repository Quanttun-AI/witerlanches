
import React, { useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import Menu from './Menu';
import About from './About';
import Control from './Control';

const Index: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToMenu = () => {
    setCurrentPage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigateToMenu={handleNavigateToMenu} />;
      case 'menu':
        return <Menu />;
      case 'about':
        return <About />;
      case 'control':
        return <Control />;
      default:
        return <Home onNavigateToMenu={handleNavigateToMenu} />;
    }
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
          <main className="relative">
            {renderPage()}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
};

export default Index;
