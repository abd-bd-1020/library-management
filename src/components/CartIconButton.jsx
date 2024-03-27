import React from "react";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useCartStore from "../store/useCartStore";

const CartIconButton = ({ toggleCart }) => {
  const cartItemsCount = useCartStore((state) => state.cartItems.length);

  return (
    <IconButton style={{height : "40px"}} color="inherit" onClick={toggleCart}>
      <div style={{ position: "relative",height : "24px" }}>
        <ShoppingCartIcon />
        {cartItemsCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              background: "red",
              borderRadius: "50%",
              padding: "2px 5px",
              fontSize: "0.8rem",
              color: "white",
            }}
          >
            {cartItemsCount}
          </span>
        )}
      </div>
    </IconButton>
  );
};

export default CartIconButton;
