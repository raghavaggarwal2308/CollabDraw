import React from "react";
import "./RoomUsers.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function RoomUsers({ roomUsers, username }) {
  return (
    <div className="roomUsers">
      <p>
        <ArrowRightIcon /> You
      </p>
      {roomUsers.map(
        (user) =>
          username !== user.username && (
            <p>
              <ArrowRightIcon /> {user.username}
            </p>
          )
      )}
    </div>
  );
}

export default RoomUsers;
