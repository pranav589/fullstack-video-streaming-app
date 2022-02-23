const express = require("express");
const router = express.Router();

const { User } = require("../models/User");
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const { Subscriber } = require("../models/Subscriber");

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
      .sort({ _id: -1 })
      .exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        res.json({ success: true, videos });
      });
  });
});

router.post("/search", (req, res) => {
  Video.find({ title: req.body.searchTerm })
    .populate("writer")
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, data });
    });
});

router.post("/getRecommendedVideos", (req, res) => {
  let videoId = req.body.videoId;

  Video.findOneAndUpdate({ _id: videoId }).exec((err, vdo) => {
    if (err) {
      console.log(err);
    }
    Video.find({ _id: { $ne: req.body.videoId } })
      .sort({ views: -1 })
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

router.post("/increaseView", (req, res) => {
  const { videoId } = req.body;
  console.log(videoId);
  const updateViews = () => {
    Video.findOne({ _id: videoId }).then((data) => {
      Video.findByIdAndUpdate({ _id: videoId }, { views: data.views + 1 }).then(
        (v) => {
          return res.json({ views: v });
        }
      );
    });
  };
  updateViews();
});

router.post("/getTrendingVideos", (req, res) => {
  Video.find()
    .sort({ views: -1 })
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).json({ success: false, err });

      return res.json({ success: true, videos });
    });
});

module.exports = router;
