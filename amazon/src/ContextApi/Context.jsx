import React from "react";
import { useState, useEffect } from "react";
import CartContext from "./CartContext";

const Context = (props) => {
  const [open, setOpen] = useState(false);
  const [user_id, setUser_id] = useState(1); // Simple integer user_id
  const [productList, setProductList] = useState([]);
  const [qyt, setQyt] = useState();

  // Initialize - user_id is always 1 (demo session)
  useEffect(() => {
    setUser_id(1); // Fixed to integer
    console.log(' Context initialized with user_id: 1');
  }, []);

  const openButton = () => setOpen(true);
  const closeButton = () => setOpen(false);

  //  ADD TO CART (LOCAL STATE - simple and reliable)
  const addtoCart = (id, name, price, status, image) => {
    // Check if item already exists
    const existingItem = productList.find(item => item.id === id);
    
    if (existingItem) {
      // Item already in cart
      return;
    }
    
    const newItem = { id, name, price, status, image };
    setProductList((prevState) => [...prevState, newItem]);
  };

  //  REMOVE FROM CART
  const removeCart = (id) => {
    setProductList((prevState) => prevState.filter((item) => item.id !== id));
  };

  //  QUANTITY CHANGE
  const handleQytChange = (event) => {
    setQyt(event.target.value);
  };

  // Clear cart after order
  const clearCart = () => {
    setProductList([]);
  };

  return (
    <CartContext.Provider
      value={{
        open,
        openButton,
        closeButton,
        productList,
        addtoCart,
        removeCart,
        clearCart,
        user_id,
        handleQytChange,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default Context;