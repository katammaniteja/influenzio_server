const mongoose = require("mongoose");

const dbURI = process.env.DATABASE;

mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));
