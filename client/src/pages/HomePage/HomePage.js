import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

import "./HomePage.css";
import Loader from "../../components/Loader/Loader";

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/video/getVideos").then((res) => {
      if (res.data.success) {
        setVideos(res.data.videos);
        setIsLoading(false);
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
            <p className="writer-name">{video.writer.name}</p>
          </div>
        </div>
      </div>
    </Link>
  ));

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="videos">
        <Typography variant="h6" textAlign={"center"} mb={2} mt={2}>
          Recommended
        </Typography>
        <div className="videos__container">{renderCards}</div>
      </div>
    );
  }
}

export default HomePage;
