import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import { ClientEnum } from "../ClientEnum";

function BookEditor({ onSave, onCancel, book }) {
  const [title, setTitle] = useState(book ? book.title : "");
  const [authors, setAuthors] = useState(book ? book.authors.join(", ") : "");
  const [genre, setGenre] = useState(book ? book.genre : ClientEnum.ALL_GENRE);
  const [rating, setRating] = useState(book ? book.rating : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      title,
      authors: authors.split(",").map((author) => author.trim()),
      genre,
      rating: parseInt(rating),
    };
    onSave(updatedBook);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Authors (comma-separated)"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            fullWidth
          >
            {ClientEnum.BOOK_GENRES.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" variant="contained" color="primary">
            {book ? "Update" : "Add"} Book
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={onCancel} variant="contained" color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default BookEditor;
