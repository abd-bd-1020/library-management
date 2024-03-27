import React from "react";
import { TextField, MenuItem, Box, Grid, Paper, Container } from "@mui/material";
import { ClientEnum } from "../ClientEnum";

const BooksFilter = ({
  searchByName,
  setSearchByName,
  searchByAuthor,
  setSearchByAuthor,
  selectedGenre,
  setSelectedGenre,
  sortByRating,
  setSortByRating,
}) => {
  const StyledBox = {
    p: 1,
    display: "flex",
    flexDirection: "column",
    height: 88,
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
    <Paper sx={{ mt: 12 }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={StyledBox}>
              <TextField
                label="Search by Name"
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={StyledBox}>
              <TextField
                label="Search by Author"
                value={searchByAuthor}
                onChange={(e) => setSearchByAuthor(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={StyledBox}>
              <TextField
                select
                label="Select Genre"
                value={selectedGenre}
                onChange={(event) => setSelectedGenre(event.target.value)}
              >
                <MenuItem value={ClientEnum.ALL_GENRE}>
                  {ClientEnum.ALL_GENRE}
                </MenuItem>

                {ClientEnum.BOOK_GENRES.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={StyledBox}>
              <TextField
                select
                label="Sort by Rating"
                value={sortByRating}
                onChange={(e) => setSortByRating(e.target.value)}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </TextField>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  </Grid>
  );
};

export default BooksFilter;
