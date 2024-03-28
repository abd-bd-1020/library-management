import React, { useEffect, useState } from "react";

import {
  Container,
  Grid,
  Paper,

} from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import useDashboardStore from "../store/useDashBoardStore";
import BorrowService from "../services/BorrowService";

import AcceptedBookTable from "../components/AcceptedBookTable";

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
                      <AcceptedBookTable
                        booksData={accepTedBooksData}
                      />
                
                </>
            </Container>
         
          </Paper>
          
        </Grid>

      </Grid>

    </Container>
  );
}

export default GivenBooks;
