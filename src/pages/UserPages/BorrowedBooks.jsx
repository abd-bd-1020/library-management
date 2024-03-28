import React, { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import useDashboardStore from "../../store/useDashBoardStore";
import BorrowService from "../../services/BorrowService";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UserBookRequestTable from "../../components/Table/UserBookRequestTable";

const giveBackNotify = () => toast("book is given back");
const errorNotify = () => toast("Something went wrong");

function BorrowedBooks() {
  const [borrowedBookData, setBorrowedBooksData] = useState([]);
  const setDashboardText = useDashboardStore((state) => state.setDashboardText);
  const [isReload, setIsReload] = useState(true);

  useEffect(() => {
    setDashboardText("Borrowed Books");

    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    async function fetchData() {
      try {
        const response = await BorrowService.instance.getBorrowedBookOfSingleUser({ "email": currentUserData.email });
        setBorrowedBooksData(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchData();
  }, [isReload]);

  const handleGiveBack = async (borrowedbook) => {
    const response = await BorrowService.instance.giveBackSingleBook({ "id": borrowedbook.id });
    if (response.status) {
      giveBackNotify();
      setIsReload(!isReload);
    } else {
      errorNotify();
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>


      <UserBookRequestTable borrowedBookData={borrowedBookData} handleGiveBack={handleGiveBack} isBorrow = {true} />


      <ToastContainer
        autoClose={2000}
        position="bottom-right"
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

export default BorrowedBooks;
