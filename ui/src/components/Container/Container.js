import React, { useState } from "react";
import Board from "../Board/Board";
import ToolBar from "../ToolBar/ToolBar";
import SideBar from "../SideBar/SideBar";

function Container({ socket }) {
  const [shape, setShape] = useState("rectangle");
  return (
    <div>
      <ToolBar setShape={setShape} />
      <Board shape={shape} setShape={setShape} socket={socket} />
      <SideBar shape={shape} />
    </div>
  );
}

export default Container;
