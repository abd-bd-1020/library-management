import React, { useEffect, useState } from "react";
import BookDetailsModal from "../components/BookDetailsModal";
import Book from "../components/Book";
import {
  Container,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { ClientEnum } from "../ClientEnum";
import BookService from "../services/BookService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";

const StyledBox = {
  p: 1,
  display: "flex",
  flexDirection: "column",
  height: 88,
};

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [booksData, setBooksData] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [searchByAuthor, setSearchByAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(ClientEnum.ALL_GENRE);
  const [sortByRating, setSortByRating] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const storedBooksData = localStorage.getItem("bookData");
    setBooksData(JSON.parse(storedBooksData));
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    setCurrentUserRole(currentUserData?.role);
  }, []);

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };
  const handleBorrowBook = async (book) => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    if (!currentUserData) {
      Swal.fire({
        title: "Warning",
        text: "Please login to borrow a book",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      addToCart(book);
    }
  };

  const handleDelete = async () => {
    const payload = {
      id: book._id,
    };
    const response = await BookService.instance.deleteBook(payload);
    if (response.status === true) {
      const updatedBooksData = booksData.filter(
        (item) => item._id !== book._id
      );
      setBooksData(updatedBooksData);
    } else {
      Swal.fire({
        title: "Error",
        text: "Please try again",
        icon: "error",
      });
    }
  };
  const handleUpdate = (book) => {
    navigate("/bookeditor", {
      state: {
        book: book,
      },
    });
  };

  const filteredBooks = booksData.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchByName.toLowerCase()) &&
      book.authors.some((author) =>
        author.toLowerCase().includes(searchByAuthor.toLowerCase())
      ) &&
      (selectedGenre === ClientEnum.ALL_GENRE || book.genre === selectedGenre)
    );
  });

  if (sortByRating === "asc") {
    filteredBooks.sort((a, b) => a.rating - b.rating);
  } else if (sortByRating === "desc") {
    filteredBooks.sort((a, b) => b.rating - a.rating);
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{ mt: 12 }}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                  <Box sx={StyledBox}>
                    <TextField
                      label="Search by Name"
                      value={searchByName}
                      onChange={(e) => setSearchByName(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <Box sx={StyledBox}>
                    <TextField
                      label="Search by Author"
                      value={searchByAuthor}
                      onChange={(e) => setSearchByAuthor(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <Box sx={StyledBox}>
                    <TextField
                      select
                      label="Select Genre"
                      value={selectedGenre}
                      onChange={(event) => setSelectedGenre(event.target.value)}
                    >
                      <MenuItem value={ClientEnum.ALL_GENRE}>
                        {ClientEnum.ALL_GENRE}
                      </MenuItem>

                      {ClientEnum.BOOK_GENRES.map((genre) => (
                        <MenuItem key={genre} value={genre}>
                          {genre}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <Box sx={StyledBox}>
                    <TextField
                      select
                      label="Sort by Rating"
                      value={sortByRating}
                      onChange={(e) => setSortByRating(e.target.value)}
                    >
                      <MenuItem value="asc">Ascending</MenuItem>
                      <MenuItem value="desc">Descending</MenuItem>
                    </TextField>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "colum",
              height: "calc(100vh - 280px)",
              overflow: "auto",
              flexWrap: "wrap",
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <>
                  {filteredBooks.map((book) => (
                    <Grid item xs={12} md={6} lg={3} key={book._id}>
                      <Book
                        key={book._id}
                        book={book}
                        onOpenModal={handleOpenModal}
                        isAdmin={currentUserRole === ClientEnum.ADMIN_TYPE}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                        handleBorrowBook={handleBorrowBook}
                      />
                    </Grid>
                  ))}
                  {selectedBook && (
                    <BookDetailsModal
                      open={isModalOpen}
                      onClose={handleCloseModal}
                      book={selectedBook}
                    />
                  )}
                </>
              </Grid>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
