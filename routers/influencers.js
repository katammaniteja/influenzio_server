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

router.post("/work-experience", authenticate, async (req, res) => {
  try {
    const id = req.id;
    const influencer = await Influencer.findById(id);
    influencer.work_experience.push(req.body);
    await influencer.save();
    res.status(200).json({ message: "Added Successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/work-experience", authenticate, async (req, res) => {
  try {
    // console.log(req);
    const user_id = req.id;
    const we_id = req.body.id;
    // console.log(req.we_id);
    console.log(user_id, we_id);
    const influencer = await Influencer.findById(user_id);
    const work_experience = influencer.work_experience.filter(
      (item) => item._id !== we_id
    );
    influencer.work_experience = work_experience;
    await influencer.save();
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
