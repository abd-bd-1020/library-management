import React, { useState } from "react";
import CartItem from "./CartItem";
import styled from "styled-components";
import { Button, Drawer } from "@mui/material";
import useCartStore from "../store/useCartStore";

const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;
`;

const Cart = ({ cartItems, addToCart, removeFromCart }) => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const allCartStoreItems = useCartStore((state) => state.cartItems);

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);

  return (
    <Drawer anchor="right" open={isCartOpen}>
      <Wrapper>
        <h2>Your Cart</h2>
        <h2>Your Cart</h2>
        {allCartStoreItems.length === 0 ? <p>No items in cart.</p> : null}
        {allCartStoreItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      </Wrapper>
    </Drawer>
  );
};

export default Cart;
