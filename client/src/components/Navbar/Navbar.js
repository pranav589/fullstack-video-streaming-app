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
import Search from "@mui/icons-material/Search";
import SimpleModal from "../SimpleModal/SimpleModal";
import LoginIcon from "@mui/icons-material/Login";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import "./Navbar.css";
import SideNav from "../SideNav/SideNav";

function NavBar() {
  const { user, setUser, userData } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputSearch, setInputSearch] = useState("");

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
      navigate("/");
      localStorage.removeItem("token");
      setUser(false);
      toast.success("Logout success!");
    } else {
      toast.error("Operation Failed");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/video/searchVideo", {
        inputSearch,
      });
      if (res.data.success) {
        navigate(`/video/${res.data.video._id}`);
        setInputSearch("");
      } else {
        toast.error("Searched video not found!");
      }
    } catch (error) {
      toast.error("Searched video not found!");
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
            onClick={() => navigate("/")}
          >
            Stream Tube
          </Typography>

          <div className="header__search">
            <form action="" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
              />
              <IconButton style={{ width: 50 }}>
                <SearchIcon />
              </IconButton>
            </form>
          </div>

          <div className="header__icons">
            <IconButton
              className="header__icon search"
              onClick={() => setIsShowModal(true)}
            >
              <Search />
            </IconButton>
            <IconButton onClick={() => navigate("/video/upload")}>
              <VideocamIcon />
            </IconButton>
            <IconButton onClick={handleClick}>
              <Avatar sx={{ width: 30, height: 30 }} />
            </IconButton>
          </div>
        </Toolbar>
        <SimpleModal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />

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
                {userData?.name}
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
              <MenuItem onClick={() => navigate("/login")}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                Login
              </MenuItem>
              <MenuItem onClick={() => navigate("/register")}>
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
