import React, { useState } from "react";
import "./Join.css";

function Join(props) {
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
    props.socket.emit("join", { roomname, username }, (error, message) => {
      if (error) {
        alert(error);
      } else {
        alert(message);
        window.location = "/board";
      }
    });
  };
  return (
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
  );
}

export default Join;
