
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Plus, Star } from 'lucide-react';
import { toast } from '../hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
      duration: 2000,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-witer-red text-white px-3 py-1 rounded-full text-sm font-bold">
          R$ {product.price.toFixed(2)}
        </div>
        {/* Rating */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
          <Star className="h-4 w-4 text-witer-yellow fill-current" />
          <span className="text-sm font-bold text-gray-800">{product.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-witer-red transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {product.description}
        </p>
        
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block bg-witer-yellow/20 text-witer-red-dark px-3 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-witer-red to-witer-red-dark hover:from-witer-red-dark hover:to-witer-red text-white font-bold py-3 rounded-xl group/btn transition-all duration-300 hover:shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2 group-hover/btn:rotate-180 transition-transform duration-300" />
          {t('menu.add-to-cart')}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
