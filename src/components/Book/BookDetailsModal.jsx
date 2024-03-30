import React from "react";
import { Modal, Box, Typography, Button, Grid, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

function Item({ bookUrl }) {
  return <img src={bookUrl} style={{ width: "100%", height: "60vh" }} />;
}

const fakeArray = [
  "https://i.ibb.co/KLRKdbR/ec1.png",
  "https://i.ibb.co/DGGSqXL/ec2.png",
  "https://i.ibb.co/HT33G93/ec3.png",
];
function BookDetailsModal({ open, onClose, book }) {
  const [index, setIndex] = React.useState(0);

  const handleChange = (cur, prev) => {
    setIndex(cur);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="book-details-title"
      aria-describedby="book-details-description"
    >
      <Grid container spacing={2} className="details-popin">
        <Grid item xs={12} lg={6}>
          <div>
            <Carousel
              index={index}
              onChange={handleChange}
              interval={4000}
              animation="slide"
              indicators={false}
              stopAutoPlayOnHover
              swipe
              className="my-carousel"
            >
              {fakeArray.map((bookUrl, i) => (
                <Item key={i} bookUrl={bookUrl} />
              ))}
            </Carousel>
            {fakeArray.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                style={{
                  width: "30%",
                  background: i === index ? "#5755FE" : "#8B93FF",
                  height: "10px",
                  padding: "unset",
                  borderRadius: "unset",
                  margin: "2px",
                  outline: "none",
                  border: "none",
                }}
              ></button>
            ))}
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          style={{ maxHeight: "70vh", overflow: "auto" }}
        >
          <Typography id="book-details-title" variant="h6" component="h2">
            {book.title}
          </Typography>
          <Typography
            id="book-details-description"
            style={{ marginTop: "16px", height: "165px", overflow: "auto" }}
          >
            {book.shortDescription || book.longDescription}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>ISBN:</strong> {book.isbn}
          </Typography>
          <Typography>
            <strong>Authors:</strong> {book.authors.join(", ")}
          </Typography>
          <Typography>
            <strong>Categories:</strong> {book.categories.join(", ")}
          </Typography>
          <Button
            onClick={onClose}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              margin: "unset",
              padding: "20px",
              fontSize: "45px",
              lineHeight: "20px",
            }}
          >
            &times;
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default BookDetailsModal;
