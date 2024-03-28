import { Box, CssBaseline, Toolbar } from "@mui/material";
import TopBar from "./TopBar";
import Sidebar from "./SideBar";
import { useState } from "react";
import Cart from "../components/Cart/Cart";

function PageLayout({ showBar = true, children }) {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {showBar && <TopBar open={open} toggleDrawer={toggleDrawer} />}
      {showBar && <Sidebar open={open} toggleDrawer={toggleDrawer} />}
      {showBar && <Cart />}

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
export default PageLayout;
