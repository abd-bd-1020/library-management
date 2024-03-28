import React, { useEffect, useState } from "react";
import booksData from "./data/books.json";

import AppRoutes from "./route";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ClientEnum } from "./ClientEnum";
import useDashboardStore from "./store/useDashBoardStore";

const defaultTheme = createTheme();

function App() {
  const setDashboardColor = useDashboardStore((state) => state.setDashboardColor);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userData") === null) {
      const userDataArr = [
        {
          email: "admin",
          password: "admin",
          role: ClientEnum.ADMIN_TYPE,
        },
      ];
      localStorage.setItem("userData", JSON.stringify(userDataArr));
    }
    if (localStorage.getItem("bookData") === null) {
      localStorage.setItem("bookData", JSON.stringify(booksData));
    }
    if (localStorage.getItem("borrowData") === null) {
      localStorage.setItem("borrowData", JSON.stringify([]));
    }

    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    const currentUserRole=  currentUserData?.role;
    if(currentUserRole == ClientEnum.ADMIN_TYPE){
      setDashboardColor("#031424")
    }
    else if(currentUserRole == ClientEnum.USER_TYPE){
      setDashboardColor("#0a335b")
    }
    else {
      setDashboardColor("#1976d2")
    }
    
    
    setInitialized(true);
  }, []);

  if (!initialized) {
    return null; 
  }

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
