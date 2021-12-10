import React, { useState } from "react";

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
      }
    });
  };
  return (
    <form onSubmit={submitHandler}>
      <label>Name</label>
      <input
        value={username}
        name="username"
        type="text"
        onChange={changeHandler}
      />
      <label>Room name</label>
      <input
        value={roomname}
        name="roomname"
        type="text"
        onChange={changeHandler}
      />
      <input type="submit" />
    </form>
  );
}

export default Join;
