const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const auth = (request, response, next) => {
  try {
    const token = request.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findOne({ _id: decode._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    response.status(401).send({ message: "Please Authorize" });
  }
};
module.exports = auth;
