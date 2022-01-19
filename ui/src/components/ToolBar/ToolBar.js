import React from "react";
import "./ToolBar.css";
import Pencil from "@mui/icons-material/Create";
import Rectangle from "@mui/icons-material/CropDin";
import Circle from "@mui/icons-material/RadioButtonUnchecked";
import Line from "@mui/icons-material/Remove";
import ClearAll from "@mui/icons-material/DeleteSweep";
import Undo from "@mui/icons-material/Undo";
import Redo from "@mui/icons-material/Redo";
import Select from "@mui/icons-material/PhotoSizeSelectSmall";
// import Text from "@mui/icons-material/TextFormat";
// import Text from "@mui/icons-material/Abc";
import Download from "@mui/icons-material/Download";
import Lock from "@mui/icons-material/LockOpen";
import Locked from "@mui/icons-material/Lock";

import { changeShape, changeLock, changeshowSidebar } from "../../api/Room";

function ToolBar({
  shape,
  setShape,
  roomname,
  username,
  deselectAll,
  setshowSidebar,
  setselectedShape,
  lock,
  setlock,
}) {
  const updateLock = (e) => {
    let temp = !lock;
    setlock(temp);
    changeLock(temp, roomname, username);
  };
  const changeShapeType = (shape, event) => {
    setShape(shape);
    changeShape(shape, roomname, username);
    setselectedShape("");
    if (
      shape !== "selection" &&
      shape !== "redo" &&
      shape !== "undo" &&
      shape !== "clear" &&
      shape !== "download"
    ) {
      setshowSidebar(true);
      changeshowSidebar(true, roomname, username);
    } else {
      setshowSidebar(false);
      changeshowSidebar(false, roomname, username);
    }
  };
  return (
    <div className="topContainer" onClick={deselectAll}>
      {/* <div
        className={`eraserContainer ${shape === "eraser" && "buttonBack"}`}
        onClick={(e) => changeShapeType("eraser", e)}
      >
        <Eraser />
      </div> */}
      <div
        className={`lockContainer ${lock && "buttonBack"}`}
        onClick={(e) => updateLock(e)}
      >
        {lock ? <Locked /> : <Lock />}
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
        className={`textContainer ${shape === "text" && "buttonBack"}`}
        onClick={(e) => changeShapeType("text", e)}
      >
        {/* <Text /> */}
        <span style={{ fontSize: "21px", fontWeight: "450" }}>A</span>
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
      <div
        className="redoContainer"
        onClick={(e) => changeShapeType("download", e)}
      >
        <Download />
      </div>
    </div>
  );
}

export default ToolBar;
