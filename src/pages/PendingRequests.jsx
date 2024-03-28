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
  Button,
} from "@mui/material";
import { ClientEnum } from "../ClientEnum";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BooksFilter from "../components/BooksFilter";
import useDashboardStore from "../store/useDashBoardStore";
import BorrowService from "../services/BorrowService";
import RequestedBook from "../components/RequestedBookTable";
import RequestedBookTable from "../components/RequestedBookTable";

function PendingRequests() {
  const [filteredBooksData, setFilteredBooksData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const acceptNotify = () => toast("Request Accepted");
  const rejectNotify = () => toast("Request Rejected");
  const errorNotify = () => toast("Failed to do the action");
  const setDashboardText = useDashboardStore((state) => state.setDashboardText);
  const [isReload,setIsReload] = useState(true)
  const [isMarkAll,setIsMarkAll] = useState(false)
  const [isMarkButtonClicked,setIsMarkButtonClicked] = useState(false)
  const [checkedList, setCheckedList] = useState([])


  useEffect(() => {
    setDashboardText("Pending Requests");

    async function fetchData() {
      try {
        const response = await BorrowService.instance.getAllBorrowRequests();
        setBooksData(response.data);
        setFilteredBooksData(response.data); 
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchData();
  }, [isReload]);
  useEffect(() => {
    if (isMarkAll) {
      const allIds = booksData.map((borrowedBook) => borrowedBook.id);
      setCheckedList(allIds)

    }
    else {
      setCheckedList(checkedList.filter(borrowedBookId => !booksData.some(bookData => bookData.id === borrowedBookId)));
    }
  }, [isMarkButtonClicked]);


  useEffect(() => {
    const filteredData = booksData.filter((book) =>
      book.user.email.toLowerCase().includes(searchByName.toLowerCase())
    );
    setCheckedList(checkedList.filter(borrowedBookId => filteredData.some(bookData => bookData.id === borrowedBookId)));

    setFilteredBooksData(filteredData);
  }, [searchByName, booksData]);

  const handleAccept = async (bookRequest) =>{

    const response = await BorrowService.instance.acceptSingleRequest({"id":bookRequest.id});
    if(response.status){
      setIsReload(!isReload)
      acceptNotify()
    }
    else{
      errorNotify()
    }

  }
  const handleReject = async (bookRequest) =>{

    const response = await BorrowService.instance.rejectSingleRequest({"id":bookRequest.id});
    if(response.status){
      setIsReload(!isReload)
      rejectNotify()
    }
    else{
      errorNotify()
    }
  }


  const handleMarkAll = () => {
    setIsMarkAll(true);
    setIsMarkButtonClicked(!isMarkButtonClicked)

  };

  const handleUnmarkAll = () => {
    setIsMarkAll(false);
    setIsMarkButtonClicked(!isMarkButtonClicked)
  };

  const handleAcceptMarked = async () => {
    const response = await BorrowService.instance.acceptMarkedRequest({"data" : checkedList });
    if(response.status){
      setIsReload(!isReload)
      rejectNotify()
    }
    else{
      errorNotify()
    }

  };

  const handleRejectMarked = async () => {
    const response = await BorrowService.instance.rejectMarkedRequest({"data" : checkedList });
    if(response.status){
      setIsReload(!isReload)
      rejectNotify()
    }
    else{
      errorNotify()
    }
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <Paper   sx={{ p: 2 , mt : 10}}>
            <Box  display="flex" alignItems="center"  >
              <TextField
               sx={{width:"100%"}}
                label="Search by Requester Name"
                variant="outlined"
                size="small"
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
              />
       
              <Button variant="contained" onClick={handleMarkAll} sx={{ ml: 2,width:"50%" }}>
                Mark All
              </Button>
              <Button variant="contained" onClick={handleUnmarkAll} sx={{ ml: 2,width:"50%" }}>
                Unmark All
              </Button>
              <Button variant="contained" onClick={handleAcceptMarked} sx={{ ml: 2,width:"50%" }}>
                Accept Marked
              </Button>
              <Button variant="contained" onClick={handleRejectMarked} sx={{ ml: 2,width:"50%" }}>
                Reject Marked
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{marginTop : "20px"}}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "colum",
              height: "calc(100vh - 240px)",
              overflow: "auto",
              flexWrap: "wrap",
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <>
                      <RequestedBookTable
                        handleAccept={handleAccept}
                        handleReject = {handleReject}
                        booksData={filteredBooksData}

                        checkedList = {checkedList}
                        setCheckedList = {setCheckedList}
                      />
                
                </>
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
        pauseOnHover
      />
    </Container>
  );
}

export default PendingRequests;
