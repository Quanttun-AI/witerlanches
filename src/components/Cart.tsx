
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Minus, Plus, Trash2, ShoppingBag, MapPin, Coffee } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Cart: React.FC = () => {
  const { t } = useLanguage();
  const { cart, updateQuantity, removeFromCart, getCartTotal, createOrder } = useCart();
  const [deliveryType, setDeliveryType] = useState<'table' | 'home'>('table');
  const [tableNumber, setTableNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSendOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de enviar o pedido.",
        variant: "destructive",
      });
      return;
    }

    if (deliveryType === 'table' && !tableNumber) {
      toast({
        title: "Mesa obrigatória",
        description: "Informe o número da mesa.",
        variant: "destructive",
      });
      return;
    }

    if (deliveryType === 'home' && !address) {
      toast({
        title: "Endereço obrigatório",
        description: "Informe o endereço de entrega.",
        variant: "destructive",
      });
      return;
    }

    createOrder(
      deliveryType,
      deliveryType === 'table' ? Number(tableNumber) : undefined,
      deliveryType === 'home' ? address : undefined
    );

    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi enviado com sucesso. Aguarde a confirmação.",
    });

    setTableNumber('');
    setAddress('');
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-500 mb-2">Carrinho vazio</h3>
        <p className="text-gray-400">Adicione deliciosos itens ao seu carrinho!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <ShoppingBag className="h-6 w-6 mr-2 text-witer-red" />
        {t('menu.cart')}
      </h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">{item.name}</h4>
              <p className="text-witer-red font-bold">R$ {item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-bold">{item.quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeFromCart(item.id)}
                className="h-8 w-8 p-0 ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>{t('menu.total')}:</span>
          <span className="text-witer-red">R$ {getCartTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 mb-4">Tipo de Entrega:</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={deliveryType === 'table' ? 'default' : 'outline'}
            onClick={() => setDeliveryType('table')}
            className={`p-4 h-auto flex-col space-y-2 ${
              deliveryType === 'table' ? 'bg-witer-red hover:bg-witer-red-dark' : ''
            }`}
          >
            <Coffee className="h-6 w-6" />
            <span className="text-sm">{t('menu.table-option')}</span>
          </Button>
          <Button
            variant={deliveryType === 'home' ? 'default' : 'outline'}
            onClick={() => setDeliveryType('home')}
            className={`p-4 h-auto flex-col space-y-2 ${
              deliveryType === 'home' ? 'bg-witer-red hover:bg-witer-red-dark' : ''
            }`}
          >
            <MapPin className="h-6 w-6" />
            <span className="text-sm">{t('menu.delivery-home')}</span>
          </Button>
        </div>
      </div>

      {/* Delivery Details */}
      {deliveryType === 'table' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('menu.table-number')}
          </label>
          <Input
            type="number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="Ex: 5"
            className="w-full"
          />
        </div>
      )}

      {deliveryType === 'home' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('menu.address')}
          </label>
          <Textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rua, número, bairro, cidade..."
            className="w-full"
            rows={3}
          />
        </div>
      )}

      {/* Send Order Button */}
      <Button
        onClick={handleSendOrder}
        className="w-full bg-gradient-to-r from-witer-red to-witer-red-dark hover:from-witer-red-dark hover:to-witer-red text-white font-bold py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-lg"
      >
        {t('menu.send-order')}
      </Button>
    </div>
  );
};

export default Cart;
