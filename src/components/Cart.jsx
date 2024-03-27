import React, { useState } from "react";
import CartItem from "./CartItem";
import { Box, Button, ClickAwayListener, Drawer } from "@mui/material";
import useCartStore from "../store/useCartStore";
import "../style/essential.css";

const Cart = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const allCartStoreItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const toggleCart = useCartStore((state) => state.toggleCart);



  return (

    <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
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
      </Box>
    </Drawer>
  );
};

export default Cart;