import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ApplePage from "./pages/ApplePage";
import LoginPage from "./pages/LogIn";
import SignupPage from "./pages/SignUp";
import BookEditor from "./components/BookEditor"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/homePage" element={<HomePage />} />\
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="/apple" element={<ApplePage />} />
      <Route path="/bookeditor" element={<BookEditor />} />

      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default AppRoutes;
