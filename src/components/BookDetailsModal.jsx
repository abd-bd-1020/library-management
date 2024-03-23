import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

function BookDetailsModal({ open, onClose, book }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="book-details-title"
      aria-describedby="book-details-description"
    >
      <Box sx={style}>
        <Typography id="book-details-title" variant="h6" component="h2">
          {book.title}
        </Typography>
        <Typography id="book-details-description" sx={{ mt: 2 }}>
          {book.shortDescription || book.longDescription}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>ISBN:</strong> {book.isbn}
        </Typography>
        <Typography>
          <strong>Authors:</strong> {book.authors.join(", ")}
        </Typography>
        <Typography>
          <strong>Categories:</strong> {book.categories.join(", ")}
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default BookDetailsModal;
