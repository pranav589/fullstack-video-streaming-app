import React from "react";
import LikeDisLike from "../LikeDislike/LikeDislike";
import Subscribe from "../Subscribe/Subscribe";
import "./VideoPlayer.css";
import { IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function VideoPlayer({ video }) {
  return (
    <main className="video-container">
      <div className="video-content">
        <video
          src={video.filePath}
          controls
          className="video-video"
          height="315"
        ></video>
      </div>
      <div className="video-data">
        <p className="video__title">{video.title}</p>
        <div className="interactions">
          <div className="views">
            <IconButton>
              <VisibilityIcon fontSize="large" color="primary" />
            </IconButton>
            <span>{video.views} </span>
          </div>

          <LikeDisLike video={video} />
        </div>
      </div>

      <hr className="line-break" />

      <div className="video-description">
        <div className="profile">
          <div className="profile-desc">
            <img src={video.writer.image} alt="" />
            <Typography variant="h6">{video.writer.name} </Typography>
          </div>
          <div className="profile-info">
            <p>{video.description}</p>
          </div>
        </div>

        <Subscribe
          userTo={video.writer._id}
          userFrom={localStorage.getItem("userId")}
        />
      </div>

      <hr className="line-break" />
    </main>
  );
}

export default VideoPlayer;
