// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utility/api';
import toast from 'react-hot-toast';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);
   const [path, setPath] = useState('');

// cartItems
  const getCarts = async () => {

    try {
      setLoading(true);
      const response = await api.get('/getcart');
      // console.log(response.data);
      setCartItems(response.data.data);
      setPath(response.data.filepath);
      // console.log('getcart',setCartItems);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch cart items');
      setLoading(false);
    }
  };

  // Add product to cart
  const addToCart = async (productId,size, color) => {
    try {
      setLoading(true);
      const response = await api.post(`/addcart`,{
        productId: productId,
        size:size,
        color: color,
      });
      setCartItems(response.data.data);
      toast.success('Item added to cart');
      getCarts();
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  // Increase item quantity in cart
  const increaseQuantity = async (cartId) => {
    try {
        const response = await api.put(`/increase/${cartId}`)

        if (response.data.success) {
            toast.success("Cart updated");
            getCarts();
        } else {
            console.error(response.data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("only 10 products add in this cart");
    }
};


   const decreaseQuantity = async (cartId) => {
    try {
        const response = await api.put(`/decrease/${cartId}`);


        if (response.data.success) {
            toast.success("Cart updated");
            getCarts();
        } else {
            console.error(response.data.error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};


  // Remove item from cart
  const removeFromCart = async (cartId) => {
    try {
      const response = await api.delete(`/removecart/${cartId}`);
      setCartItems(response.data.data);
      toast.success('Item removed from cart');
      getCarts();
    } catch (error) {
      toast.error('Failed to remove item from cart');
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    try {
      const response = await api.delete(`/clearcart`);
      setCartItems(response.data.data);
      toast.success('Item removed from  cart');
      getCarts();
    } catch (error) {
      toast.success('Cart cleared');
    }
   
  };

  useEffect(()=>{
    getCarts()
  },[]);

  // Get the total number of items in the cart
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        path,
        cartItems,
        loading,
        getCarts,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getTotalCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export default CartContextProvider;
