
import React, { useState } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Menu, X, ShoppingCart, Globe } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { cart } = useCart();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const navigation = [
    { key: 'home', label: t('nav.home') },
    { key: 'menu', label: t('nav.menu') },
    { key: 'about', label: t('nav.about') },
    { key: 'control', label: t('nav.control') },
  ];

  return (
    <header className="bg-gradient-to-r from-witer-red to-witer-red-dark shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <img 
              src="/lovable-uploads/da82f170-3dac-4079-a2f6-51816b746c72.png" 
              alt="WITER LANCHES Logo" 
              className="h-12 w-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
            />
            <h1 className="text-2xl font-bold text-white font-lato">WITER LANCHES</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`text-white hover:text-witer-yellow transition-colors duration-300 font-medium ${
                  currentPage === item.key ? 'text-witer-yellow border-b-2 border-witer-yellow' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="text-white hover:text-witer-yellow hover:bg-witer-red-dark"
              >
                <Globe className="h-5 w-5 mr-1" />
                {languages.find(l => l.code === language)?.flag}
              </Button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                        language === lang.code ? 'bg-witer-red text-white' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Icon */}
            {currentPage === 'menu' && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-witer-yellow hover:bg-witer-red-dark"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-witer-yellow text-witer-red text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-witer-yellow hover:bg-witer-red-dark"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left py-2 px-4 text-white hover:text-witer-yellow transition-colors duration-300 rounded-md ${
                    currentPage === item.key ? 'bg-witer-red-dark text-witer-yellow' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Close dropdowns when clicking outside */}
      {(isLanguageOpen || isMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsLanguageOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
