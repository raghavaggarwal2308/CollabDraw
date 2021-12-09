const express = require("express");
const route = express.Router();
const { addUser } = require("../controllers/User.js");

route.post("/add", addUser);

module.exports = route;
