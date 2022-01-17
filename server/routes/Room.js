const express = require("express");
const route = express.Router();
const {
  addFigure,
  updateFigure,
  getFigures,
  clearCanvas,
  changeLineColor,
  changeLineWidth,
  changeShape,
  undoFigure,
  changeFillColor,
  changeStyleSlider,
  changeOpacity,
  changeLock,
  changeshowSidebar,
  remove,
  add,
} = require("../controllers/Room.js");

route.post("/addFigure", addFigure);
route.patch("/updateFigure", updateFigure);
route.get("/getFigures", getFigures);
route.patch("/clearCanvas", clearCanvas);
route.patch("/changeLineColor", changeLineColor);
route.patch("/changeLineWidth", changeLineWidth);
route.patch("/changeShape", changeShape);
route.patch("/changeFillColor", changeFillColor);
route.patch("/changeStyleSlider", changeStyleSlider);
route.patch("/changeOpacity", changeOpacity);
route.patch("/undoFIgure", undoFigure);
route.patch("/redoFigure", undoFigure);
route.patch("/changeLock", changeLock);
route.patch("/changeshowSidebar", changeshowSidebar);
route.patch("/remove", remove);
route.patch("/add", add);

module.exports = route;
