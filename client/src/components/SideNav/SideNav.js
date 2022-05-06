import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import StreamIcon from "@mui/icons-material/Stream";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import "./SideNav.css";

export default function SwipeableTemporaryDrawer() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sideNav">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={onClose}
        onOpen={() => setIsOpen(true)}
      >
        <div className="drawer">
          <Box
            textAlign="center"
            p={2}
            fontSize={24}
            className="drawer__heading"
          >
            <StreamIcon className="drawer__icon" /> StreamTube
          </Box>
          <Divider />
          <List>
            <ListItem button onClick={() => history.push("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            <ListItem button onClick={() => history.push("/trendingVideos")}>
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary={"Trending"} />
            </ListItem>
            <ListItem button onClick={() => history.push("/subscriptions")}>
              <ListItemIcon>
                <SubscriptionsIcon />
              </ListItemIcon>
              <ListItemText primary={"Subscriptions"} />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
