import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

import "../HomePage/HomePage.css";
import useAuth from "../../hooks/useAuth";

function SubscriptionPage() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);

  const variable = {
    userFrom: localStorage.getItem("userId"),
  };

  useEffect(() => {
    axios.post("/api/video/getSubscriptionVideos", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setVideos(res.data.videos);
      } else {
        alert("Failed to fetch videos");
      }
    });
  }, []);

  const renderCards = videos.map((video, index) => (
    <Link className="video" to={`/video/${video._id}`} key={video._id}>
      <div className="video__thumbnail">
        <img src={video.thumbnail} alt="" />
      </div>
      <div className="video__details">
        <div className="author">
          <img src={video.writer.image} alt="" />
        </div>
        <div className="title">
          <div>
            <p>{video.title}</p>
            <p>{video.writer.name}</p>
          </div>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className="videos">
      {user ? (
        <>
          <Typography variant="h6" textAlign={"center"} mb={2} mt={2}>
            Subscribed Channel Videos
          </Typography>

          <div className="videos__container">{renderCards}</div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Typography variant="h6" mb={2} mt={2}>
            Please Login to see your subscriptions!
          </Typography>
          <Link to="/login" style={{ textDecoration: "underline" }}>
            Click here.
          </Link>
        </div>
      )}
    </div>
  );
}

export default SubscriptionPage;
