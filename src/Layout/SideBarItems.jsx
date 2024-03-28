import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ForwardIcon from "@mui/icons-material/Forward";

export const userItemList = (
  <React.Fragment>
    <ListItemButton component={Link} to="/homePage">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home Page" />
    </ListItemButton>
    <ListItemButton component={Link} to="/requestedbooks">
      <ListItemIcon>
        <AssignmentReturnIcon />
      </ListItemIcon>
      <ListItemText primary="Requested Books" />
    </ListItemButton>
    <ListItemButton component={Link} to="/borrowbooks">
      <ListItemIcon>
        <AssignmentTurnedInIcon />
      </ListItemIcon>
      <ListItemText primary="Borrowed Books" />
    </ListItemButton>
  </React.Fragment>
);

export const adminItemList = (
  <React.Fragment>
    <ListItemButton component={Link} to="/homePage">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home Page" />
    </ListItemButton>
    <ListItemButton component={Link} to="/bookeditor">
      <ListItemIcon>
        <BorderColorIcon />
      </ListItemIcon>
      <ListItemText primary="Book Editor" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pendingrequests">
      <ListItemIcon>
        <PendingActionsIcon />
      </ListItemIcon>
      <ListItemText primary="Pending Requests" />
    </ListItemButton>
    <ListItemButton component={Link} to="/givenbooks">
      <ListItemIcon>
        <ForwardIcon />
      </ListItemIcon>
      <ListItemText primary="Given Books" />
    </ListItemButton>
  </React.Fragment>
);

export const commonItemList = (
  <React.Fragment>
    <ListItemButton component={Link} to="/homePage">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home Page" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
