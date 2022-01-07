import React, { useState } from "react";
import "./Join.css";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Join(props) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const changeHandler = (e) => {
    const name = e.target.name;
    switch (name) {
      case "roomname":
        setRoomname(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      default:
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    props.socket.emit(
      "join",
      { roomname, username, singleroom: false },
      (error, message) => {
        if (error) {
          alert(error);
        } else {
          alert(message);
          history.push(`/board/${username}/${roomname}`);
          //window.location = `/board/${username}/${roomname}`;
        }
      }
    );
  };
  const joinSigleRoom = (e) => {
    let room = localStorage.getItem("roomname").trim().toLowerCase();
    let user = localStorage.getItem("username").trim().toLowerCase();

    props.socket.emit(
      "join",
      { roomname: room, username: user, singleroom: true },
      (error, message) => {
        if (error) {
          alert(error);
        } else {
          alert(message);
          history.push(`/board/${user}/${room}`);
          //window.location = `/board/${username}/${roomname}`;
        }
      }
    );
  };
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <>
      {isAuthenticated === "true" ? (
        <div className="joinRoomContainer">
          <form onSubmit={submitHandler} className="joinRoom">
            {/* <label>Name</label> */}
            <input
              value={username}
              name="username"
              type="text"
              onChange={changeHandler}
              placeholder="Username"
              className="username"
            />
            {/* <label>Room name</label> */}
            <input
              value={roomname}
              name="roomname"
              type="text"
              onChange={changeHandler}
              placeholder="Room Name"
              className="roomName"
            />
            <input type="submit" value="Join" className="submitJoin" />
          </form>
          <p className="singleRoom" onClick={joinSigleRoom}>
            Join sigle room &gt;&gt;
          </p>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Join;
