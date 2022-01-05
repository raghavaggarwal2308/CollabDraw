import React from "react";
import "./SideBar.css";
import { SketchPicker } from "react-color";
import {
  changeLineColor,
  changeLineWidth,
  changeFillColor,
  changeStyleSlider,
  changeOpacity,
} from "../../api/Room";

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
  fillColor,
  setFillColor,
  lineStyle,
  setLineStyle,
  opacity,
  setOpacity,
}) {
  function styleslider(e) {
    setLineStyle(parseInt(e.target.value));
    changeStyleSlider(parseInt(e.target.value), roomname, username);
  }
  function widthslider(e) {
    setLineWidth(parseInt(e.target.value));
    changeLineWidth(parseInt(e.target.value), roomname, username);
  }
  function opacityslider(e) {
    setOpacity(parseFloat(e.target.value));
    changeOpacity(parseFloat(e.target.value), roomname, username);
  }
  function eraserSlider(e) {
    setEraserSize(e.target.value);
  }
  function fillChangeColor(e) {
    setFillColor(e.target.value);
    changeFillColor(e.target.value, roomname, username);
  }
  function fillHandleChangeComplete(color) {
    setFillColor(color.hex);
    changeFillColor(color.hex, roomname, username);
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
            <p>Stroke Color:</p>
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
          {shape !== "pencil" && (
            <div className="colorPickerContainer">
              <p>Fill color:</p>
              <div className="colorPickerInput">
                <input
                  type="text"
                  id="fillColorValue"
                  value={fillColor}
                  onChange={(e) => fillChangeColor(e)}
                />

                <div id="fillColorPicker">
                  <div
                    id="fillColor"
                    style={{ backgroundColor: `${fillColor}` }}
                  ></div>
                  <div id="fillPicker">
                    <SketchPicker
                      color={fillColor}
                      onChangeComplete={fillHandleChangeComplete}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {shape !== "pencil" && (
            <div className="lineWidthContainer">
              <p>Opacity :</p>
              <div className="lineWidthInput">
                <input
                  type="range"
                  onChange={opacityslider}
                  id="opacitySlider"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={opacity}
                />
                <div
                  id="opacity"
                  style={{
                    opacity: opacity,
                    height: lineWidth + "px",
                    backgroundColor: lineColor,
                  }}
                ></div>
              </div>
            </div>
          )}
          <div className="lineWidthContainer">
            <p>Stroke Width:</p>
            <div className="lineWidthInput">
              <input
                type="range"
                onChange={widthslider}
                id="lineWidthSlider"
                min="1"
                max="7"
                value={lineWidth}
              />
              <div
                id="lineWidth"
                style={{ height: lineWidth + "px", backgroundColor: lineColor }}
              ></div>
            </div>
          </div>
          {shape !== "pencil" && (
            <div className="lineWidthContainer">
              <p>Stroke Style : </p>
              <div className="lineWidthInput">
                <input
                  type="range"
                  onChange={styleslider}
                  id="lineStyleSlider"
                  min="1"
                  max="7"
                  value={lineStyle}
                />
                <div
                  id="lineStyle"
                  style={{
                    boxSizing: "border-box",
                    borderTop: `${lineStyle}px dashed ${lineColor}`,
                    height: "0px",
                    backgroundColor: "transparent",
                  }}
                ></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SideBar;
