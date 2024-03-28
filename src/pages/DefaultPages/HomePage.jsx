import React, { useEffect, useState } from "react";
import BookDetailsModal from "../../components/Book/BookDetailsModal";
import Book from "../../components/Book/Book";
import {
  Container,
  Grid,
  Paper,

} from "@mui/material";
import { ClientEnum } from "../../ClientEnum";
import BookService from "../../services/BookService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BooksFilter from "../../components/BooksFilter";
import useDashboardStore from "../../store/useDashBoardStore";




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
  const bookNotify = () => toast("book is added to the cart");
  const setDashboardText = useDashboardStore((state) => state.setDashboardText);
  const setDashboardColor = useDashboardStore((state) => state.setDashboardColor);
  const setCurrentRoleFromStore = useDashboardStore((state) => state.setCurrentRole);


  
  useEffect(() => {

    async function fetchData() {
      try {
        const response = await BookService.instance.getAllbooks();
        setBooksData(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchData();

  
  }, []);

  useEffect(() => {


    setDashboardText("All Books")

    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    setCurrentUserRole(currentUserData?.role);
    if(currentUserRole){
      setCurrentRoleFromStore(currentUserRole)
    }
    if(currentUserRole == ClientEnum.ADMIN_TYPE){
      setDashboardColor("#0a335b")
    }
    else if(currentUserRole == ClientEnum.USER_TYPE){
      setDashboardColor("#1976d2")
    }
    else {
      setDashboardColor("#1976d2")
    }
    


  
  }, [currentUserRole]);

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
      bookNotify();
    }
  };

  const handleDelete = async (book) => {
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

export default HomePage;
