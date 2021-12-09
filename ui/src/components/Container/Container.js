import React from "react";
import Board from "../Board/Board";
import ToolBar from "../ToolBar/ToolBar";
import SideBar from "../SideBar/SideBar";

function Container() {
  return (
    <div>
      <ToolBar />
      <Board />
      <SideBar />
    </div>
  );
}

export default Container;
