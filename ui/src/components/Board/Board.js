import React from "react";
import { fabric } from "fabric";
import "./Board.css";
import uuid from "react-uuid";
import brush from "./FabricBrush.js";
import {
  addFigureAPI,
  updateFigure,
  getFigures,
  clearCanvas,
  undoFigure,
  redoFigure,
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
    this.undo = [];
    this.redo = [];
    this.currentStatus = null;
    this.change = false;
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
    // console.log(
    //   JSON.stringify(this.canvas.toDatalessJSON(this.canvas.extraProps))
    // );
    // console.log(
    //   this.canvas.loadFromJSON(
    //     JSON.stringify(this.canvas.toDatalessJSON(this.canvas.extraProps))
    //   )
    // );
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
        this.saveAction();
        addFigureAPI({ figure, id, roomname });
        this.props.socket.emit("drawFigures", { figure, id, roomname });
        this.redo = [];
      }
    }

    this.props.setShape("selection");
    console.log(this.canvas);
  };
  modify = (o) => {
    console.log(o);
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
    this.saveAction();
  };

  // getFigure = (figure) => {
  //   switch (figure.type) {
  //     case "rect":
  //       const rectangle = new fabric.Rect({
  //         left: figure.left,
  //         top: figure.top,
  //         originX: figure.originX,
  //         originY: figure.originY,
  //         width: figure.width,
  //         height: figure.height,
  //         angle: figure.angle,
  //         fill: figure.fill,
  //         scaleX: figure.scaleX,
  //         scaleY: figure.scaleY,
  //         flipX: figure.flipX,
  //         flipY: figure.flipY,
  //         transparentCorners: false,
  //         stroke: figure.stroke,
  //         strokeWidth: figure.strokeWidth,
  //       });
  //       return rectangle;
  //     case "ellipse":
  //       const ellipse = new fabric.Ellipse({
  //         left: figure.left,
  //         top: figure.top,
  //         originX: figure.originX,
  //         originY: figure.originY,
  //         rx: figure.rx,
  //         ry: figure.ry,
  //         scaleX: figure.scaleX,
  //         scaleY: figure.scaleY,
  //         flipX: figure.flipX,
  //         flipY: figure.flipY,
  //         angle: figure.angle,
  //         fill: "",
  //         stroke: figure.stroke,
  //         strokeWidth: figure.strokeWidth,
  //       });
  //       return ellipse;
  //     case "line":
  //       let points = [figure.x1, figure.y1, figure.x2, figure.y2];
  //       const line = new fabric.Line(points, {
  //         left: figure.left,
  //         top: figure.top,
  //         fill: "",
  //         stroke: figure.stroke,
  //         strokeWidth: figure.strokeWidth,
  //         originX: figure.originX,
  //         originY: figure.originY,
  //         scaleX: figure.scaleX,
  //         scaleY: figure.scaleY,
  //         flipX: figure.flipX,
  //         flipY: figure.flipY,
  //         angle: figure.angle,
  //       });
  //       return line;
  //     case "path":
  //       console.log(figure);
  //       const path = new fabric.Path(figure.path, {
  //         left: figure.left,
  //         top: figure.top,
  //         fill: "",
  //         stroke: figure.stroke,
  //         strokeWidth: figure.strokeWidth,
  //         originX: figure.originX,
  //         originY: figure.originY,
  //         scaleX: figure.scaleX,
  //         scaleY: figure.scaleY,
  //         flipX: figure.flipX,
  //         flipY: figure.flipY,
  //         angle: figure.angle,
  //       });
  //       return path;
  //     default:
  //   }
  // };

  // getFigArray = (objects) => {
  //   console.log(objects);
  //   return objects.map((object) => this.getFigure(object));
  // };

  // createClipPath = (clipPath) => {
  //   let figArray = this.getFigArray(clipPath.objects);
  //   console.log(figArray);
  //   let group = new fabric.Group(figArray, {
  //     left: clipPath.left,
  //     top: clipPath.top,
  //     angle: clipPath.angle,
  //     absolutePositioned: clipPath.absolutePositioned,
  //     backgroundColor: clipPath.backgroundColor,
  //     erasable: clipPath.erasable,
  //     eraser: clipPath.eraser,
  //     fill: clipPath.fill,
  //     fillRule: clipPath.fillRule,
  //     flipX: clipPath.flipX,
  //     flipY: clipPath.flipY,
  //     globalCompositeOperation: clipPath.globalCompositeOperation,
  //     height: clipPath.height,
  //     inverted: clipPath.inverted,
  //     opacity: clipPath.opacity,
  //     originX: clipPath.originX,
  //     originY: clipPath.originY,
  //     paintFirst: clipPath.paintFirst,
  //     scaleX: clipPath.scaleX,
  //     scaleY: clipPath.scaleY,
  //     shadow: clipPath.shadow,
  //     skewX: clipPath.skewX,
  //     skewY: clipPath.skewY,
  //     stroke: clipPath.stroke,
  //     strokeDashArray: clipPath.strokeDashArray,
  //     strokeDashOffset: clipPath.strokeDashOffset,
  //     strokeLineCap: clipPath.strokeLineCap,
  //     strokeLineJoin: clipPath.strokeLineJoin,
  //     strokeMiterLimit: clipPath.strokeMiterLimit,
  //     strokeUniform: clipPath.strokeUniform,
  //     strokeWidth: clipPath.strokeWidth,
  //     type: clipPath.type,
  //     version: clipPath.version,
  //     visible: clipPath.visible,
  //     width: clipPath.width,
  //   });
  //   return group;
  // };
  updateFigure = ({ figure, id, roomname }) => {
    console.log(figure);
    if (this.roomname === roomname) {
      const object = this.canvas._objects.find((obj) => obj.id === id);
      if (object) {
        object.set({ left: figure.left });
        object.set({ top: figure.top });
        object.set({ originY: figure.originY });
        object.set({ originX: figure.originX });
        object.set({ scaleX: figure.scaleX });
        object.set({ scaleY: figure.scaleY });
        object.set({ angle: figure.angle });
        object.set({ flipX: figure.flipX });
        object.set({ flipY: figure.flipY });
        this.saveAction();
        // if (figure.clipPath) {
        //   const clipPath = this.createClipPath(figure.clipPath);
        //   console.log(clipPath);
        //   object.set({ erasable: figure.erasable });
        //   object.set({ clipPath: clipPath });
        //   object.set({
        //     globalCompositeOperation: figure.globalCompositeOperation,
        //   });
        // }
      }
      this.canvas.renderAll();
      console.log(this.canvas._objects);
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
  // undoFigure = ({ figure, roomname, id }) => {
  //   console.log(id);
  //   if (this.roomname === roomname) {
  //     this.canvas._objects.forEach((figure) => {
  //       if (figure.id === id) {
  //         this.canvas.remove(figure);
  //       }
  //     });
  //   }
  // };
  undoFigure = ({ figures, undo, redo, roomname }) => {
    if (this.roomname === roomname) {
      this.change = true;
      this.redo = redo;
      this.undo = undo;
      // this.redo.push(
      //   JSON.stringify(this.canvas.toDatalessJSON(this.canvas.extraProps))
      // );
      this.canvas.loadFromJSON(figures).renderAll();
      this.change = false;
    }
  };
  redoFigure = ({ figures, undo, redo, roomname }) => {
    if (this.roomname === roomname) {
      this.change = true;
      this.redo = redo;
      this.undo = undo;
      // this.undo.push(
      //   JSON.stringify(this.canvas.toDatalessJSON(this.canvas.extraProps))
      // );
      this.canvas.loadFromJSON(figures).renderAll();
      this.change = false;
    }
  };
  deleteSelectedFigure = (e) => {
    console.log(e);
    if (e.keyCode === 8) {
      //this.redoArray.push(this.canvas.getActiveObjects());
      this.canvas.getActiveObjects().forEach((object) => {
        this.canvas.remove(object);
      });

      this.canvas.discardActiveObject().renderAll();

      this.saveAction();
      this.props.socket.emit("undo", {
        figures: JSON.stringify(
          this.canvas.toDatalessJSON(this.canvas.extraProps)
        ),
        undo: this.undo,
        redo: this.redo,
        roomname: this.roomname,
      });
      undoFigure(this.canvas._objects, this.roomname);
    }
  };
  saveAction = () => {
    if (this.change) return;
    console.log("save");
    this.undo.push(this.currentStatus);
    console.log(this.undo);
    this.currentStatus = JSON.stringify(
      this.canvas.toDatalessJSON(this.canvas.extraProps)
    );
  };
  componentDidMount() {
    this.canvas = new fabric.Canvas("canvas");
    this.canvas.setDimensions({
      height: 400,
      width: 500,
    });
    this.currentStatus = JSON.stringify(
      this.canvas.toDatalessJSON(this.canvas.extraProps)
    );
    //this.canvas.on("object:added", this.saveAction);
    //this.canvas.on("object:removed", this.saveAction);
    //this.canvas.on("object:modified", this.saveAction);
    // brush();
    // this.canvas.on("erasing:end", (o) => {
    //   console.log(o);
    //   o.targets.forEach((target) => {
    //     this.props.socket.emit("modifyFigure", {
    //       figure: target,
    //       id: target.id,
    //       roomname: this.roomname,
    //     });
    //   });

    //   console.log(o);
    // });
    // this.props.socket.on("eraseFigure", ({ figure, id, roomname }) => {
    //   const object = this.canvas._objects.find((obj) => obj.id === id);
    //   console.log(object);
    // });
    this.canvas.on("mouse:down", this.start);

    this.canvas.on("mouse:move", this.draw);

    this.canvas.on("mouse:up", this.finish);

    this.canvas.on("selection:created", this.selection);
    this.canvas.on("object:modified", (o) => {
      this.modify(o);
      this.saveAction();
    });
    window.addEventListener("keydown", this.deleteSelectedFigure);
    this.props.socket.on("newFigure", this.newFigure);
    this.props.socket.on("updateFigure", this.updateFigure);
    this.props.socket.on("deleteFigures", this.deleteFigures);
    this.props.socket.on("undoFigure", this.undoFigure);
    this.props.socket.on("redoFigure", this.redoFigure);

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
      // case "eraser":
      //   this.canvas.freeDrawingBrush = new fabric.EraserBrush(this.canvas);
      //   this.canvas.freeDrawingBrush.width = 10;
      //   this.canvas.isDrawingMode = true;
      //   break;
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
        if (this.undo.length > 0) {
          this.change = true;
          const last = this.undo.pop();
          //console.log(this.canvas.loadFromJSON(last)._objects);
          console.log(
            JSON.stringify(this.canvas.toDatalessJSON(this.canvas.extraProps))
          );
          this.redo.push(
            JSON.stringify(this.canvas.toDatalessJSON(this.canvas.extraProps))
          );
          this.props.socket.emit("undo", {
            figures: last,
            undo: this.undo,
            redo: this.redo,
            roomname: this.roomname,
          });
          // console.log(this.undo.length);
          console.log(this.canvas.loadFromJSON(last));
          const temp = this.canvas.loadFromJSON(last);
          temp.renderAll();
          console.log(this.redo);
          this.change = false;
          undoFigure(temp._objects, this.roomname);
        }
        // if (this.canvas._objects.length > 0) {
        //   let undoFig = this.canvas._objects.pop();
        //   this.redoArray.push(undoFig);
        //   this.canvas.renderAll();
        //   this.props.socket.emit("undo", {
        //     figure: undoFig,
        //     roomname: this.roomname,
        //     id: undoFig.id,
        //   });
        //
        // }
        this.props.setShape("selection");
        break;
      case "redo":
        if (this.redo.length > 0) {
          this.change = true;
          const last = this.redo.pop();
          console.log(this.redo);
          this.undo.push(
            JSON.stringify(this.canvas.toDatalessJSON(this.canvas.extraProps))
          );
          this.props.socket.emit("redo", {
            figures: last,
            undo: this.undo,
            redo: this.redo,
            roomname: this.roomname,
          });
          const temp = this.canvas.loadFromJSON(last);
          temp.renderAll();
          this.change = false;
          redoFigure(temp._objects, this.roomname);
        }

        // if (this.redoArray.length > 0) {
        //   let redoFigure = this.redoArray.pop();
        //   this.canvas.add(redoFigure);
        //   this.canvas.renderAll();
        //   this.props.socket.emit("redo", {
        //     figure: redoFigure,
        //     roomname: this.roomname,
        //     id: redoFigure.id,
        //   });
        //   addFigureAPI({
        //     figure: redoFigure,
        //     id: redoFigure.id,
        //     roomname: this.roomname,
        //   });
        // }
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
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}

export default Board;
