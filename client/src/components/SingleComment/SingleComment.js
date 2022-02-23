import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import LikeDisLike from "../LikeDislike/LikeDislike";
import {
  Avatar,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import "./SingleComment.css";

function SingleComment(props) {
  const { user, userData } = useAuth();
  const [commentValue, setCommentValue] = useState("");
  const [openReply, setOpenReply] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onReply = () => {
    setOpenReply(!openReply);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const variables = {
      writer: userId,
      postId: props.postId,
      responseTo: props.comment._id,
      content: commentValue,
    };

    axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        setCommentValue("");
        setOpenReply(!openReply);
        props.refreshFunction(res.data.result);
      } else {
        toast.error("Failed to comment!");
      }
    });
  };

  return (
    <div>
      <div className="singleComment__user">
        <div className="singleComment__username">
          <Avatar src={props?.writer?.image}></Avatar>
          <Typography variant="subtitle2" className="writerName">
            {props.comment.writer.name}
          </Typography>
        </div>
        <p>{props.comment.content}</p>
        <div className="singleComment__userInteract">
          <LikeDisLike comment commentId={props.comment._id} userId={userId} />
          <div className="replyTo">
            <IconButton onClick={onReply}>
              <ReplyIcon fontSize="large" color="primary" />
            </IconButton>
            <span key="comment-basic-reply-to" style={{ cursor: "pointer" }}>
              Reply To{" "}
            </span>
          </div>
        </div>
      </div>
      {openReply && (
        <div style={{ display: "flex" }}>
          <TextField
            fullWidth
            onChange={handleChange}
            value={commentValue}
            placeholder="Post you comment"
            style={{ marginTop: 5, marginBottom: 5 }}
          />
          <br />
          <IconButton onClick={handleSubmit}>
            <SendIcon fontSize="large" color="primary" />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default SingleComment;
