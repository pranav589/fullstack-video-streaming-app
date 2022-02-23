import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./DetailVideoPage.css";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import RelatedVideos from "../../components/RelatedVideos/RelatedVideos";
import "./DetailVideoPage.css";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import Comments from "../../components/Comments/Comments";
import useAuth from "../../hooks/useAuth";

function DetailVideoPage() {
  const { user } = useAuth();
  const { videoId } = useParams();
  const videoVariable = {
    videoId: videoId,
  };
  const [video, setVideo] = useState([]);

  const [commentLists, setCommentLists] = useState([]);

  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((res) => {
      if (res.data.success) {
        setVideo(res.data.video);
      } else {
        alert("Failed to get video info.");
      }
    });
  }, [videoId]);

  useEffect(() => {
    axios
      .post("/api/video/increaseView", videoVariable)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [videoId]);

  useEffect(() => {
    axios.post("/api/comment/getComments", videoVariable).then((res) => {
      if (res.data.success) {
        setCommentLists(res.data.comments);
      } else {
        console.log("failed to fetch");
      }
    });
  }, []);

  const updateComment = (newComment) => {
    setCommentLists(commentLists.concat(newComment));
  };

  if (video.writer) {
    return (
      <div id="showcase">
        <div className="main">
          <VideoPlayer
            video={video}
            userTo={video.writer._id}
            userFrom={localStorage.getItem("userId")}
          />

          {user && (
            <Comments
              commentLists={commentLists}
              postId={video._id}
              refreshFunction={updateComment}
            />
          )}
        </div>
        <div className="aside">
          <RelatedVideos />
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default DetailVideoPage;
