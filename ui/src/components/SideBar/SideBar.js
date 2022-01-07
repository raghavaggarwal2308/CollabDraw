import React, { useState, useEffect } from "react";
import "./SideBar.css";
import { SketchPicker } from "react-color";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
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
            {shape !== "pencil" && shape !== "download" && (
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
            {shape !== "pencil" && shape !== "download" && (
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
            {shape !== "pencil" && shape !== "download" && (
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
          </>
          {/* )} */}
        </div>
      )}
    </>
  );
}

export default SideBar;
