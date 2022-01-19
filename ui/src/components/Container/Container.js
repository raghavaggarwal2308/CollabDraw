import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import ToolBar from "../ToolBar/ToolBar";
import SideBar from "../SideBar/SideBar";
import RoomUsers from "../RoomUsers/RoomUsers";
import { Redirect } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { remove, add } from "../../api/Room";

function Container({ socket }) {
  window.onunload = function (e) {
    console.log(e);
  };

  const location = useLocation();
  const history = useHistory();

  socket.on("users", ({ users, roomname: room }) => {
    if (roomname === room) {
      setroomUsers([...users]);
    }
  });
  const [shape, setShape] = useState("pencil");
  const [selectedShape, setselectedShape] = useState("");
  const [deselect, setdeselect] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);
  const [lineColor, setLineColor] = useState("black");
  const [fillColor, setFillColor] = useState("");
  const [lineStyle, setLineStyle] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [textDecoration, settextDecoration] = useState("");
  const [showSidebar, setshowSidebar] = useState(false);
  const [imageType, setimageType] = useState("");
  const [lock, setlock] = useState(false);
  const [roomUsers, setroomUsers] = useState([]);
  const username = window.location.pathname.split("/")[2].trim().toLowerCase();
  const roomname = window.location.pathname.split("/")[3].trim().toLowerCase();
  // const getUser=async()=>{
  //   const user=awa
  // }
  useEffect(() => {
    window.onbeforeunload = function (e) {
      // const user = remove(username, roomname);
      // console.log(user);
      //remove(username, roomname);
      return "Do you want to refresh?";
    };
    window.addEventListener("unload", async () => {
      //sessionStorage.setItem("triggered", true);
      await remove(username, roomname);
      sessionStorage.setItem("xyz", true);
    });
    //const active = sessionStorage.getItem("active");
    //getUser()
    add(username, roomname);

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
            setselectedShape={setselectedShape}
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
            setselectedShape={setselectedShape}
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
            textDecoration={textDecoration}
          />
          <SideBar
            showSidebar={showSidebar}
            shape={shape}
            selectedShape={selectedShape}
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
            settextDecoration={settextDecoration}
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
