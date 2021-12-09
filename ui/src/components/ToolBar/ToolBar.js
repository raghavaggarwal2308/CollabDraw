import React, { useEffect } from "react";
import "./ToolBar.css";
import Pencil from "@material-ui/icons/Create";
import Rectangle from "@material-ui/icons/CropDin";
import Circle from "@material-ui/icons/RadioButtonUnchecked";
import Line from "@material-ui/icons/Remove";
import ClearAll from "@material-ui/icons/DeleteSweep";
import Eraser from "@material-ui/icons/BorderClear";
import Undo from "@material-ui/icons/Undo";
import Redo from "@material-ui/icons/Redo";
import Select from "@material-ui/icons/PhotoSizeSelectSmall";

function ToolBar({ setshapeType }) {
  return (
    <div className="topContainer">
      <div className="eraserContainer">
        <Eraser />
      </div>
      <div className="selectContainer">
        <Select />
      </div>
      <div className="pencilConntainer">
        <Pencil />
      </div>
      <div className="rectangleContainer">
        <Rectangle />
      </div>
      <div className="circleContainer">
        <Circle />
      </div>
      <div className="lineContainer">
        <Line />
      </div>
      <div className="clearBoardContainer">
        <ClearAll />
      </div>
      <div className="undoContainer">
        <Undo />
      </div>
      <div className="redoContainer">
        <Redo />
      </div>
    </div>
  );
}

export default ToolBar;
