import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

function Book({ book }) {
  if (!book) {
    return null; // or handle the case where book is undefined/null
  }

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={book.thumbnailUrl}
        alt={book.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.authors.join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${book.price} | Rating: {book.rating}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Book;
