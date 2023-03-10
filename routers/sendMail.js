const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/send-mail", async (req, res) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transport = await nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        // user: "nicole83@ethereal.email",
        // pass: "uQVQyB6Cvzr2j5kYwJ",
        user: "dailytutiontutorial@gmail.com",
        pass: "fuvyaajhhnahgbym",
      },
    });

    let info = await transport.sendMail({
      from: '"Wayfarer 👻" <wayfarer@gmail.com>', // sender address
      to: "kvdmt2401@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.json(info);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
