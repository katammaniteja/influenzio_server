const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Influencer = require("../models/userSchema");

router.get("/about", async (req, res) => {
  try {
    const id = req.query.id;
    const about = await Influencer.findById(id, { tokens: 0, password: 0 });
    res.status(200).json(about);
  } catch (error) {
    console.log(error);
  }
});

router.put("/about", authenticate, async (req, res) => {
  try {
    const id = req.body._id;
    await Influencer.findOneAndUpdate({ _id: id }, { ...req.body });
    res.status(201).json({ message: "Your Profile Updated" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/influencers", async (req, res) => {
  try {
    const influencers = await Influencer.find(
      {},
      {
        password: 0,
        tokens: 0,
      }
    );
    res.status(200).json(influencers);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
