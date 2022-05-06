import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import StreamIcon from "@mui/icons-material/Stream";
import VideocamIcon from "@mui/icons-material/Videocam";
import axios from "axios";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";

import LoginIcon from "@mui/icons-material/Login";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import "./Navbar.css";
import SideNav from "../SideNav/SideNav";

function NavBar() {
  const { user, setUser, userData } = useAuth();
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const res = await axios.get("/api/users/logout");
    if (res.status === 200) {
      history.push("/");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setUser(false);
      toast.success("Logout success!");
    } else {
      toast.error("Operation Failed");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const res = await axios.post("/api/users/login", {
        email: "guest@gmail.com",
        password: "password",
      });

      if (res.data.loginSuccess) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        setUser(true);

        toast.success("Welcome Guest!");
        history.push("/");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static" className="nav">
        <Toolbar>
          <SideNav
            visible={visible}
            setVisible={setVisible}
            onClose={onClose}
          />
          <StreamIcon className="header__titleIcon" />
          <Typography
            variant="h6"
            className="header__title"
            onClick={() => history.push("/")}
          >
            Stream Tube
          </Typography>

          <div className="header__icons">
            {!user ? (
              <MenuItem onClick={handleGuestLogin}>
                <Typography>Guest Login</Typography>
              </MenuItem>
            ) : (
              <MenuItem onClick={handleLogout}>
                <Typography>Guest Logout</Typography>
              </MenuItem>
            )}

            <IconButton onClick={() => history.push("/video/upload")}>
              <VideocamIcon />
            </IconButton>
            <IconButton onClick={handleClick}>
              <Avatar sx={{ width: 30, height: 30 }} />
            </IconButton>
          </div>
        </Toolbar>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          className="dropdown"
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 3.5,
              "& .MuiAvatar-root": {
                width: 30,
                height: 30,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          {user ? (
            <div>
              <MenuItem>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                Hi, {userData?.name}
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem onClick={() => history.push("/login")}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                Login
              </MenuItem>
              <MenuItem onClick={() => history.push("/register")}>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                Register
              </MenuItem>
            </div>
          )}
        </Menu>
      </AppBar>
    </div>
  );
}

export default NavBar;
