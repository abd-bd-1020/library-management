import React, { useEffect, useState } from "react";
import BookDetailsModal from "../components/BookDetailsModal";
import Book from "../components/Book";
import { Container, Grid, Paper, TextField, MenuItem } from "@mui/material";
import { ClientEnum } from "../ClientEnum";
import { CleanHands } from "@mui/icons-material";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [booksData, setBooksData] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [searchByAuthor, setSearchByAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(ClientEnum.ALL_GENRE);
  const [sortByRating, setSortByRating] = useState("");

  useEffect(() => {
    const storedBooksData = localStorage.getItem("bookData");
    setBooksData(JSON.parse(storedBooksData));
  }, []);

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 60,
                  }}
                >
                  <TextField
                    label="Search by Name"
                    value={searchByName}
                    onChange={(e) => setSearchByName(e.target.value)}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 60,
                  }}
                >
                  <TextField
                    label="Search by Author"
                    value={searchByAuthor}
                    onChange={(e) => setSearchByAuthor(e.target.value)}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 60,
                  }}
                >
                  <TextField
                    select
                    label="Select Genre"
                    value={selectedGenre}
                    onChange={(event) => setSelectedGenre(event.target.value)}
                  >
                          <MenuItem value={ClientEnum.ALL_GENRE}>{ClientEnum.ALL_GENRE}</MenuItem>

                    {ClientEnum.BOOK_GENRES.map((genre) => (
                      <MenuItem key={genre} value={genre}>
                        {genre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 60,
                  }}
                >
                  <TextField
                    select
                    label="Sort by Rating"
                    value={sortByRating}
                    onChange={(e) => setSortByRating(e.target.value)}
                  >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                  </TextField>
                </Paper>
              </Grid>
            </Grid>
          </Container>
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
