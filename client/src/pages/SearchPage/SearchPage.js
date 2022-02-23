import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./SearchPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import VideoRow from "../../components/VideoRow/VideoRow";
import { Divider, Typography } from "@mui/material";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [getVideos, setGetVideos] = useState([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setLoading(true);
    const searchTerm = location.pathname.split("/")[2];

    axios
      .post("/api/video/search", { searchTerm }, { cancelToken: source.token })
      .then((r) => {
        if (!r.data) {
          setLoading(false);
          toast.error("No video found!");
        } else {
          setGetVideos(r.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Cancelled");
        } else {
          throw error;
        }
      });
    return () => {
      source.cancel();
    };
  }, [location]);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="searchPage">
      <div className="searchPage__videos">
        <Typography
          style={{ marginLeft: "2%", marginBottom: "15px" }}
          variant="h6"
          textAlign="center"
        >
          Videos
        </Typography>
        <Divider />
        <div>
          {getVideos?.map((v, i) => {
            return (
              <VideoRow
                key={i}
                views={v.views}
                desc={v.description}
                channel={v.writer.name}
                videoId={v._id}
                title={v.title}
                image={v.thumbnail ? v.thumbnail : ""}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
