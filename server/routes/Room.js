const express = require("express");
const route = express.Router();
const {
  addFigure,
  updateFigure,
  getFigures,
  clearCanvas,
} = require("../controllers/Room.js");

route.post("/addFigure", addFigure);
route.patch("/updateFigure", updateFigure);
route.get("/getFigures", getFigures);
route.patch("/clearCanvas", clearCanvas);

module.exports = route;
