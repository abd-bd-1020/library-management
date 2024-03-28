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
  Typography
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import useDashboardStore from "../store/useDashBoardStore";
import BorrowService from "../services/BorrowService";


function GivenBooks() {
  const [accepTedBooksData, setAcceptedBooksData] = useState([]);
;
  const setDashboardText = useDashboardStore((state) => state.setDashboardText);



  useEffect(() => {
    setDashboardText("Given Books");

    async function fetchData() {
      try {
        const acceptResponse = await BorrowService.instance.getAllAcceptedRequests();
        setAcceptedBooksData(acceptResponse.data)
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchData();
  }, []);

  const StyledText = {
    fontFamily: "Lato, sans-serif, SiyamRupali",
    color: "#666",
    fontSize: "13px",
    marginBottom: "0",
    textAlign: "left",
  };
  


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>

        <Grid item xs={12} style={{marginTop : "20px"}}>
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
            <TableCell >Requester Name</TableCell>
            <TableCell >Book Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accepTedBooksData.map((requestedBookData) => (
            <TableRow key={requestedBookData.id}>

    
              <TableCell align="center">
                <Typography sx={{ ...StyledText, fontWeight: 700 }}>
                  {requestedBookData.book.title}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={StyledText}>
                  {requestedBookData.user.email}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={StyledText}>
                  {requestedBookData.amount}
                </Typography>
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

    </Container>
  );
}

export default GivenBooks;
