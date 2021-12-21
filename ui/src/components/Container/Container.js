import React, { useState } from "react";
import Board from "../Board/Board";
import ToolBar from "../ToolBar/ToolBar";
import SideBar from "../SideBar/SideBar";

function Container({ socket }) {
  const [shape, setShape] = useState("rectangle");
  const [deselect, setdeselect] = useState(false);
  const deselectAll = (e) => {
    if (e.target.className !== "upper-canvas ") {
      setdeselect(true);
    }
  };
  return (
    <div onClick={deselectAll}>
      <ToolBar setShape={setShape} />
      <Board
        shape={shape}
        setShape={setShape}
        socket={socket}
        deselect={deselect}
        setdeselect={setdeselect}
      />
      <SideBar shape={shape} />
    </div>
  );
}

export default Container;
