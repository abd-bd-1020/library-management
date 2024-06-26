import React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  commonItemList,
  adminItemList,
  userItemList,
  secondaryListItems,
} from "./SideBarItems";
import useDashboardStore from "../store/useDashBoardStore";
import { ClientEnum } from "../ClientEnum";
import { Typography } from "@mui/material";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Sidebar = ({ open, toggleDrawer }) => {
  const currentUserRoleFromStore = useDashboardStore(
    (state) => state.currentRole
  );
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <Typography align="center">Library Management</Typography>
        <IconButton className="sidebar-toggle-button" onClick={toggleDrawer}>
          <ChevronLeftIcon className="sidebar-toggle-button" />
        </IconButton>
      </Toolbar>
      <Divider />
      {currentUserRoleFromStore === ClientEnum.GUEST_TYPE && (
        <List component="nav">{commonItemList}</List>
      )}
      {currentUserRoleFromStore === ClientEnum.ADMIN_TYPE && (
        <List component="nav">{adminItemList}</List>
      )}
      {currentUserRoleFromStore === ClientEnum.USER_TYPE && (
        <List component="nav">{userItemList}</List>
      )}
    </Drawer>
  );
};

export default Sidebar;
