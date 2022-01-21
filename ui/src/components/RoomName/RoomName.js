import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import "../RoomName/RoomName.css";

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
    <div className="roomname" onClick={copy} title="Roomname">
      <span className="inviteIcon">
        <PersonAddAltIcon />
      </span>

      <span className="tooltip">{tooltipText}</span>
      <span className="roomvalue">{roomname}</span>
      <span className="copyIcon">
        <ContentCopyIcon style={{ fontSize: "19px" }} />
      </span>
    </div>
  );
}

export default RoomName;
