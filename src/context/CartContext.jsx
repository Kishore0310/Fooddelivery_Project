import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const addToCart = (item, restaurantId, restaurantName) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.id === item.id && cartItem.restaurantId === restaurantId
      );
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id && cartItem.restaurantId === restaurantId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return [...prevCart, { ...item, quantity: 1, restaurantId, restaurantName }];
    });
  };
  
  const removeFromCart = (itemId, restaurantId) => {
    setCart(prevCart => {
      const item = prevCart.find(
        cartItem => cartItem.id === itemId && cartItem.restaurantId === restaurantId
      );
      
      if (item && item.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId && cartItem.restaurantId === restaurantId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      
      return prevCart.filter(
        cartItem => !(cartItem.id === itemId && cartItem.restaurantId === restaurantId)
      );
    });
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
