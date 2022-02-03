import React from "react";
import "./RoomUsers.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function RoomUsers({ roomUsers, username, displayUsers }) {
  console.log(roomUsers);
  console.log(username);
  return (
    <div className={`roomUsers ${!displayUsers && "displayRoomUsers"}`}>
      <p>
        <ArrowRightIcon /> You
      </p>
      {roomUsers !== null &&
        roomUsers !== undefined &&
        roomUsers.map(
          (user) =>
            username !== user.username &&
            user.delete === false && (
              <p>
                <ArrowRightIcon /> {user.username}
              </p>
            )
        )}
    </div>
  );
}

export default RoomUsers;
