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

function AcceptedBookTable({ booksData }) {


  return (
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
          {booksData.map((requestedBookData) => (
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
  );
}

export default AcceptedBookTable;
