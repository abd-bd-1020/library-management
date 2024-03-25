import React, { useState, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Container,
  Grid,
} from '@mui/material';

import { ClientEnum } from '../ClientEnum';

const initialValues = {
  title: '',
  authors: '',
  rating: '',
  genre: '',
};

const BookEditor = ({ book }) => {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (book) {
      setValues(book);
    }
  }, [book]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', values);
    setValues(initialValues);
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <Typography variant="h5" gutterBottom>
            {book ? 'Update Book' : 'Add New Book'}
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Authors (comma-separated)"
                  name="authors"
                  value={values.authors}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Rating"
                  name="rating"
                  type="number"
                  inputProps={{ min: 0, max: 10 }}
                  value={values.rating}
                  onChange={handleChange}
                  required
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item>
                <FormControl required style={{ width: '100%' }}>
                  <InputLabel>Genre</InputLabel>
                  <Select
                    name="genre"
                    value={values.genre}
                    onChange={handleChange}
                  >
                    {ClientEnum.BOOK_GENRES.map((genre) => (
                      <MenuItem key={genre} value={genre}>
                        {genre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  {book ? 'Update' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookEditor;
