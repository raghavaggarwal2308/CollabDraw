import React from "react";
import "./SideBar.css";
import { SketchPicker } from "react-color";
import { changeLineColor, changeLineWidth } from "../../api/Room";

function SideBar({
  setLineColor,
  setLineWidth,
  lineWidth,
  lineColor,
  shape,
  eraserSize,
  setEraserSize,
  username,
  roomname,
}) {
  function widthslider(e) {
    setLineWidth(e.target.value);
    changeLineWidth(e.target.value, roomname, username);
  }
  function eraserSlider(e) {
    setEraserSize(e.target.value);
  }
  function changeColor(e) {
    setLineColor(e.target.value);
    changeLineColor(e.target.value, roomname, username);
  }
  function handleChangeComplete(color) {
    setLineColor(color.hex);
    changeLineColor(color.hex, roomname, username);
  }
  return (
    <div className="sideContainer">
      {shape === "erase" ? (
        <>
          <div className="lineWidthContainer">
            <p>Eraser Size:</p>
            <div className="lineWidthInput">
              <input
                type="range"
                onChange={eraserSlider}
                id="lineWidthSlider"
                min="15"
                max="100"
                value={eraserSize}
              />
              <div id="lineWidth" style={{ height: lineWidth + "px" }}></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="colorPickerContainer">
            <p>Line Color:</p>
            <div className="colorPickerInput">
              <input
                type="text"
                id="lineColorValue"
                value={lineColor}
                onChange={(e) => changeColor(e)}
              />

              <div id="colorPicker">
                <div
                  id="color"
                  style={{ backgroundColor: `${lineColor}` }}
                ></div>
                <div id="picker">
                  <SketchPicker
                    color={lineColor}
                    onChangeComplete={handleChangeComplete}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lineWidthContainer">
            <p>Line Width:</p>
            <div className="lineWidthInput">
              <input
                type="range"
                onChange={widthslider}
                id="lineWidthSlider"
                min="1"
                max="20"
                value={lineWidth}
              />
              <div
                id="lineWidth"
                style={{ height: lineWidth + "px", backgroundColor: lineColor }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SideBar;
