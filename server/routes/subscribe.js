const express = require("express");
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");

router.post("/subscribeNumber", (req, res) => {
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).json({ success: false, err });
    res.json({ success: true, subscribeNumber: subscribe.length });
  });
});

router.post("/subscribed", (req, res) => {
  Subscriber.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscribe) => {
    if (err) return res.status(400).json({ success: false, err });

    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }

    res.json({ success: true, subscribed: result });
  });
});

router.post("/subscribe", (req, res) => {
  const subscribe = new Subscriber(req.body);
  subscribe.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.json({ success: true });
  });
});

router.post("/unsubscribe", (req, res) => {
  Subscriber.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.json({ success: true, doc });
  });
});

module.exports = router;
