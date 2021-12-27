import React from "react";
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
import { changeShape } from "../../api/Room";

function ToolBar({ setShape, roomname, username }) {
  const changeShapeType = (shape) => {
    setShape(shape);
    changeShape(shape, roomname, username);
  };
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
      <div
        className="rectangleContainer"
        onClick={() => changeShapeType("rectangle")}
      >
        <Rectangle />
      </div>
      <div
        className="circleContainer"
        onClick={() => changeShapeType("ellipse")}
      >
        <Circle />
      </div>
      <div className="lineContainer">
        <Line />
      </div>
      <div
        className="clearBoardContainer"
        onClick={() => changeShapeType("clear")}
      >
        <ClearAll />
      </div>
      <div className="undoContainer" onClick={() => changeShapeType("undo")}>
        <Undo />
      </div>
      <div className="redoContainer" onClick={() => changeShapeType("redo")}>
        <Redo />
      </div>
    </div>
  );
}

export default ToolBar;
