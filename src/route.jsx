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
import RequestedBooks from "./pages/RequestedBooks";
import PendingRequests from "./pages/PendingRequests";
import GivenBooks from "./pages/GivenBooks";
import BorrowedBooks from "./pages/BorrowedBooks";

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
        path="/requestedbooks"
        element={
          <PageLayout>
            <RequestedBooks />
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
        path="/pendingrequests"
        element={
          <PageLayout>
            <PendingRequests />
          </PageLayout>
        }
      />

      <Route
        path="/borrowbooks"
        element={
          <PageLayout>
            <BorrowedBooks />
          </PageLayout>
        }
      />
      <Route
        path="/givenbooks"
        element={
          <PageLayout>
            <GivenBooks />
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
