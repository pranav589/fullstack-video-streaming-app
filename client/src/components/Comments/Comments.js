import { Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import SingleComment from "../SingleComment/SingleComment";
import ReplyComment from "../ReplyComment/ReplyComment";
import SendIcon from "@mui/icons-material/Send";
import "./Comments.css";

function Comments(props) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: comment,
      writer: userId,
      postId: props.postId,
    };

    axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        setComment("");
        props.refreshFunction(res.data.result);
      } else {
        toast.error("Failed to comment!");
      }
    });
  };

  return (
    <div className="comments">
      <br />
      <Typography variant="h6">Comments</Typography>
      <hr />
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <div key={comment._id}>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  commentLists={props.commentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </div>
            )
        )}
      <div style={{ display: "flex" }}>
        <TextField
          fullWidth
          onChange={handleChange}
          value={comment}
          placeholder="Comment Here"
        />
        <IconButton onClick={handleSubmit}>
          <SendIcon fontSize="large" color="primary" />
        </IconButton>
      </div>
    </div>
  );
}

export default Comments;
