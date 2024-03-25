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
import PageLayout from "./Layout/PageLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageLayout>
            <HomePage />
          </PageLayout>
        }
      />
      <Route
        path="/homePage"
        element={
          <PageLayout>
            <HomePage />
          </PageLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PageLayout showBar={false}>
            <LoginPage />
          </PageLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <PageLayout showBar={false}>
            <SignupPage />
          </PageLayout>
        }
      />
      <Route
        path="/404"
        element={
          <PageLayout>
            <HomePage />
          </PageLayout>
        }
      />
      <Route
        path="/apple"
        element={
          <PageLayout>
            <ApplePage />
          </PageLayout>
        }
      />
      <Route
        path="/bookeditor"
        element={
          <PageLayout>
            <BookEditor />
          </PageLayout>
        }
      />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default AppRoutes;
