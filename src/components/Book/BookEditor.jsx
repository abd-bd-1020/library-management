import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ClientEnum } from "../../ClientEnum";
import BookService from "../../services/BookService";

const BookEditor = () => {
  const location = useLocation();
  const book = location.state?.book;
  const isUpdate = book ? true : false;
  const navigate = useNavigate();
  const [title, setTitle] = useState(book?.title || "");
  const [authors, setAuthors] = useState(book?.authors?.join(",") || "");
  const [rating, setRating] = useState(book?.rating || "");
  const [genre, setGenre] = useState(book?.genre || "");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !authors || !rating || !genre) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields.",
        icon: "error",
      });
      return;
    }

    const payload = {
      title: title,
      authors: authors,
      rating: rating,
      genre: genre,
    };

    if (isUpdate) {
      const response = await BookService.instance.updateBook({
        ...payload,
        _id: book._id,
      });
      if (response.status === true) {
        Swal.fire({
          title: "Success",
          text: "Book updated successfully",
          icon: "success",
        });
        navigate("/homePage");
      } else {
        Swal.fire({
          title: "Error",
          text: "Please try again",
          icon: "error",
        });
      }
    } else {
      const response = await BookService.instance.createBook(payload);
      if (response.status === true) {
        Swal.fire({
          title: "Success",
          text: "Book added successfully",
          icon: "success",
        });
        navigate("/homePage");
      } else {
        Swal.fire({
          title: "Error",
          text: "Please try again",
          icon: "error",
        });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {isUpdate ? "Update Book" : "Add New Book"}
        </Typography>
        <form
          style={{ width: "100%", marginTop: 1 }}
          onSubmit={handleSubmit} // Attach handleSubmit to form onSubmit event
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="authors"
            label="Authors (comma-separated)"
            name="authors"
            autoComplete="authors"
            autoFocus
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="rating"
            label="Rating"
            name="rating"
            autoComplete="rating"
            autoFocus
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            inputProps={{ type: "number" }}
          />
          <FormControl fullWidth style={{ marginTop: "20px" }}>
            <InputLabel id="demo-simple-select-label">Select Genre</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={genre}
              label="Select Genre"
              onChange={(e) => setGenre(e.target.value)}
            >
              {ClientEnum.BOOK_GENRES.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: "24px 0 16px" }}
          >
            {isUpdate ? "Update" : "Submit"}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default BookEditor;
