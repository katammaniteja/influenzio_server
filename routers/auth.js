const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

const Influencer = require("../models/userSchema");
const About = require("./../models/aboutSchema");
const crypto = require("crypto");

router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  try {
    if (!email || !name || !password || !cpassword) {
      res.status(422).json({ error: "All fields are required" });
    } else if (password != cpassword) {
      res.status(422).json({ error: "Passwords are not matched" });
    } else {
      const userExist = await Influencer.findOne({ email: email });
      if (userExist) {
        res.status(422).json({ error: "Email already taken" });
      } else {
        const influencer = new Influencer({ email, password });
        await influencer.save();

        const about = new About({ email, name });
        await about.save();
        res.status(201).json({ message: "Registration Succcessful" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(422).json({ error: "All fields are required" });
    } else {
      const influencer = await Influencer.findOne({ email: email });
      if (!influencer) {
        res.status(422).json({ error: "Invalid email" });
      } else {
        const isValidUser = await bcrypt.compare(password, influencer.password);
        if (!isValidUser) {
          res.status(422).json({ error: "Invalid password" });
        } else {
          const token = await influencer.generateAuthToken();
          const about = await About.findOne({ email: email });
          res.status(200).json({ jwttoken: token, userId: about._id });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
