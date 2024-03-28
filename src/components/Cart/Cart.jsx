import React, { useState } from "react";
import CartItem from "./CartItem";
import { Box, Button, ClickAwayListener, Drawer } from "@mui/material";
import useCartStore from "../../store/useCartStore";
import "../../style/essential.css";
import BorrowService from "../../services/BorrowService";
import Swal from "sweetalert2";

const Cart = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const allCartStoreItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const removeAllFromCart = useCartStore((state) => state.removeAllFromCart);

  const toggleCart = useCartStore((state) => state.toggleCart);
  const handleConfirmBooks = async () => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    if (allCartStoreItems.length === 0) return;

    const payload = {
      books: allCartStoreItems,
      email: currentUserData.email,
    };
    const response = await BorrowService.instance.requestBorrowBooks(payload);
    if (response.status) {
      removeAllFromCart();
      toggleCart();
      Swal.fire({
        title: "Success",
        text: "Borrow request is sent successfully",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

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
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmBooks}
          style={{ width: "100%", justifyContent: "center", marginTop: "30px" }}
        >
          Confirm Books
        </Button>
      </Box>
    </Drawer>
  );
};

export default Cart;
