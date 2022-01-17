import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import ToolBar from "../ToolBar/ToolBar";
import SideBar from "../SideBar/SideBar";
import RoomUsers from "../RoomUsers/RoomUsers";
import { Redirect } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";

function Container({ socket }) {
  window.onunload = function (e) {
    alert("hi");
    console.log(e);
  };
  window.onbeforeunload = function (e) {
    return "Do you want to refresh?";
  };
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    console.log(history);
    if (!location.state) {
      history.push("/404");
    }
    // else if (location.state.valid === false) {
    //   history.push("/join");
    // } else {
    //   const state = { ...history.location.state };
    //   state.valid = false;
    //   history.replace({ ...history.location, state });
    // }
    window.addEventListener("popstate", (e) => {
      if (window.location.href === "http://localhost:3000/join") {
        socket.emit("disconnectUser", { username, roomname });
        console.log("disconnected");
      }
    });

    // eslint-disable-next-line
  }, []);
  socket.on("users", ({ users, roomname: room }) => {
    if (roomname === room) {
      setroomUsers([...users]);
    }
  });
  const [shape, setShape] = useState("pencil");
  const [deselect, setdeselect] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);
  const [lineColor, setLineColor] = useState("black");
  const [fillColor, setFillColor] = useState("");
  const [lineStyle, setLineStyle] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [showSidebar, setshowSidebar] = useState(false);
  const [imageType, setimageType] = useState("");
  const [lock, setlock] = useState(false);
  const [roomUsers, setroomUsers] = useState([]);
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
        <div>
          <ToolBar
            shape={shape}
            setShape={setShape}
            username={username}
            roomname={roomname}
            setshowSidebar={setshowSidebar}
            deselectAll={deselectAll}
            lock={lock}
            setlock={setlock}
          />
          <Board
            showSidebar={showSidebar}
            setshowSidebar={setshowSidebar}
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
            fillColor={fillColor}
            setFillColor={setFillColor}
            lineStyle={lineStyle}
            setLineStyle={setLineStyle}
            opacity={opacity}
            setOpacity={setOpacity}
            lock={lock}
            setlock={setlock}
            imageType={imageType}
            setroomUsers={setroomUsers}
          />
          <SideBar
            showSidebar={showSidebar}
            shape={shape}
            setShape={setShape}
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            lineColor={lineColor}
            lineWidth={lineWidth}
            username={username}
            roomname={roomname}
            fillColor={fillColor}
            setFillColor={setFillColor}
            lineStyle={lineStyle}
            setLineStyle={setLineStyle}
            opacity={opacity}
            setOpacity={setOpacity}
            setimageType={setimageType}
          />
          <RoomUsers roomUsers={roomUsers} username={username} />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Container;
