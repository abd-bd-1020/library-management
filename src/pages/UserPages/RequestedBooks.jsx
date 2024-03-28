import React, { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import useDashboardStore from "../../store/useDashBoardStore";
import BorrowService from "../../services/BorrowService";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UserBookRequestTable from "../../components/Table/UserBookRequestTable";

const cancelRequestkNotify = () => toast("book request is canceled");
const errorNotify = () => toast("Something went wrong");

function RequestedBooks() {
  const [borrowedBookData, setBorrowedBooksData] = useState([]);
  const setDashboardText = useDashboardStore((state) => state.setDashboardText);
  const [isReload, setIsReload] = useState(true);

  useEffect(() => {
    setDashboardText("Requested Books");

    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    async function fetchData() {
      try {
        const response = await BorrowService.instance.getBorrowedBookRequestOfSingleUser({ "email": currentUserData.email });
        setBorrowedBooksData(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchData();
  }, [isReload]);

  const handleCancel = async (borrowedbook) => {
    const response = await BorrowService.instance.cancelBookRequest({ "id": borrowedbook.id });
    if (response.status) {
      cancelRequestkNotify();
      setIsReload(!isReload);
    } else {
      errorNotify();
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>


      <UserBookRequestTable borrowedBookData={borrowedBookData} handleCancel={handleCancel} isBorrow = {false} />


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

export default RequestedBooks;
