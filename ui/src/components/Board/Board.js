import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import "./Board.css";
function Board() {
  useEffect(() => {
    var canvas = new fabric.Canvas("canvas");
    canvas.setDimensions({
      height: 400,
      width: 800,
    });
  }, []);
  return <canvas id="canvas"></canvas>;
}

export default Board;
