import React, { useState } from "react";

import axios from "axios";
import { storage } from "../../firebase";
import { Line } from "rc-progress";

import { Box, TextField, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dropzone from "react-dropzone";
import "./UploadPage.css";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [category, setCategory] = useState("Film and Animations");

  const [imageAsUrl, setImageAsUrl] = useState("");

  const [videoAsUrl, setVideoAsUrl] = useState("");

  const [videoProgress, setVideoProgress] = useState(0);

  const [thumbnailProgress, setThumbnailProgress] = useState(0);

  const onDropVideo = (e) => {
    if (e[0].path === "") {
      return console.log("Not a video");
    }
    console.log(e);
    const uploadTask = storage.ref(`/videos/${e[0].name}`).put(e[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressVal = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setVideoProgress(progressVal);
      },
      (err) => {
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("videos")
          .child(e[0].name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            console.log({ videoUrl: firebaseUrl });
            setVideoAsUrl((prevObject) => ({
              ...prevObject,
              videoUrl: firebaseUrl,
            }));
          });
      }
    );
  };

  const onDropThumbnail = (e) => {
    console.log("Start of image upload");
    if (e[0].path === "") {
      console.error("Not an image");
    }

    const uploadTask = storage.ref(`/thumbnails/${e[0].name}`).put(e[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressVal = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setThumbnailProgress(progressVal);
      },
      (err) => {
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("thumbnails")
          .child(e[0].name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            console.log({ imageUrl: firebaseUrl });
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imageUrl: firebaseUrl,
            }));
          });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData && !userData.isAuth) {
      return toast.error("Please login to upload");
    }
    if (
      title === "" ||
      desc === "" ||
      privacy === "" ||
      videoAsUrl === "" ||
      category === "" ||
      imageAsUrl === ""
    ) {
      return toast.error("Please fill all the input fields");
    }

    const data = {
      writer: userData._id,
      title: title,
      description: desc,
      privacy: privacy,
      filePath: videoAsUrl.videoUrl,
      category: category,
      duration: 10,
      thumbnail: imageAsUrl.imageUrl,
    };

    axios.post("/api/video/uploadVideo", data).then((res) => {
      if (res.data.success) {
        toast.success("Video uploaded!");
        navigate("/");
      } else {
        toast.error("Failed to upload");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <Typography variant="h6" mb={2} textAlign={"center"}>
        Upload Video
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="drop-container"
        >
          <div className="dropzone-first">
            <Dropzone onDrop={(e) => onDropVideo(e)}>
              {({ getRootProps, getInputProps }) => (
                <div className="drop-box" {...getRootProps()}>
                  <input {...getInputProps()} />

                  <div
                    style={{
                      backgroundColor: "#EBEBEB",
                      borderRadius: "50%",
                      padding: 30,
                    }}
                  >
                    <AddIcon />
                  </div>
                  <h6>Upload Video</h6>
                  {videoAsUrl && (
                    <video
                      className="drop__imgPreview"
                      src={videoAsUrl?.videoUrl}
                      controls
                    ></video>
                  )}
                </div>
              )}
            </Dropzone>
            <Line
              percent={videoProgress}
              strokeWidth="4"
              strokeColor="red"
              style={{ marginBottom: 10 }}
            />
          </div>

          <div>
            <Dropzone onDrop={(e) => onDropThumbnail(e)}>
              {({ getRootProps, getInputProps }) => (
                <div className="drop-box" {...getRootProps()}>
                  <input {...getInputProps()} />

                  <div
                    style={{
                      backgroundColor: "#EBEBEB",
                      borderRadius: "50%",
                      padding: 30,
                    }}
                  >
                    <AddIcon />
                  </div>
                  <h6>Upload Thumbnail</h6>
                  {imageAsUrl && (
                    <img
                      className="drop__imgPreview"
                      src={imageAsUrl?.imageUrl}
                      alt=""
                    />
                  )}
                </div>
              )}
            </Dropzone>
            <Line
              percent={thumbnailProgress}
              strokeWidth="4"
              strokeColor="red"
              style={{ marginBottom: 10 }}
            />
          </div>
        </div>
        <div className="inputs">
          <TextField
            margin="normal"
            required
            fullWidth
            id="tile"
            label="Video Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value.toLowerCase())}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="desc"
            label="Video Description"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="upload-button"
          >
            Upload
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default UploadPage;
