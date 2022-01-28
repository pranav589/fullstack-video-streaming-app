import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import "./SimpleModal.css";
import { TextField } from "@mui/material";

export default function SimpleModal({ isShowModal, setIsShowModal }) {
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState("");
  const handleClose = () => setIsShowModal(false);

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
    setIsShowModal(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isShowModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="modal">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
            className="modal__input"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <Button
            variant="contained"
            className="modal__button"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </Modal>
    </div>
  );
}
