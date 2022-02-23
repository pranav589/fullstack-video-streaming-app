const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, userEmail) => {
    if (userEmail) {
      return res.status(400).json({ message: "Email already exist." });
    }
    const user = new User(req.body);
    user.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.status(401).json({
        loginSuccess: false,
        message: "Authentication failed. Email not found!",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res
          .status(404)
          .json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          token: user.token,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post("/singleUser", (req, res) => {
  const { name } = req.body;
  User.findOne({ name }).then((data) => {
    if (!data) {
      return res
        .status(400)
        .json({ success: false, error: true, msg: "User not found!" });
    }
    return res.json({ data });
  });
});

router.post("/searchUser", (req, res) => {
  const { searchTerm } = req.body;

  User.find({ name: searchTerm }, (err, data) => {
    if (err) {
      return res.status(400).json({ success: false, error: true, err });
    }
    return res.json({ data });
  });
});

module.exports = router;
