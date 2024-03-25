import React, { useEffect } from "react";
import booksData from "./data/books.json";

import PageLayout from "./Layout/PageLayout";

import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";

import AppRoutes from "./route";
import { ThemeProvider, createTheme } from "@mui/material";
const defaultTheme = createTheme();

function App() {
  useEffect(() => {
    if (localStorage.getItem("userData") == null) {
      const userDataArr = [];
      localStorage.setItem("userData", JSON.stringify(userDataArr));
    }
    if (localStorage.getItem("bookData") == null) {
      localStorage.setItem("bookData", JSON.stringify(booksData));
    }
  }, []);

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
