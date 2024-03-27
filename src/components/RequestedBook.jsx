import React from "react";
import { CardMedia, CardContent, Typography, Box } from "@mui/material";

const StyledTitle = {
  fontFamily: "Lato, sans-serif, SiyamRupali",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "1.4",
  marginBottom: "4px",
  textAlign: "center",
  boxSizing: "border-box",
};
const StyledText = {
  fontFamily: "Lato, sans-serif, SiyamRupali",
  color: "#666",
  fontSize: "13px",
  marginBottom: "0",
  textAlign: "left",
  marginLeft: "8px", // Adjust as needed
};
const StyledPrice = {
  fontFamily: "Lato, sans-serif",
  fontSize: "15px",
  fontWeight: "700",
  marginBottom: "12px",
  textAlign: "center",
};

function RequestedBook({ requestedBookData }) {
  if (!requestedBookData) {
    return null;
  }

  return (
    <Box
      sx={{
        maxWidth: 345,
        m: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        gap: "10px",
      }}
    >
      <CardMedia
        component="img"
        image={requestedBookData.book.thumbnailUrl}
        alt={requestedBookData.book.title}
        sx={{ width: 120, height: 170, objectFit: "cover" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "5px",
        }}
      >
        <Typography gutterBottom variant="h6" component="p" sx={StyledTitle}>
          {requestedBookData.book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={StyledText}>
          Requester Name: {requestedBookData.user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={StyledText}>
          Requested Amount: {requestedBookData.amount}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={StyledText}>
          Requested Date: {"book"}
        </Typography>
      </CardContent>
    </Box>
  );
}

export default RequestedBook;
