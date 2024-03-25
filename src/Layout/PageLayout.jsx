import React, { useState, useLayoutEffect } from "react";

import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";

import AppRoutes from "../route";
import { ThemeProvider, createTheme } from "@mui/material";

const defaultTheme = createTheme();

export default function PageLayout() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
