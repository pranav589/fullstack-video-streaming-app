const express = require("express");
const router = express.Router();
const multer = require("multer");
const { User } = require("../models/User");
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const { Subscriber } = require("../models/Subscriber");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 file is allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             User
//=================================

router.post("/uploadFiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filepath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body);

  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.json({ success: true });
  });
});

router.get("/getVideos", (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).json({ success: false, err });
      res.json({ success: true, videos });
    });
});

router.post("/getVideo", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, video });
    });
});

router.post("/getSubscriptionVideos", (req, res) => {
  //find all the user that i am subscribing to
  Subscriber.find({ userFrom: req.body.userFrom }).exec((err, subscribers) => {
    if (err) return res.status(400).json({ success: false, err });
    let subscribedUser = [];
    subscribers.map((subscriber) => {
      subscribedUser.push(subscriber.userTo);
    });
    //fetch the videos that belongs to my subscription
    Video.find({ writer: { $in: subscribedUser } })
      .populate("writer")
      .exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.json({ success: true, videos });
      });
  });
});

router.post("/searchVideo", (req, res) => {
  console.log(req.body);
  Video.findOne({ title: req.body.inputSearch })
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, video });
    });
});

router.post("/getRecommendedVideos", (req, res) => {
  let videoId = req.body.videoId;

  Video.findOneAndUpdate({ _id: videoId }).exec((err, vdo) => {
    if (err) {
      console.log(err);
    }
    Video.find({ _id: { $ne: req.body.videoId } })
      .limit(5)
      .populate("writer")
      .exec((err, videos) => {
        if (err) {
          return res.status(400).json({ error: err });
        }

        return res.status(200).json({ success: true, videos });
      });
  });
});

module.exports = router;
