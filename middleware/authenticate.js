const jwt = require("jsonwebtoken");
const Influencer = require("./../models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.replace("Token ", "");
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await Influencer.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User Not Found");
    }
    req.token = token;
    req.email = rootUser.email;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized access: No token provided");
  }
};
module.exports = authenticate;
