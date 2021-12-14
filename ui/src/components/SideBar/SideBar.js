import React from "react";
import "./SideBar.css";
// import { SketchPicker } from "react-color";

function SideBar({
  setlineColor,
  setLineWidth,
  lineWidth,
  lineColor,
  shapeType,
  eraserSize,
  setEraserSize,
}) {
  // useEffect(() => {
  //   const currentColor = document.querySelector("#color").style.backgroundColor;
  //   // document.querySelector("#color").style.backgroundColor =
  //   //   localStorage.getItem("strokeColor") === null
  //   //     ? "black"
  //   //     : localStorage.getItem("strokeColor");
  //   // document.querySelector("#lineWidth").style.backgroundColor = lineColor;
  //   if (lineColor.length === 0) {
  //     document.querySelector("#color").style.backgroundColor = currentColor;
  //     document.querySelector("#lineWidth").style.backgroundColor = currentColor;
  //   }
  // }, [lineColor]);

  // function widthslider(e) {
  //   setLineWidth(e.target.value);
  // }
  // function eraserSlider(e) {
  //   setEraserSize(e.target.value);
  //   console.log(eraserSize);
  // }
  // function changeLineColor(e) {
  //   setlineColor(e.target.value);
  // }
  // function handleChangeComplete(color) {
  //   setlineColor(color.hex);
  // }
  return (
    <div className="sideContainer">
      {/* {shapeType === "erase" ? (
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
                onChange={(e) => changeLineColor(e)}
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
              <div id="lineWidth" style={{ height: lineWidth + "px" }}></div>
            </div>
          </div>
        </>
      )} */}
    </div>
  );
}

export default SideBar;
