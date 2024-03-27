import React, { useEffect } from "react";
import booksData from "./data/books.json";

import AppRoutes from "./route";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ClientEnum } from "./ClientEnum";
const defaultTheme = createTheme();

function App() {
  useEffect(() => {
    if (localStorage.getItem("userData") == null) {
      const userDataArr = [
        {
          email: "admin",
          password: "admin",
          role: ClientEnum.ADMIN_TYPE,
        },
      ];
      localStorage.setItem("userData", JSON.stringify(userDataArr));
    }
    if (localStorage.getItem("bookData") == null) {
      localStorage.setItem("bookData", JSON.stringify(booksData));
    }
    if (localStorage.getItem("borrowData") == null) {
      localStorage.setItem("borrowData", JSON.stringify([]));
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
