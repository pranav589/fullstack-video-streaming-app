import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./DetailVideoPage.css";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import RelatedVideos from "../../components/RelatedVideos/RelatedVideos";
import "./DetailVideoPage.css";
import Loader from "../../components/Loader/Loader";

function DetailVideoPage() {
  const { videoId } = useParams();
  const videoVariable = {
    videoId: videoId,
  };
  const [video, setVideo] = useState([]);

  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((res) => {
      if (res.data.success) {
        setVideo(res.data.video);
      } else {
        alert("Failed to get video info.");
      }
    });
  }, [videoId]);

  if (video.writer) {
    return (
      <div id="showcase">
        <div>
          <VideoPlayer
            video={video}
            userTo={video.writer._id}
            userFrom={localStorage.getItem("userId")}
          />
        </div>
        <RelatedVideos />
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default DetailVideoPage;
