
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { Search, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const Menu: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Produtos mockados com imagens do Unsplash
  const products = [
    {
      id: '1',
      name: t('products.burger-classic'),
      description: t('products.burger-classic-desc'),
      price: 18.90,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      category: 'Hamburguers',
      rating: 4.8,
    },
    {
      id: '2',
      name: t('products.burger-bacon'),
      description: t('products.burger-bacon-desc'),
      price: 22.90,
      image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&h=300&fit=crop',
      category: 'Hamburguers',
      rating: 4.9,
    },
    {
      id: '3',
      name: t('products.burger-veggie'),
      description: t('products.burger-veggie-desc'),
      price: 19.90,
      image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop',
      category: 'Hamburguers',
      rating: 4.7,
    },
    {
      id: '4',
      name: t('products.fries'),
      description: t('products.fries-desc'),
      price: 12.90,
      image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=300&fit=crop',
      category: 'Acompanhamentos',
      rating: 4.6,
    },
    {
      id: '5',
      name: t('products.soda'),
      description: t('products.soda-desc'),
      price: 6.90,
      image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop',
      category: 'Bebidas',
      rating: 4.5,
    },
    {
      id: '6',
      name: t('products.juice'),
      description: t('products.juice-desc'),
      price: 8.90,
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
      category: 'Bebidas',
      rating: 4.8,
    },
  ];

  const categories = ['all', 'Hamburguers', 'Acompanhamentos', 'Bebidas'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-lato">
            {t('menu.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('menu.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category)}
                      size="sm"
                      className={`whitespace-nowrap ${
                        selectedCategory === category
                          ? 'bg-witer-red hover:bg-witer-red-dark'
                          : 'hover:bg-witer-red hover:text-white'
                      }`}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {category === 'all' ? 'Todos' : category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-xl mb-2">Nenhum produto encontrado</div>
                <p className="text-gray-500">Tente ajustar os filtros de busca.</p>
              </div>
            )}
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
