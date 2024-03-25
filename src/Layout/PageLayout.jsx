import React, { useState, useLayoutEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Toolbar,
} from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";
import AppRoutes from "../route";

const defaultTheme = createTheme();

export default function PageLayout() {
  const [open, setOpen] = useState(true);



  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
       
            
              <TopBar open={open} toggleDrawer={toggleDrawer} />
              <Sidebar open={open} toggleDrawer={toggleDrawer} />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar /> <AppRoutes />
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}
