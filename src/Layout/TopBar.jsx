import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import CartIconButton from "../components/Cart/CartIconButton";
import useDashboardStore from "../store/useDashBoardStore";
import { ClientEnum } from "../ClientEnum";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TopBar = ({ open, toggleDrawer }) => {

  const navigate = useNavigate();
  const toggleCart = useCartStore((state) => state.toggleCart);
  const [currentUserData, setCurrentUserData] = useState(null);
  const dashboardText = useDashboardStore((state) => state.dashboardText);
  const dashboardColor = useDashboardStore((state) => state.dashboardColor);
  const currentUserRoleFromStore = useDashboardStore((state) => state.currentRole);




  useEffect(() => {
    const userData = localStorage.getItem("currentUserData");
    if (userData) {
      setCurrentUserData(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUserData");
    setCurrentUserData(null);
  };
  return (
    <AppBar style={{backgroundColor : dashboardColor}} className="page-header" position="absolute" open={open}> 
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {dashboardText}
        </Typography>
        {currentUserRoleFromStore===ClientEnum.USER_TYPE&&
        <CartIconButton  toggleCart={toggleCart}>
        </CartIconButton>}
        {currentUserData !== null ? (
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        ) : (
          <IconButton
            color="inherit"
            onClick={() => {
              navigate("/login");
            }}
          >
            <LoginIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
