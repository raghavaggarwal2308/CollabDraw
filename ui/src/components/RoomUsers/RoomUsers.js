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
          username !== user && (
            <p>
              <ArrowRightIcon /> {user}
            </p>
          )
      )}
    </div>
  );
}

export default RoomUsers;
