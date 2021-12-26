const express = require("express");
const route = express.Router();
const {
  addFigure,
  updateFigure,
  getFigures,
} = require("../controllers/Room.js");

route.post("/addFigure", addFigure);
route.patch("/updateFigure", updateFigure);
route.get("/getFigures", getFigures);

module.exports = route;
