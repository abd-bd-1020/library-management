import { Box, Button, Paper } from "@mui/material";
import React from "react";
import "../style/essential.css";



const StyledButton = {
  height: "28px",
  width: "28px",
  background: "unset",
  border: "1px solid black",
  color: "black",
  padding: "unset",
  borderRadius: "unset",
  margin: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "100",
  fontSize: "16px",
  backgroundColor: "rgb(240, 240, 240)",
  borderColor: "rgb(230, 230, 230)",
};

const StyledButtonWrapper = {
  display: "flex",
  justifyContent: "space-between",
  maxHeight: "28px",
  width: "100px",
  marginLeft: "auto",
  alignItems: "center",
};

const CartItem = ({ item, addToCart, removeFromCart }) => {
  return (
    <Box className = "custom_cart_item">
      <Paper sx={{ display: "flex", gap: "20px", padding: "10px" }}>
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          style={{
            height: "140px",
            width: "100px",
            maxWidth: "100px",
            margin: "unset",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "spaceBetween",
          }}
        >
          <div>
            <h3 style={{ margin: "unset" }}>{item.title}</h3>
            <p style={{ margin: "unset" }}>Genre: {item.genre}</p>
            {/* <p style={{ margin: "unset" }}>Total: ${item.count.toFixed(2)}</p> */}
          </div>
          <div className="buttons" style={StyledButtonWrapper}>
            <button
              size="small"
              variant="contained"
              onClick={() => removeFromCart(item._id)}
              style={StyledButton}
            >
              -
            </button>
            <p
              style={{
                margin: "unset",
                lineHeight: "normal",
                height: "fitContent",
              }}
            >
              {item.amount}
            </p>
            <button
              size="small"
              
              variant="contained"
              onClick={() => addToCart(item)}
              style={StyledButton}
            >
              +
            </button>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default CartItem;
