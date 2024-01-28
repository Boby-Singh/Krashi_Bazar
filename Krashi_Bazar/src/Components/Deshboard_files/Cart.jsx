import React, { createContext, useEffect, useState } from 'react'
import './Cart.css'
import axios from 'axios'
import Contextcart from './Contextcart';
export const cartcontext = createContext();
const Cart = () => {
  const [Item, setItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  axios.defaults.withCredentials= true;
  const calculateTotalValues = (items) => {
    const calculatedTotalAmount = items.reduce((total, item) => total + item.price * item.quantity_in_stock, 0);
    const calculatedTotalItems = items.reduce((total, item) => total + item.quantity_in_stock, 0);
    setTotalAmount(calculatedTotalAmount);
    setTotalItems(calculatedTotalItems);
  };

  const incrementQuantity = (cart_id) => {
    setItem((cart) => {
      return cart.map((item) => (cart_id === item.cart_id ? { ...item, quantity_in_stock: item.quantity_in_stock + (item.quantity_in_stock < 10 ?1:0) } : item));
    });
    updateProductQuantity(cart_id, 'inc')
  };
  
  const decrementQuantity = (cart_id) => {
    setItem((cart) => {
      return cart.map((item) => (cart_id === item.cart_id ? { ...item, quantity_in_stock: item.quantity_in_stock - (item.quantity_in_stock > 1 ?1:0) } : item));
    });
    updateProductQuantity(cart_id, 'dec')
  };

  const deleteCartItem = (cart_id) => {
    axios.delete(`http://localhost:3000/user/deleteCartItem/${cart_id}`)
      .then((res) => {
        const updatedCart = Item.filter(item => item.cart_id !== cart_id);
        setItem(updatedCart);
        calculateTotalValues(updatedCart);
      })
      .catch(err => console.error('Error deleting product:', err));
  };

  const updateProductQuantity = (cart_Id, newQuantity) => {
    axios.put(`http://localhost:3000/user/updateCart/${cart_Id}`, { quantity: newQuantity }, { withCredentials: true })
      .then((res) => {
        const updatedCart = Item.map(item => {
          if (item.cart_id === cart_Id) {
            let updatedQuantity;
            if (newQuantity === 'inc') {
              updatedQuantity = item.quantity_in_stock + 1;
            } else if (newQuantity === 'dec') {
              updatedQuantity = item.quantity_in_stock - 1;
            } else {
              updatedQuantity = item.quantity_in_stock;
            }  
            return { ...item, quantity_in_stock: updatedQuantity };
          }
          return item;
        });

        setItem(updatedCart);
        calculateTotalValues(updatedCart);
      })
      .catch(err => console.error('Error updating product quantity:', err));
  };
  


  useEffect(()=>{
    axios.get('http://localhost:3000/user/myCart', {
      withCredentials: true,
    })
    .then(res =>{
      setItem(res.data.data)
      calculateTotalValues(res.data.data);
    }).catch(err => console.log({Error:'data fatching error'}));
},[]);
 

  return (
    <cartcontext.Provider value={{Item, totalAmount,totalItems, incrementQuantity, decrementQuantity, deleteCartItem}}>
      <Contextcart/>
    </cartcontext.Provider>
  );
}

export default Cart