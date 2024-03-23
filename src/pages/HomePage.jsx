import React, { useState } from "react";
import BookDetailsModal from "../components/BookDetailsModal";
import booksData from "../data/books.json";
import Book from "../components/Book";
import { Container, Grid, Paper } from "@mui/material";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

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
                ></Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 60,
                  }}
                ></Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 60,
                  }}
                ></Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 60,
                  }}
                ></Paper>
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
                  {booksData.map((book) => (
                    <Grid item xs={12} md={6} lg={3}>
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
      {/* <Copyright sx={{ pt: 4 }} /> */}
    </Container>
  );
}

export default HomePage;
