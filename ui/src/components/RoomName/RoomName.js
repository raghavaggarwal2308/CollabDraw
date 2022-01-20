import React, { useState } from "react";
import "../RoomName/RoomName.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function RoomName({ roomname }) {
  const [tooltipText, settooltipText] = useState("Click to Copy");
  const copy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(roomname);
    settooltipText("Copied");
    setTimeout(() => {
      settooltipText("Click to Copy");
    }, 3000);
  };
  return (
    <div className="roomname" onClick={copy}>
      <span className="tooltip">{tooltipText}</span>
      <span>{roomname}</span>
      <ContentCopyIcon style={{ fontSize: "19px" }} />
    </div>
  );
}

export default RoomName;
