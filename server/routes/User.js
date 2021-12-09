const express = require("express");
const route = express.Router();
const { addUser, loginUser } = require("../controllers/User.js");

route.post("/add", addUser);
route.post("/login", loginUser);

module.exports = route;
