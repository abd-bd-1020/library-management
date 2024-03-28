import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";

const StyledText = {
  fontFamily: "Lato, sans-serif, SiyamRupali",
  color: "#666",
  fontSize: "13px",
  marginBottom: "0",
  textAlign: "left",
};

function PendingBookTable({ booksData, handleAccept, handleReject,checkedList,setCheckedList }) {



  const handleCheckBoxClick = (id, e) => {
    if (e.target.checked) {
      setCheckedList([...checkedList, id])
    }
    else {
      setCheckedList(checkedList.filter(borrowedBookId => borrowedBookId !== id))
    }
  }
  if (!booksData) {
    return null;
  }
  return (
    <TableContainer component={Paper}>
            <Typography variant="h5" component="div" style={{ margin: '16px' }}>
        Book Requests
      </Typography>
      <Table aria-label="requested books table">

        <TableHead>
          <TableRow style={{ alignContent: "left" }}>
            <TableCell >Checkbox</TableCell>
            <TableCell >Book Title</TableCell>
            <TableCell >Requester Name</TableCell>
            <TableCell >Book Amount</TableCell>
            <TableCell >Accept</TableCell>
            <TableCell >Reject</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {booksData.map((requestedBookData) => (
            <TableRow key={requestedBookData.id}>

              <TableCell align="center">
                <Checkbox 
                  checked={checkedList.includes(requestedBookData.id)}
                  onClick={(e) => { handleCheckBoxClick(requestedBookData.id, e) }} />
              </TableCell>
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
              <TableCell align="left">
                <Button variant="contained" color="primary" onClick={() => { handleAccept(requestedBookData) }}>
                  Accept
                </Button>

              </TableCell>
              <TableCell align="left">
                <Button variant="contained" color="error" onClick={() => { handleReject(requestedBookData) }}>
                  Reject
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PendingBookTable;
