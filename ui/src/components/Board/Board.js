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
    this.username = window.location.pathname.split("/")[2];
    this.roomname = window.location.pathname.split("/")[3];
    this.initialLength = 0;
  }
  start = (o) => {
    this.initialLength = this.canvas._objects.length;
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
    this.isDown = false;
    console.log(this.rect.left, " ", this.rect.top);
    const figures = this.canvas._objects;
    const figure = figures[figures.length - 1];
    const id = figures[figures.length - 1].id;

    const roomname = this.roomname;
    if (this.initialLength !== figures.length && figures.length !== 0) {
      this.props.socket.emit("drawFigures", { figure, id, roomname });
    }
    this.props.setShape("selection");
  };
  modify = (o) => {
    console.log(o);
    this.props.socket.emit("modifyFigure", {
      figure: o.target,
      id: o.target.id,
      roomname: this.roomname,
    });
  };
  addFigure = (figure, id) => {
    switch (figure.type) {
      case "rect":
        this.canvas.add(
          new fabric.Rect({
            id: id,
            left: figure.left,
            top: figure.top,
            originX: figure.originX,
            originY: figure.originY,
            width: figure.width,
            height: figure.height,
            angle: figure.angle,
            fill: figure.fill,
            transparentCorners: false,
          })
        );
        break;
      case "circle":
        this.canvas.add(
          new fabric.Circle({
            id,
            left: figure.left,
            top: figure.top,
            originX: figure.originX,
            originY: figure.originY,
            radius: figure.radius,
            angle: figure.angle,
            fill: "",
            stroke: "red",
            strokeWidth: 3,
          })
        );
        break;
      default:
    }
  };

  selection = (o) => {
    this.props.setShape("selection");
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

    this.canvas.on("selection:created", this.selection);
    // this.canvas.on("object:moved", this.modify);
    // this.canvas.on("object:scaled", this.modify);
    this.canvas.on("object:modified", this.modify);
    this.props.socket.on("newFigure", ({ figure, id, roomname }) => {
      if (this.roomname === roomname) {
        this.addFigure(figure, id);
      }
    });
    this.props.socket.on("updateFigure", ({ figure, id, roomname }) => {
      // console.log(this.canvas._objects);
      // console.log(figure);
      if (this.roomname === roomname) {
        // this.canvas.insertAt(
        //   new fabric.Rect({
        //     id: id,
        //     left: figure.left,
        //     top: figure.top,
        //     originX: figure.originX,
        //     originY: figure.originY,
        //     width: figure.width,
        //     height: figure.height,
        //     angle: figure.angle,
        //     fill: figure.fill,
        //     transparentCorners: false,
        //   }),
        //   0
        // );
        const object = this.canvas._objects.find((obj) => obj.id === id);
        console.log(object);
        console.log(figure.width);
        object.set({ left: figure.left });
        object.set({ top: figure.top });
        object.set({ width: figure.width * figure.scaleX });
        object.set({ height: figure.height * figure.scaleY });
        console.log(object);
        this.canvas.renderAll();
        // this.canvas._objects = this.canvas._objects.filter((object) => {
        //   console.log(object.id);
        //   return object.id !== id;
        // });
        // console.log(
        //   this.canvas._objects.filter((object) => {
        //     console.log(object.id);
        //     return object.id !== id;
        //   })
        // );
        // this.addFigure(figure, id);
      }
    });
  }
  componentDidUpdate() {
    if (this.props.deselect) {
      // console.log("object");
      this.canvas.forEachObject((o) => {
        o.selectable = false;
      });
      this.canvas.discardActiveObject().renderAll();
      this.props.setdeselect(false);
    }
    if (this.props.shape === "selection") {
      this.canvas.forEachObject(function (o) {
        o.set({ selectable: true }).setCoords();
      }).selection = true;
    }
  }
  render() {
    return (
      <div className="canvasContainer" id="board">
        {" "}
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}

export default Board;
