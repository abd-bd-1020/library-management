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

  const [open, setOpen] = useState(true);
  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);

  return (
    <Drawer anchor="right" open={isCartOpen}>
      <Wrapper>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? <p>No items in cart.</p> : null}
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      </Wrapper>
      <Button onClick={() => setOpen(false)}>Close Cart</Button>
    </Drawer>
  );
};

export default Cart;
