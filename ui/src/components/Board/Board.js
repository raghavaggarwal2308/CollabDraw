import React from "react";
import { fabric } from "fabric";
import "./Board.css";
import uuid from "react-uuid";
import {
  addFigureAPI,
  updateFigure,
  getFigures,
  clearCanvas,
} from "../../api/Room";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.rect = null;
    this.ellipse = null;
    this.origX = null;
    this.origY = null;
    this.isDown = false;
    this.username = this.props.username;
    this.roomname = this.props.roomname;
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
        fill: "",
        transparentCorners: false,
        stroke: this.props.lineColor,
        strokeWidth: this.props.lineWidth,
      });
      this.canvas.add(this.rect);
    } else if (this.props.shape === "ellipse") {
      this.ellipse = new fabric.Ellipse({
        id: uuid(),
        left: this.origX,
        top: this.origY,
        rx: pointer.x - this.origX,
        ry: pointer.y - this.origY,
        originX: "left",
        originY: "top",
        angle: 0,
        fill: "",
        stroke: this.props.lineColor,
        strokeWidth: this.props.lineWidth,
      });
      this.canvas.add(this.ellipse);
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
    } else if (this.props.shape === "ellipse") {
      var rx = Math.abs(this.origX - pointer.x) / 2;
      var ry = Math.abs(this.origY - pointer.y) / 2;
      this.ellipse.set({ rx: rx });
      this.ellipse.set({ ry: ry });
      if (this.origX > pointer.x) {
        this.ellipse.set({ originX: "right" });
      } else {
        this.ellipse.set({ originX: "left" });
      }
      if (this.origY > pointer.y) {
        this.ellipse.set({ originY: "bottom" });
      } else {
        this.ellipse.set({ originY: "top" });
      }
    }
    this.canvas.renderAll();
  };
  finish = (o) => {
    this.isDown = false;
    const figures = this.canvas._objects;
    const figure = figures[figures.length - 1];
    const id = figures[figures.length - 1].id;

    const roomname = this.roomname;

    if (this.initialLength !== figures.length && figures.length !== 0) {
      addFigureAPI({ figure, id, roomname });
      this.props.socket.emit("drawFigures", { figure, id, roomname });
    }
    this.props.setShape("selection");
  };
  modify = (o) => {
    updateFigure({
      figure: o.target,
      id: o.target.id,
      roomname: this.roomname,
    });
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
            stroke: figure.stroke,
            strokeWidth: figure.strokeWidth,
          })
        );
        break;
      case "ellipse":
        this.canvas.add(
          new fabric.Ellipse({
            id,
            left: figure.left,
            top: figure.top,
            originX: figure.originX,
            originY: figure.originY,
            rx: figure.rx,
            ry: figure.ry,
            angle: figure.angle,
            fill: "",
            stroke: figure.stroke,
            strokeWidth: figure.strokeWidth,
          })
        );
        break;
      default:
    }
  };
  updateFigure = ({ figure, id, roomname }) => {
    if (this.roomname === roomname) {
      const object = this.canvas._objects.find((obj) => obj.id === id);
      object.set({ left: figure.left });
      object.set({ top: figure.top });
      if (figure.type === "ellipse") {
        object.set({ rx: figure.rx * figure.scaleX });
        object.set({ ry: figure.ry * figure.scaleY });
      }
      object.set({ width: figure.width * figure.scaleX });
      object.set({ height: figure.height * figure.scaleY });
      object.set({ angle: figure.angle });
      this.canvas.renderAll();
    }
  };
  newFigure = ({ figure, id, roomname }) => {
    if (this.roomname === roomname) {
      this.addFigure(figure, id);
    }
  };
  deleteFigures = (roomname) => {
    if (this.roomname === roomname) {
      this.canvas.clear();
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
    this.canvas.on("object:modified", this.modify);

    this.props.socket.on("newFigure", this.newFigure);
    this.props.socket.on("updateFigure", this.updateFigure);
    this.props.socket.on("deleteFigures", this.deleteFigures);

    getFigures(this.roomname, this.username).then((res) => {
      console.log(res);
      res.data.figures.map((figure) => this.addFigure(figure, figure.id));
      this.props.setShape(res.data.shape);
      this.props.setLineColor(res.data.lineColor);
      this.props.setLineWidth(res.data.lineWidth);
    });
  }
  componentDidUpdate() {
    if (this.props.deselect) {
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
    if (this.props.shape === "clear") {
      let ans = window.confirm("Do you want to clear canvas?");
      this.props.setShape("rectangle");
      if (ans) {
        this.canvas.clear();
        clearCanvas(this.roomname);
        this.props.socket.emit("clear", { roomname: this.roomname });
      }
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
