import React, { useState, useEffect } from "react";

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const STORAGE_KEY = "shopping-cart";

  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantity) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) => (i.id ? { ...i, quantity: i.quantity + 1 } : 1));
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const getCartItem = (itemId) => {
    return cartItems.find((item) => item.id === itemId);
  };

  const getTotalItem = cartItems.reduce((sum, item) => 
    sum + item.quantity, 0
  );

  

  return {addToCart, getCartItem, cartItems, getTotalItem}
}
