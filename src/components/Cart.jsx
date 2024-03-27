import React, { useState } from "react";
import CartItem from "./CartItem";
import styled from "styled-components";
import { Box, Button, Drawer } from "@mui/material";
import useCartStore from "../store/useCartStore";
import "../style/essential.css";

const Cart = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const allCartStoreItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);


  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);

  return (
    <Drawer anchor="right" open={isCartOpen}>
      <Box className="cart_drawer">
        <h2 style={{ marginTop: "70px" }}>Your Cart</h2>
        {allCartStoreItems.length === 0 ? <p>No items in cart.</p> : null}
        {allCartStoreItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
        <h2>Total: ${calculateTotal(allCartStoreItems).toFixed(2)}</h2>
      </Box>
    </Drawer>
  );
};

export default Cart;
