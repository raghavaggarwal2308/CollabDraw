import React from "react";
import { fabric } from "fabric";
import "./Board.css";
import uuid from "react-uuid";
import {
  addFigureAPI,
  updateFigure,
  getFigures,
  clearCanvas,
  undoFigure,
} from "../../api/Room";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.rect = null;
    this.ellipse = null;
    this.line = null;
    this.pencil = null;
    this.origX = null;
    this.origY = null;
    this.isDown = false;
    this.username = this.props.username;
    this.roomname = this.props.roomname;
    this.initialLength = 0;
    this.redoArray = [];
  }
  start = (o) => {
    this.initialLength = this.canvas._objects.length;
    this.isDown = true;
    let pointer = this.canvas.getPointer(o.e);
    var points = [pointer.x, pointer.y, pointer.x, pointer.y];
    this.origX = pointer.x;
    this.origY = pointer.y;
    switch (this.props.shape) {
      case "rectangle":
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
        break;
      case "ellipse":
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
        break;
      case "line":
        this.line = new fabric.Line(points, {
          id: uuid(),
          fill: "",
          stroke: this.props.lineColor,
          strokeWidth: this.props.lineWidth,
          originX: "center",
          originY: "center",
          angle: 0,
        });
        this.canvas.add(this.line);
        break;

      default:
    }
  };
  draw = (o) => {
    if (!this.isDown) return;
    var pointer = this.canvas.getPointer(o.e);
    switch (this.props.shape) {
      case "rectangle":
        if (this.origX > pointer.x) {
          this.rect.set({ left: Math.abs(pointer.x) });
        }
        if (this.origY > pointer.y) {
          this.rect.set({ top: Math.abs(pointer.y) });
        }

        this.rect.set({ width: Math.abs(this.origX - pointer.x) });
        this.rect.set({ height: Math.abs(this.origY - pointer.y) });
        break;
      case "ellipse":
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
        break;
      case "line":
        this.line.set({ x2: pointer.x, y2: pointer.y });
        break;
      default:
    }
    this.canvas.renderAll();
  };
  finish = (o) => {
    this.isDown = false;

    const figures = this.canvas._objects;
    if (figures.length > 0) {
      const figure = figures[figures.length - 1];

      if (
        this.props.shape === "pencil" &&
        this.canvas.isDrawingMode !== false
      ) {
        this.canvas.isDrawingMode = false;
        figures[figures.length - 1].id = uuid();
      }
      const id = figures[figures.length - 1].id;
      const roomname = this.roomname;
      if (this.initialLength !== figures.length && figures.length !== 0) {
        addFigureAPI({ figure, id, roomname });
        this.props.socket.emit("drawFigures", { figure, id, roomname });
        this.redoArray = [];
      }
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
            scaleX: figure.scaleX,
            scaleY: figure.scaleY,
            flipX: figure.flipX,
            flipY: figure.flipY,
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
            scaleX: figure.scaleX,
            scaleY: figure.scaleY,
            flipX: figure.flipX,
            flipY: figure.flipY,
            angle: figure.angle,
            fill: "",
            stroke: figure.stroke,
            strokeWidth: figure.strokeWidth,
          })
        );
        break;
      case "line":
        let points = [figure.x1, figure.y1, figure.x2, figure.y2];
        this.line = new fabric.Line(points, {
          id,
          left: figure.left,
          top: figure.top,
          fill: "",
          stroke: figure.stroke,
          strokeWidth: figure.strokeWidth,
          originX: figure.originX,
          originY: figure.originY,
          scaleX: figure.scaleX,
          scaleY: figure.scaleY,
          flipX: figure.flipX,
          flipY: figure.flipY,
          angle: figure.angle,
        });
        this.canvas.add(this.line);
        break;
      case "path":
        this.pencil = new fabric.Path(figure.path, {
          id,
          left: figure.left,
          top: figure.top,
          fill: "",
          stroke: figure.stroke,
          strokeWidth: figure.strokeWidth,
          originX: figure.originX,
          originY: figure.originY,
          scaleX: figure.scaleX,
          scaleY: figure.scaleY,
          flipX: figure.flipX,
          flipY: figure.flipY,
          angle: figure.angle,
        });
        this.canvas.add(this.pencil);
        break;
      default:
    }
  };
  updateFigure = ({ figure, id, roomname }) => {
    if (this.roomname === roomname) {
      const object = this.canvas._objects.find((obj) => obj.id === id);
      object.set({ left: figure.left });
      object.set({ top: figure.top });
      object.set({ originY: figure.originY });
      object.set({ originX: figure.originX });
      object.set({ scaleX: figure.scaleX });
      object.set({ scaleY: figure.scaleY });
      object.set({ angle: figure.angle });
      object.set({ flipX: figure.flipX });
      object.set({ flipY: figure.flipY });

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
  undoFigure = ({ figure, roomname, id }) => {
    if (this.roomname === roomname) {
      this.canvas._objects.forEach((figure) => {
        if (figure.id === id) {
          this.canvas.remove(figure);
        }
      });
    }
  };
  componentDidMount() {
    this.canvas = new fabric.Canvas("canvas");
    // this.canvas.setDimensions({
    //   height: window.height,
    //   width: window.width,
    // });

    this.canvas.on("mouse:down", this.start);

    this.canvas.on("mouse:move", this.draw);

    this.canvas.on("mouse:up", this.finish);

    this.canvas.on("selection:created", this.selection);
    this.canvas.on("object:modified", this.modify);

    this.props.socket.on("newFigure", this.newFigure);
    this.props.socket.on("updateFigure", this.updateFigure);
    this.props.socket.on("deleteFigures", this.deleteFigures);
    this.props.socket.on("undoFigure", this.undoFigure);

    getFigures(this.roomname, this.username).then((res) => {
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
    switch (this.props.shape) {
      case "pencil":
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush.width = this.props.lineWidth;
        this.canvas.freeDrawingBrush.color = this.props.lineColor;
        break;
      case "selection":
        this.canvas.forEachObject(function (o) {
          o.set({ selectable: true }).setCoords();
        }).selection = true;
        break;
      case "clear":
        let ans = window.confirm("Do you want to clear canvas?");
        this.props.setShape("rectangle");
        if (ans) {
          this.canvas.clear();
          clearCanvas(this.roomname);
          this.props.socket.emit("clear", { roomname: this.roomname });
        }
        break;
      case "undo":
        if (this.canvas._objects.length > 0) {
          let undoFig = this.canvas._objects.pop();
          this.redoArray.push(undoFig);
          this.canvas.renderAll();
          this.props.socket.emit("undo", {
            figure: undoFig,
            roomname: this.roomname,
            id: undoFig.id,
          });
          undoFigure(undoFig, this.roomname, undoFig.id);
        }
        this.props.setShape("selection");
        break;
      case "redo":
        if (this.redoArray.length > 0) {
          let redoFigure = this.redoArray.pop();
          this.canvas.add(redoFigure);
          this.canvas.renderAll();
          this.props.socket.emit("redo", {
            figure: redoFigure,
            roomname: this.roomname,
            id: redoFigure.id,
          });
          addFigureAPI({
            figure: redoFigure,
            id: redoFigure.id,
            roomname: this.roomname,
          });
        }
        this.props.setShape("selection");
        break;
      default:
        this.canvas.isDrawingMode = false;
    }
  }
  render() {
    return (
      <div className="canvasContainer" id="board">
        {" "}
        <canvas
          id="canvas"
          width={window.innerWidth}
          height={window.innerHeight}
        ></canvas>
      </div>
    );
  }
}

export default Board;
