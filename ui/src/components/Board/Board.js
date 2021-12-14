import React from "react";
import { fabric } from "fabric";
import "./Board.css";
import uuid from "react-uuid";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.rect = null;
    this.circle = null;
    this.origX = null;
    this.origY = null;
    this.isDown = false;
  }

  start = (o) => {
    this.isDown = true;
    let pointer = this.canvas.getPointer(o.e);
    this.origX = pointer.x;
    this.origY = pointer.y;
    if (this.props.shape === "rectangle") {
      this.rect = new fabric.Rect({
        id: uuid(),
        left: this.origX,
        top: this.origY,
        originX: "left",
        originY: "top",
        width: pointer.x - this.origX,
        height: pointer.y - this.origY,
        angle: 0,
        fill: "rgba(255,0,0,0.5)",
        transparentCorners: false,
      });
      this.canvas.add(this.rect);
    } else if (this.props.shape === "circle") {
      this.circle = new fabric.Circle({
        id: uuid(),
        left: this.origX,
        top: this.origY,
        originX: "left",
        originY: "top",
        radius: pointer.x - this.origX,
        angle: 0,
        fill: "",
        stroke: "red",
        strokeWidth: 3,
      });
      this.canvas.add(this.circle);
    }
  };
  draw = (o) => {
    if (!this.isDown) return;
    var pointer = this.canvas.getPointer(o.e);
    if (this.props.shape === "rectangle") {
      if (this.origX > pointer.x) {
        this.rect.set({ left: Math.abs(pointer.x) });
      }
      if (this.origY > pointer.y) {
        this.rect.set({ top: Math.abs(pointer.y) });
      }

      this.rect.set({ width: Math.abs(this.origX - pointer.x) });
      this.rect.set({ height: Math.abs(this.origY - pointer.y) });
    } else if (this.props.shape === "circle") {
      var radius =
        Math.max(
          Math.abs(this.origY - pointer.y),
          Math.abs(this.origX - pointer.x)
        ) / 2;
      if (radius > this.circle.strokeWidth) {
        radius -= this.circle.strokeWidth / 2;
      }
      this.circle.set({ radius: radius });
      if (this.origX > pointer.x) {
        this.circle.set({ originX: "right" });
      } else {
        this.circle.set({ originX: "left" });
      }
      if (this.origY > pointer.y) {
        this.circle.set({ originY: "bottom" });
      } else {
        this.circle.set({ originY: "top" });
      }
    }
    this.canvas.renderAll();
  };
  finish = (o) => {
    console.log(this.canvas);
    this.isDown = false;
    this.props.setShape("selection");
    const figures = this.canvas._objects;
    const figure = figures[figures.length - 1];
    const id = figures[figures.length - 1].id;
    this.props.socket.emit("drawFigures", { figure, id });
  };
  modify = (o) => {
    console.log("modified");
  };
  componentDidMount() {
    this.canvas = new fabric.Canvas("canvas");
    this.canvas.setDimensions({
      height: 400,
      width: 550,
    });

    this.canvas.on("mouse:down", this.start);

    this.canvas.on("mouse:move", this.draw);

    this.canvas.on("mouse:up", this.finish);

    this.canvas.on("object:modified", this.modify);
    this.props.socket.on("newFigure", (figure) => {
      console.log(figure);
    });
  }
  render() {
    return (
      <div className="canvasContainer">
        {" "}
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}

export default Board;
// function Board() {
//   console.log(shape);

//   const test = () => {
//     console.log("test", shape);
//   };
//   // useEffect(() => {
//   //   test();
//   // }, [shape]);
//   useEffect(() => {
//     console.log("main chlra hu");

//   }, [shape]);

//   return (

//   );
// }

// export default Board;
