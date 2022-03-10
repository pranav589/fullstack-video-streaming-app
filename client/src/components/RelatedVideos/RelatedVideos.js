import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./RelatedVideos.css";

function RelatedVideos() {
  const params = useParams();
  const [sideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params]);

  const fetchVideos = async () => {
    try {
      const res = await axios.post("/api/video/getRecommendedVideos", {
        videoId: params.videoId,
      });
      if (res.data.success) {
        setSideVideos(res.data.videos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [params]);

  const sideVideoItem = sideVideos.map((video) => {
    return (
      <Link className="reco-content" to={`/video/${video._id}`} key={video._id}>
        <div className="reco-image">
          <img src={video.thumbnail} />
        </div>
        <div className="reco-details">
          <p className="reco-title">{video.title}</p>
          <p className="secondary-text">{video.writer.name}</p>
        </div>
      </Link>
    );
  });

  return (
    <aside className="reco-container">
      <div className="chat-btn">
        <a href="#" className="secondary-text">
          {" "}
          OTHER VIDEOS
        </a>
      </div>
      <hr className="line-break" />
      {sideVideoItem}
    </aside>
  );
}

export default RelatedVideos;
