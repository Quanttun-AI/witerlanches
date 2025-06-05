
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryType: 'table' | 'home';
  tableNumber?: number;
  address?: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'rejected';
  rejectionReason?: string;
}

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  createOrder: (deliveryType: 'table' | 'home', tableNumber?: number, address?: string) => void;
  updateOrderStatus: (orderId: string, status: 'accepted' | 'rejected', rejectionReason?: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const createOrder = (deliveryType: 'table' | 'home', tableNumber?: number, address?: string) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...cart],
      total: getCartTotal(),
      deliveryType,
      tableNumber,
      address,
      timestamp: new Date(),
      status: 'pending'
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: 'accepted' | 'rejected', rejectionReason?: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status, rejectionReason }
          : order
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cart,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      createOrder,
      updateOrderStatus
    }}>
      {children}
    </CartContext.Provider>
  );
};
