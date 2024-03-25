import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ApplePage from "./pages/ApplePage";
import LoginPage from "./pages/LogIn";
import SignupPage from "./pages/SignUp";
import Sidebar from "./Layout/SideBar";
import TopBar from "./Layout/TopBar";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import BookEditor from "./components/BookEditor";

function Navbar({ showBar = true, children }) {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {showBar && <TopBar open={open} toggleDrawer={toggleDrawer} />}
      {showBar && <Sidebar open={open} toggleDrawer={toggleDrawer} />}
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
        {children}
        {showBar && <Toolbar />}
      </Box>
    </Box>
  );
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <HomePage />
          </div>
        }
      />
      <Route
        path="/homePage"
        element={
          <Navbar>
            <HomePage />
          </Navbar>
        }
      />
      <Route
        path="/login"
        element={
          <Navbar showBar={false}>
            <LoginPage />
          </Navbar>
        }
      />
      <Route
        path="/signup"
        element={
          <Navbar showBar={false}>
            <SignupPage />
          </Navbar>
        }
      />
      <Route
        path="/404"
        element={
          <Navbar>
            <HomePage />
          </Navbar>
        }
      />
      <Route
        path="/apple"
        element={
          <Navbar>
            <ApplePage />
          </Navbar>
        }
      />
      <Route
        path="/bookeditor"
        element={
          <Navbar>
            <BookEditor />
          </Navbar>
        }
      />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default AppRoutes;
