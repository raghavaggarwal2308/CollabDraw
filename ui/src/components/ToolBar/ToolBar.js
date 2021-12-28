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

function ToolBar({ shape, setShape, roomname, username }) {
  const changeShapeType = (shape, event) => {
    setShape(shape);
    changeShape(shape, roomname, username);
  };
  return (
    <div className="topContainer">
      <div
        className={`eraserContainer ${shape === "eraser" && "buttonBack"}`}
        onClick={(e) => changeShapeType("eraser", e)}
      >
        <Eraser />
      </div>
      <div
        className={`selectContainer ${shape === "selection" && "buttonBack"}`}
        onClick={(e) => changeShapeType("selection", e)}
      >
        <Select />
      </div>
      <div
        className={`pencilContainer ${shape === "pencil" && "buttonBack"}`}
        onClick={(e) => changeShapeType("pencil", e)}
      >
        <Pencil />
      </div>
      <div
        className={`rectangleContainer ${
          shape === "rectangle" && "buttonBack"
        }`}
        onClick={(e) => changeShapeType("rectangle", e)}
      >
        <Rectangle />
      </div>
      <div
        className={`circleContainer ${shape === "ellipse" && "buttonBack"}`}
        onClick={(e) => changeShapeType("ellipse", e)}
      >
        <Circle />
      </div>
      <div
        className={`lineContainer ${shape === "line" && "buttonBack"}`}
        onClick={(e) => changeShapeType("line", e)}
      >
        <Line />
      </div>
      <div
        className="clearBoardContainer"
        onClick={(e) => changeShapeType("clear", e)}
      >
        <ClearAll />
      </div>
      <div
        className="undoContainer"
        onClick={(e) => changeShapeType("undo", e)}
      >
        <Undo />
      </div>
      <div
        className="redoContainer"
        onClick={(e) => changeShapeType("redo", e)}
      >
        <Redo />
      </div>
    </div>
  );
}

export default ToolBar;
