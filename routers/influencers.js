const express = require("express");
const router = express.Router();
const About = require("./../models/aboutSchema");

router.get("/influencers", async (req, res) => {
  try {
    const influencers = await About.find();
    res.status(200).json(influencers);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
