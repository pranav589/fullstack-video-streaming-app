import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import "../HomePage/HomePage.css";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";

function TrendingVideoPage() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.post("/api/video/getTrendingVideos").then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setVideos(res.data.videos);
        setIsLoading(false);
      } else {
        toast.error("Failed to fetch videos");
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
            <span>{video.writer.name}</span>
          </div>
        </div>
        <div className="videoViews">
          <VisibilityIcon color="primary" />
          <span>{video.views}</span>
        </div>
      </div>
    </Link>
  ));

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="videos">
      <Typography variant="h6" textAlign={"center"} mb={2} mt={2}>
        Trending Videos
      </Typography>

      <div className="videos__container">{renderCards}</div>
    </div>
  );
}

export default TrendingVideoPage;
