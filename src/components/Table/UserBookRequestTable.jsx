import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Container,
  Grid
} from "@mui/material";

function UserBookRequestTable({ borrowedBookData, handleGiveBack,isBorrow,handleCancel }) {

    const handleClick = (borrowedBook) =>{
        if(isBorrow){
            handleGiveBack(borrowedBook)
        }
        else{
            handleCancel(borrowedBook)
        }
        
    }

  const StyledText = {
    fontFamily: "Lato, sans-serif, SiyamRupali",
    color: "#666",
    fontSize: "13px",
    marginBottom: "0",
    textAlign: "left",
  };

  return (
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
    <TableContainer component={Paper}>
      <Typography variant="h5" component="div" style={{ margin: '16px' }}>
        {isBorrow?"Accepted Book Requests" : "Requested Books"}
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
                <Button variant="contained" color="primary" onClick={() => { handleClick(borrowedBook) }}>
                  {isBorrow? "Give Back" : "Cancel"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </Paper>
    </Grid>
    </Grid>
  );
}

export default UserBookRequestTable;
