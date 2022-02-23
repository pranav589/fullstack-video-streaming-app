import React from "react";
import { Link } from "react-router-dom";
import "./VideoRow.css";

const VideoRow = ({ views, desc, channel, title, image, videoId }) => {
  return (
    <div className="videoRow">
      <Link to={`/video/${videoId}`}>
        <img src={image} alt={channel} />
      </Link>
      <div className="videoRow__text">
        <Link to={`/video/${videoId}`}>
          <h3>{title}</h3>
        </Link>
        <p className="videoRow__headline">{views} views </p>
        <p className="videoRow__desc">{desc}</p>
      </div>
    </div>
  );
};
export default VideoRow;
