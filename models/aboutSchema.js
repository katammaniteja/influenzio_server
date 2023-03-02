const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contact: String,
    location: String,
    profilePic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    twitter: String,
    youtube: String,
    linkedin: String,
    instagram: String,
    work_experience: [
      {
        organization: {
          type: String,
          required: true,
        },
        start_date: {
          type: Date,
          required: true,
        },
        end_date: {
          type: Date,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const About = mongoose.model("ABOUT", aboutSchema);
module.exports = About;
