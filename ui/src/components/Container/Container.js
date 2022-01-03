import React, { useState } from "react";
import Board from "../Board/Board";
import ToolBar from "../ToolBar/ToolBar";
import SideBar from "../SideBar/SideBar";
import { Redirect } from "react-router-dom";

function Container({ socket }) {
  const [shape, setShape] = useState("pencil");
  const [deselect, setdeselect] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);
  const [lineColor, setLineColor] = useState("black");
  const username = window.location.pathname.split("/")[2].trim().toLowerCase();
  const roomname = window.location.pathname.split("/")[3].trim().toLowerCase();
  const deselectAll = (e) => {
    if (e.target.className !== "upper-canvas ") {
      setdeselect(true);
    }
  };
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <>
      {isAuthenticated === "true" ? (
        <div onClick={deselectAll}>
          <ToolBar
            shape={shape}
            setShape={setShape}
            username={username}
            roomname={roomname}
          />
          <Board
            shape={shape}
            setShape={setShape}
            socket={socket}
            deselect={deselect}
            setdeselect={setdeselect}
            lineColor={lineColor}
            lineWidth={lineWidth}
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            username={username}
            roomname={roomname}
          />
          <SideBar
            shape={shape}
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            lineColor={lineColor}
            lineWidth={lineWidth}
            username={username}
            roomname={roomname}
          />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Container;
