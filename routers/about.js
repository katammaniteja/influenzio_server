const express = require("express");
const router = express.Router();
const About = require("./../models/aboutSchema");
const authenticate = require("./../middleware/authenticate");

router.post("/about", async (req, res) => {
  try {
    const { id } = req.body;
    const about = await About.findById(id);
    res.status(200).json(about);
  } catch (error) {
    console.log(error);
  }
});

router.put("/about", authenticate, async (req, res) => {
  try {
    const email = req.email;
    await About.findOneAndUpdate({ email: email }, { ...req.body });
    res.status(201).json({ message: "Your Profile Updated" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
