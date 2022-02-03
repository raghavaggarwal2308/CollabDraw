import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./SideBar.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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
  setShape,
  // eraserSize,
  // setEraserSize,
  settextDecoration,
  selectedShape,
  username,
  roomname,
  fillColor,
  setFillColor,
  lineStyle,
  setLineStyle,
  opacity,
  setOpacity,
  showSidebar,
  setimageType,
}) {
  const [opac, setopac] = useState(opacity);
  const [width, setWidth] = useState(lineWidth);
  const [style, setStyle] = useState(lineStyle);
  useEffect(() => {
    setopac(opacity);
  }, [opacity]);
  useEffect(() => {
    setWidth(lineWidth);
  }, [lineWidth]);
  useEffect(() => {
    setStyle(lineStyle);
  }, [lineStyle]);

  function styleslider(e) {
    setLineStyle(parseInt(e));
    changeStyleSlider(parseInt(e), roomname, username);
  }
  function widthslider(e) {
    setLineWidth(parseInt(e));
    changeLineWidth(parseInt(e), roomname, username);
  }
  function opacityslider(e) {
    setOpacity(parseFloat(e));
    changeOpacity(parseFloat(e), roomname, username);
  }
  // function eraserSlider(e) {
  //   setEraserSize(e.target.value);
  // }
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
  function opacityHandler(e) {
    setopac(e);
  }
  function widthHandler(e) {
    setWidth(e);
  }
  function styleHandler(e) {
    setStyle(e);
  }
  return (
    <>
      {showSidebar && (
        <div className="sideContainer">
          {/* {shape === "erase" ? (
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
      ) : ( */}
          <>
            {shape !== "download" && (
              <div className="colorPickerContainer">
                <p style={{ marginTop: "0" }}>Stroke Color:</p>
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
            )}
            {shape !== "pencil" &&
              shape !== "download" &&
              selectedShape !== "pencil" && (
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
            {shape !== "pencil" &&
              shape !== "download" &&
              selectedShape !== "pencil" && (
                <div className="lineWidthContainer">
                  <p>Opacity :</p>
                  <div className="lineWidthInput">
                    <Slider
                      onAfterChange={opacityslider}
                      min={0.1}
                      max={1}
                      step={0.1}
                      onChange={opacityHandler}
                      value={opac}
                      className="slider"
                      railStyle={{ color: "red" }}
                    />

                    <div
                      id="opacity"
                      style={{
                        opacity: opac,
                        height: lineWidth + "px",
                        backgroundColor: lineColor,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            {shape !== "download" && (
              <div className="lineWidthContainer">
                <p>Stroke Width:</p>
                <div className="lineWidthInput">
                  <Slider
                    onAfterChange={widthslider}
                    min={1}
                    max={7}
                    step={0.5}
                    onChange={widthHandler}
                    value={width}
                    className="slider"
                  />
                  <div
                    id="lineWidth"
                    style={{
                      height: lineWidth + "px",
                      backgroundColor: lineColor,
                    }}
                  ></div>
                </div>
              </div>
            )}
            {shape !== "pencil" &&
              shape !== "text" &&
              shape !== "download" &&
              selectedShape !== "pencil" &&
              selectedShape !== "text" && (
                <div className="lineWidthContainer">
                  <p>Stroke Style : </p>
                  <div className="lineWidthInput">
                    <Slider
                      onAfterChange={styleslider}
                      min={0}
                      max={8}
                      step={1}
                      onChange={styleHandler}
                      value={style}
                      className="slider"
                    />
                    <div id="lineStyle">
                      <div
                        style={{
                          height: lineWidth + "px",
                          backgroundColor: lineColor,
                          width: lineStyle,
                          marginLeft: lineStyle / 2,
                          marginRight: lineStyle / 2,
                        }}
                      ></div>
                      <div
                        style={{
                          height: lineWidth + "px",
                          backgroundColor: lineColor,
                          width: lineStyle,
                          marginLeft: lineStyle / 2,
                          marginRight: lineStyle / 2,
                        }}
                      ></div>
                      <div
                        style={{
                          height: lineWidth + "px",
                          backgroundColor: lineColor,
                          width: lineStyle,
                          marginLeft: lineStyle / 2,
                          marginRight: lineStyle / 2,
                        }}
                      ></div>
                      <div
                        style={{
                          height: lineWidth + "px",
                          backgroundColor: lineColor,
                          width: lineStyle,
                          marginLeft: lineStyle / 2,
                          marginRight: lineStyle / 2,
                        }}
                      ></div>
                      <div
                        style={{
                          height: lineWidth + "px",
                          backgroundColor: lineColor,
                          width: lineStyle,
                          marginLeft: lineStyle / 2,
                          marginRight: lineStyle / 2,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            {shape === "download" && (
              <div className="downloadType">
                <button
                  onClick={() => {
                    setimageType("svg");
                    setShape("downloadsvg");
                  }}
                >
                  .svg
                </button>
                <button
                  onClick={() => {
                    setimageType("png");
                    setShape("downloadpng");
                  }}
                >
                  .png
                </button>
              </div>
            )}
            {selectedShape !== "" && (
              <div className="copydelete">
                <button onClick={() => setShape("front")} title="Brint on top">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    viewBox="0 0 24 24"
                    class="rtl-mirror"
                  >
                    <path
                      d="M13 21a1 1 0 001 1h7a1 1 0 001-1v-7a1 1 0 00-1-1h-3v5h-5v3zM11 3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h3V6h5V3z"
                      fill="var(--icon-fill-color)"
                      stroke="var(--icon-fill-color)"
                      stroke-width="2"
                    ></path>
                    <path
                      d="M18 7.333C18 6.597 17.403 6 16.667 6H7.333C6.597 6 6 6.597 6 7.333v9.334C6 17.403 6.597 18 7.333 18h9.334c.736 0 1.333-.597 1.333-1.333V7.333z"
                      fill=" #aa14f0"
                      stroke=" #aa14f0"
                      stroke-width="2"
                    ></path>
                  </svg>
                </button>
                <button onClick={() => setShape("back")} title="Send to bottom">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    viewBox="0 0 24 24"
                    class="rtl-mirror"
                  >
                    <path
                      d="M18 7.333C18 6.597 17.403 6 16.667 6H7.333C6.597 6 6 6.597 6 7.333v9.334C6 17.403 6.597 18 7.333 18h9.334c.736 0 1.333-.597 1.333-1.333V7.333z"
                      fill=" #aa14f0"
                      stroke=" #aa14f0"
                      stroke-width="2"
                    ></path>
                    <path
                      d="M11 3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h8V3zM22 14a1 1 0 00-1-1h-7a1 1 0 00-1 1v7a1 1 0 001 1h8v-8z"
                      fill="var(--icon-fill-color)"
                      stroke="var(--icon-fill-color)"
                      stroke-width="2"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => setShape("onefront")}
                  title="Bring one step front"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    viewBox="0 0 24 24"
                    class="rtl-mirror"
                  >
                    <path
                      d="M22 9.556C22 8.696 21.303 8 20.444 8H16v8H8v4.444C8 21.304 8.697 22 9.556 22h10.888c.86 0 1.556-.697 1.556-1.556V9.556z"
                      fill="var(--icon-fill-color)"
                      stroke="var(--icon-fill-color)"
                      stroke-width="2"
                    ></path>
                    <path
                      d="M16 3.556C16 2.696 15.303 2 14.444 2H3.556C2.696 2 2 2.697 2 3.556v10.888C2 15.304 2.697 16 3.556 16h10.888c.86 0 1.556-.697 1.556-1.556V3.556z"
                      fill=" #aa14f0"
                      stroke=" #aa14f0"
                      stroke-width="2"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => setShape("oneback")}
                  title="Send one step Back"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    viewBox="0 0 24 24"
                    class="rtl-mirror"
                  >
                    <path
                      d="M16 3.556C16 2.696 15.303 2 14.444 2H3.556C2.696 2 2 2.697 2 3.556v10.888C2 15.304 2.697 16 3.556 16h10.888c.86 0 1.556-.697 1.556-1.556V3.556z"
                      fill=" #aa14f0"
                      stroke=" #aa14f0"
                      stroke-width="2"
                    ></path>
                    <path
                      d="M22 9.556C22 8.696 21.303 8 20.444 8H9.556C8.696 8 8 8.697 8 9.556v10.888C8 21.304 8.697 22 9.556 22h10.888c.86 0 1.556-.697 1.556-1.556V9.556z"
                      fill="var(--icon-fill-color)"
                      stroke="var(--icon-fill-color)"
                      stroke-width="2"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
            {selectedShape !== "" && (
              <div className="copydelete">
                <button
                  onClick={() => setShape("copy")}
                  title="Clone Selected Figure"
                >
                  <ContentCopyIcon style={{ fontSize: "18px" }} />
                </button>
                <button
                  onClick={() => setShape("delete")}
                  title="Delete Selected Figure"
                >
                  <DeleteIcon style={{ fontSize: "19px" }} />
                </button>
              </div>
            )}
          </>
          {/* )} */}
        </div>
      )}
    </>
  );
}

export default SideBar;
