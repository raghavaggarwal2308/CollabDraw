import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import ToolBar from "../ToolBar/ToolBar";
import SideBar from "../SideBar/SideBar";
import RoomUsers from "../RoomUsers/RoomUsers";
import RoomName from "../RoomName/RoomName";
import { Redirect } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { remove, add } from "../../api/Room";
import LogoutIcon from "@mui/icons-material/Logout";
import SidebarIcon from "@mui/icons-material/DensitySmall";
import GroupIcon from "@mui/icons-material/Group";
import "./Container.css";

function Container({ socket, logOut }) {
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
  const [displayUsers, setdisplayUsers] = useState(false);
  const [displaySidebar, setdisplaySidebar] = useState(true);
  const [lineColor, setLineColor] = useState("black");
  const [fillColor, setFillColor] = useState("transparent");
  const [lineStyle, setLineStyle] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [showSidebar, setshowSidebar] = useState(true);
  const [imageType, setimageType] = useState("");
  const [lock, setlock] = useState(false);
  const [roomUsers, setroomUsers] = useState([]);
  const username = window.location.pathname.split("/")[2].trim().toLowerCase();
  const roomname = window.location.pathname.split("/")[3].trim().toLowerCase();

  useEffect(() => {
    socket.on("updateUsersList", ({ users, room }) => {
      if (roomname === room) setroomUsers(users);
    });
    window.onbeforeunload = function (e) {
      return "Do you want to refresh?";
    };
    window.addEventListener("unload", async () => {
      await remove(username, roomname);
      sessionStorage.setItem("xyz", true);
    });

    add(username, roomname);
    if (sessionStorage.getItem("active") === "false") {
      history.goBack();
    }
    if (!location.state) {
      history.push("/404");
    }

    window.addEventListener("popstate", (e) => {
      if (window.location.href === "http://localhost:3000/join") {
        sessionStorage.setItem("active", false);
        window.onbeforeunload = function (e) {};
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
          />
          {displaySidebar && (
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
            />
          )}
          {location.state != null && location.state.singleroom === false && (
            <RoomUsers
              roomUsers={roomUsers}
              username={username}
              displayUsers={displayUsers}
            />
          )}
          <div className="containerBottomLeft">
            <div
              className="containerSidebarButton"
              onClick={() => setdisplaySidebar(!displaySidebar)}
              title={!displaySidebar ? "Display Sidebar" : "Hide Sidebar"}
            >
              <SidebarIcon />
            </div>
          </div>
          <div className="containerBottomRight">
            <div className="containerLogout" onClick={logOut} title="Logout">
              <LogoutIcon />
            </div>
            {location.state != null && location.state.singleroom === false && (
              <>
                {" "}
                <RoomName roomname={roomname} />
                <div
                  className="containerUsers"
                  onClick={() => {
                    setdisplayUsers(!displayUsers);
                  }}
                  title="Users in Room"
                >
                  <GroupIcon />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Container;
