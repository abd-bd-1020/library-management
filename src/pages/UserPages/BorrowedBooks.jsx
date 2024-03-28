import React, { useEffect, useState } from "react";


import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import useDashboardStore from "../../store/useDashBoardStore";
import BorrowService from "../../services/BorrowService";
import { ToastContainer, toast } from 'react-toastify';
const giveBackNotify = () => toast("book is given back");
const errorNotify = () => toast("Something went wrong");



function BorrowedBooks() {
  const [borrowedBookData, setBorrowedBooksData] = useState([]);
  const setDashboardText = useDashboardStore((state) => state.setDashboardText);

  const [isReload,setIsReload] = useState(true)


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

  const StyledText = {
    fontFamily: "Lato, sans-serif, SiyamRupali",
    color: "#666",
    fontSize: "13px",
    marginBottom: "0",
    textAlign: "left",
  };
  const handleGiveBack = async (borrowedbook) => {
    const response = await BorrowService.instance.giveBackSingleBook({ "id": borrowedbook.id });
    if(response.status){
      giveBackNotify()
      setIsReload(!isReload)
    }
    else{
      errorNotify()
    }

  }



  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>

        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Paper
            sx={{
              p: 2,
              flexDirection: "column",
              height: "calc(100vh - 100px)",
              overflow: "auto",
              flexWrap: "wrap",
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <>
                <TableContainer component={Paper}>
                  <Typography variant="h5" component="div" style={{ margin: '16px' }}>
                    Accepted Book Requests
                  </Typography>
                  <Table aria-label="requested books table">

                    <TableHead>
                      <TableRow style={{ alignContent: "left" }}>
                        <TableCell >Book Title</TableCell>
                        <TableCell >Amount</TableCell>
                        <TableCell >  Action  </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {borrowedBookData.map((borrowedBook) => (
                        <TableRow key={borrowedBook.id}>


                          <TableCell align="left">
                            <Typography sx={{ ...StyledText, fontWeight: 700 }}>
                              {borrowedBook.bookTitle}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            <Typography sx={StyledText}>
                              {borrowedBook.amount}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Button variant="contained" color="primary" onClick={() => { handleGiveBack(borrowedBook) }}>
                              Give Back
                            </Button>

                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

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
        pauseOnHover/>

    </Container>
  );
}

export default BorrowedBooks;
