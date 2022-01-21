import React from "react";
import "./Logo.css";
import DetailsIcon from "@mui/icons-material/Details";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import HdrWeakIcon from "@mui/icons-material/HdrWeak";
import CategoryIcon from "@mui/icons-material/Category";

function Logo() {
  return (
    <div className="appLogo">
      CO
      <span className="l1">
        <ModeEditOutlineIcon className="lIcon" />
      </span>
      I
      <span>
        <DetailsIcon />
      </span>
      <span>
        <HdrWeakIcon className="BIcon" />
      </span>{" "}
      D<span>r</span>
      <span>
        <CategoryIcon />
      </span>
      <span className="w">w</span>
    </div>
  );
}

export default Logo;
