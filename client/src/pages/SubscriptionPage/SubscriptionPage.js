import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import "../HomePage/HomePage.css";
import useAuth from "../../hooks/useAuth";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SubscriptionPage() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const variable = {
    userFrom: localStorage.getItem("userId"),
  };

  useEffect(() => {
    setIsLoading(true);
    axios.post("/api/video/getSubscriptionVideos", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
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
