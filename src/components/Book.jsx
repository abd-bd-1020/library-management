import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const StyledTitle = {
  fontFamily: "Lato, sans-serif, SiyamRupali",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "1.4",
  marginBottom: "4px",
  textAlign: "center",
  boxSizing: "border-box",
};
const StyledSubTitle = {
  fontFamily: "Lato, sans-serif, SiyamRupali",
  color: "#666",
  fontSize: "13px",
  marginBottom: "0",
  textAlign: "center",
};
const StyledPrice = {
  fontFamily: "Lato, sans-serif",
  fontSize: "15px",
  fontWeight: "700",
  marginBottom: "12px",
  textAlign: "center",
};

function Book({ book, onOpenModal }) {
  if (!book) {
    return null; // or handle the case where book is undefined/null
  }

  return (
    <Box
      sx={{
        maxWidth: 345,
        m: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        "&:hover .buttons": {
          display: "flex",
        },
      }}
    >
      <CardMedia
        component="img"
        image={book.thumbnailUrl}
        alt={book.title}
        sx={{ width: 120, height: 170, objectFit: "cover" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Typography gutterBottom variant="h6" component="p" sx={StyledTitle}>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={StyledSubTitle}>
          Author: {book.authors.join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={StyledPrice}>
          Price: ${book.price} | Rating: {book.rating}
        </Typography>
        <Box
          className="buttons"
          sx={{
            background: "#00000094",
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Button variant="contained" size="small">
            Borrow it
          </Button>
          <Button
            onClick={() => onOpenModal(book)}
            variant="contained"
            color="secondary"
          >
            Details
          </Button>
        </Box>
      </CardContent>
    </Box>
  );
}

export default Book;
