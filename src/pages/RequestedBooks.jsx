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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BooksFilter from "../components/BooksFilter";
import useDashboardStore from "../store/useDashBoardStore";
import BorrowService from "../services/BorrowService";



function RequestedBooks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [booksData, setBooksData] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [searchByAuthor, setSearchByAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(ClientEnum.ALL_GENRE);
  const [sortByRating, setSortByRating] = useState("");

  const setDashboardText = useDashboardStore((state) => state.setDashboardText);

  


  useEffect(() => {
    setDashboardText("Requested Books")

    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    async function fetchData() {
      try {
        const response = await BorrowService.instance.getBorrowedBookRequestOfSingleUser({"email" : currentUserData.email});
        setBooksData(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchData();

  
  }, []);




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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
      <Grid container spacing={3}>
      <BooksFilter
              searchByName={searchByName}
              setSearchByName={setSearchByName}
              searchByAuthor={searchByAuthor}
              setSearchByAuthor={setSearchByAuthor}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              sortByRating={sortByRating}
              setSortByRating={setSortByRating}
            />
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
      <ToastContainer 
        autoClose={2000}
        position="bottom-right"
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover/>

    </Container>
  );
}

export default RequestedBooks;
