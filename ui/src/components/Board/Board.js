import React from "react";
import { fabric } from "fabric";
import "./Board.css";
import uuid from "react-uuid";
// import brush from "./FabricBrush.js";
import {
  addFigureAPI,
  updateFigure,
  getFigures,
  clearCanvas,
  undoFigure,
  redoFigure,
  changeshowSidebar,
} from "../../api/Room";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.rect = null;
    this.ellipse = null;
    this.line = null;
    this.pencil = null;
    this.text = null;
    this.origX = null;
    this.origY = null;
    this.isDown = false;
    this.clipboard = null;
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
      case "text":
        this.text = new fabric.IText("", {
          id: uuid(),
          left: this.origX,
          top: this.origY,
          fontFamily: "arial black",
          fill: this.props.fillColor,
          fontSize: 30,
          stroke: this.props.lineColor,
          opacity: this.props.opacity,
          strokeUniform: true,
          strokeWidth: this.props.lineWidth,
        });
        this.canvas.add(this.text);
        this.canvas.setActiveObject(this.text);
        this.text.selectAll();
        this.text.enterEditing();
        this.text.hiddenTextarea.focus();
        break;
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
          fill: this.props.fillColor,
          stroke: this.props.lineColor,
          strokeWidth: this.props.lineWidth,
          opacity: this.props.opacity,
          strokeDashArray: [this.props.lineStyle],
          strokeUniform: true,
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
          fill: this.props.fillColor,
          stroke: this.props.lineColor,
          strokeWidth: this.props.lineWidth,
          strokeDashArray: [this.props.lineStyle],
          opacity: this.props.opacity,
          strokeUniform: true,
        });
        this.canvas.add(this.ellipse);
        break;
      case "line":
        this.line = new fabric.Line(points, {
          id: uuid(),
          fill: this.props.fillColor,
          stroke: this.props.lineColor,
          strokeWidth: this.props.lineWidth,
          strokeDashArray: [this.props.lineStyle],
          originX: "center",
          originY: "center",
          angle: 0,
          opacity: this.props.opacity,
          strokeUniform: true,
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
        if (figure.type !== "i-text") {
          this.saveAction();
        }
        addFigureAPI({ figure, id, roomname });
        this.props.socket.emit("drawFigures", { figure, id, roomname });
        this.redo = [];
      }
    }
    if (this.props.shape !== "selection") {
      this.props.setshowSidebar(false);
      changeshowSidebar(false, this.roomname, this.username);
    }

    if (this.props.lock === false) {
      this.canvas.isDrawingMode = false;
      this.props.setShape("selection");
    }
  };
  modify = (o) => {
    console.log("modified");
    const figures = JSON.stringify(
      this.canvas.toDatalessJSON(this.canvas.extraProps)
    );
    updateFigure({
      figures: this.canvas.toDatalessJSON(this.canvas.extraProps).objects,
      roomname: this.roomname,
    });
    this.props.socket.emit("modifyFigure", {
      figures,
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
            strokeDashArray: figure.strokeDashArray,
            opacity: figure.opacity,
            strokeUniform: figure.strokeUniform,
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
            fill: figure.fill,
            stroke: figure.stroke,
            strokeWidth: figure.strokeWidth,
            strokeDashArray: figure.strokeDashArray,
            opacity: figure.opacity,
            strokeUniform: figure.strokeUniform,
          })
        );
        break;
      case "line":
        let points = [figure.x1, figure.y1, figure.x2, figure.y2];
        this.line = new fabric.Line(points, {
          id,
          left: figure.left,
          top: figure.top,
          fill: figure.fill,
          stroke: figure.stroke,
          strokeWidth: figure.strokeWidth,
          originX: figure.originX,
          originY: figure.originY,
          scaleX: figure.scaleX,
          scaleY: figure.scaleY,
          flipX: figure.flipX,
          flipY: figure.flipY,
          angle: figure.angle,
          strokeDashArray: figure.strokeDashArray,
          opacity: figure.opacity,
          strokeUniform: figure.strokeUniform,
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
          strokeUniform: figure.strokeUniform,
        });
        this.canvas.add(this.pencil);
        break;
      case "i-text":
        this.text = new fabric.IText(figure.text, {
          id,
          left: figure.left,
          top: figure.top,
          flipX: figure.flipX,
          flipY: figure.flipY,
          angle: figure.angle,
          scaleX: figure.scaleX,
          scaleY: figure.scaleY,
          fontFamily: figure.fontFamily,
          fill: figure.fill,
          stroke: figure.stroke,
          strokeWidth: figure.strokeWidth,
          opacity: figure.opacity,
          strokeUniform: figure.strokeUniform,
          fontSize: figure.fontSize,
        });
        this.canvas.add(this.text);
        break;
      default:
    }
    this.saveAction();
  };
  updateFigure = ({ figures, roomname }) => {
    if (this.roomname === roomname) {
      this.canvas.loadFromJSON(figures).renderAll();
      this.saveAction();
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
    if (this.props.lock === false) this.props.setShape("selection");
    this.props.setshowSidebar(true);
    if (o.target.path === undefined) this.props.setselectedShape("fig");
    else if (o.target.path === null) this.props.setselectedShape("text");
    else this.props.setselectedShape("pencil");
    changeshowSidebar(true, this.roomname, this.username);
  };
  deselection = (o) => {
    if (this.props.shape === "selection") {
      this.props.setselectedShape("");
      this.props.setshowSidebar(false);
      changeshowSidebar(false, this.roomname, this.username);
    }
  };
  undoFigure = ({ figures, undo, redo, roomname }) => {
    if (this.roomname === roomname) {
      this.change = true;
      this.redo = redo;
      this.undo = undo;
      this.canvas.loadFromJSON(figures).renderAll();
      this.change = false;
    }
  };
  redoFigure = ({ figures, undo, redo, roomname }) => {
    if (this.roomname === roomname) {
      this.change = true;
      this.redo = redo;
      this.undo = undo;
      this.canvas.loadFromJSON(figures).renderAll();
      this.change = false;
    }
  };
  deleteSelectedFigure = () => {
    let flag = false;
    this.canvas.getActiveObjects().forEach((object) => {
      if (!object.isEditing) this.canvas.remove(object);
      else flag = true;
    });
    if (!flag) {
      if (this.canvas.getActiveObjects().length > 1)
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
  keyDown = (e) => {
    if (e.keyCode === 8 && this.canvas.getActiveObjects().length > 0) {
      this.deleteSelectedFigure();
    }
  };
  saveAction = () => {
    if (this.change) return;
    this.undo.push(this.currentStatus);
    this.currentStatus = JSON.stringify(
      this.canvas.toDatalessJSON(this.canvas.extraProps)
    );
  };
  componentDidMount() {
    this.canvas = new fabric.Canvas("canvas");
    // this.canvas.setDimensions({
    //   height: 400,
    //   width: 500,
    // });
    this.currentStatus = JSON.stringify(
      this.canvas.toDatalessJSON(this.canvas.extraProps)
    );
    //brush();
    // this.canvas.on("erasing:end", (o) => {
    //   this.modify(o);
    //   // o.targets.forEach((target) => {
    //   //   this.props.socket.emit("modifyFigure", {
    //   //     figure: target,
    //   //     id: target.id,
    //   //     roomname: this.roomname,
    //   //   });
    //   // });

    // });
    // this.props.socket.on("eraseFigure", ({ figure, id, roomname }) => {
    //   const object = this.canvas._objects.find((obj) => obj.id === id);
    // });
    this.canvas.on("mouse:down", this.start);

    this.canvas.on("mouse:move", this.draw);

    this.canvas.on("mouse:up", this.finish);
    this.canvas.on("selection:cleared", this.deselection);
    this.canvas.on("selection:created", this.selection);
    this.canvas.on("selection:updated", this.selection);
    this.canvas.on("object:modified", (o) => {
      this.modify(o);
      this.saveAction();
    });

    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", (e) => {
      if (this.canvas.getActiveObjects().length === 1) {
        const object = this.canvas.getActiveObject();
        if (object.type === "i-text" && object.isEditing) {
          this.props.socket.emit("text", {
            text: object.text,
            textLines: object.textLines,
            id: object.id,
            roomname: this.roomname,
          });
        }
      }
    });
    this.props.socket.on("textUpdate", ({ text, textLines, id, roomname }) => {
      if (this.roomname === roomname) {
        const obj = this.canvas._objects.find((object) => object.id === id);
        if (obj != null) {
          obj.set({ text, textLines });
          this.canvas.renderAll();
        }
      }
    });
    this.props.socket.on("newFigure", this.newFigure);
    this.props.socket.on("updateFigure", this.updateFigure);
    this.props.socket.on("deleteFigures", this.deleteFigures);
    this.props.socket.on("undoFigure", this.undoFigure);
    this.props.socket.on("redoFigure", this.redoFigure);

    getFigures(this.roomname, this.username).then((res) => {
      if (res !== undefined) {
        const figures = res.data.figures;
        figures &&
          res.data.figures.map((figure) => this.addFigure(figure, figure.id));
        this.props.setShape(res.data.shape);
        this.props.setLineColor(res.data.lineColor);
        this.props.setLineWidth(res.data.lineWidth);
        this.props.setOpacity(res.data.opacity);
        this.props.setLineStyle(res.data.lineStyle);
        this.props.setFillColor(res.data.fillColor);
        this.props.setlock(res.data.lock);
        this.props.setshowSidebar(res.data.showSidebar);
        this.props.setroomUsers(res.data.users);
      }
    });
  }
  downloadCanvasPNG = function () {
    var link = document.createElement("a");

    link.href = this.canvas.toDataURL({
      format: "png",
    });
    link.download = "canvas.png";
    link.click();
  };
  downloadCanvasSVG = function () {
    var link = document.createElement("a");

    link.href =
      "data:image/svg+xml;utf8," + encodeURIComponent(this.canvas.toSVG());
    link.download = "canvas.svg";
    link.click();
  };
  changeSelectedItem = (prevProps) => {
    let flag = false;
    if (prevProps.lineColor !== this.props.lineColor) {
      this.canvas.getActiveObjects().forEach((obj) => {
        obj.set({ stroke: this.props.lineColor });
      });
      flag = true;
    } else if (prevProps.opacity !== this.props.opacity) {
      this.canvas.getActiveObjects().forEach((obj) => {
        obj.set({ opacity: this.props.opacity });
      });
      flag = true;
    } else if (prevProps.lineWidth !== this.props.lineWidth) {
      this.canvas.getActiveObjects().forEach((obj) => {
        obj.set({ strokeWidth: this.props.lineWidth });
      });
      flag = true;
    } else if (prevProps.fillColor !== this.props.fillColor) {
      this.canvas.getActiveObjects().forEach((obj) => {
        obj.set({ fill: this.props.fillColor });
      });
      flag = true;
    } else if (prevProps.lineStyle !== this.props.lineStyle) {
      this.canvas.getActiveObjects().forEach((obj) => {
        obj.set({ strokeDashArray: [this.props.lineStyle] });
      });
      flag = true;
    }
    if (flag) {
      this.canvas.renderAll();
      const figures = JSON.stringify(
        this.canvas.toDatalessJSON(this.props.extraProps)
      );
      updateFigure({
        figures: this.canvas.toDatalessJSON(this.canvas.extraProps).objects,
        roomname: this.roomname,
      });
      this.saveAction();
      this.props.socket.emit("modifyFigure", {
        figures,
        roomname: this.roomname,
      });
    }
  };
  copy = () => {
    this.canvas.getActiveObject().clone((cloned) => {
      this.clipboard = cloned;
    });
  };

  paste = () => {
    this.clipboard.clone((clonedObj) => {
      this.canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });
      if (clonedObj.type === "activeSelection") {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = this.canvas;
        clonedObj.forEachObject((obj) => {
          this.canvas.add(obj);
        });
        // this should solve the unselectability
        clonedObj.setCoords();
      } else {
        this.canvas.add(clonedObj);
      }
      this.clipboard.top += 10;
      this.clipboard.left += 10;
      this.canvas.setActiveObject(clonedObj);
      this.canvas.requestRenderAll();
    });
  };
  componentDidUpdate(prevProps) {
    this.changeSelectedItem(prevProps);
    if (this.props.lock === true) {
      this.canvas.selection = false;
    } else {
      this.canvas.selection = true;
    }
    if (this.props.deselect) {
      this.canvas.forEachObject((o) => {
        o.selectable = false;
      });
      this.canvas.discardActiveObject().renderAll();
      this.props.setdeselect(false);
    }
    switch (this.props.shape) {
      case "copy":
        this.copy();
        this.paste();
        this.saveAction();
        this.modify();
        this.props.setShape("selection");
        break;
      case "download":
        this.props.setshowSidebar(true);
        break;
      case "delete":
        this.deleteSelectedFigure();
        break;
      case "downloadpng":
        this.downloadCanvasPNG();
        this.props.setShape("selection");
        break;
      case "downloadsvg":
        this.downloadCanvasSVG();
        this.props.setShape("selection");
        break;
      // case "eraser":
      //   this.canvas.isDrawingMode = false;
      //   this.canvas.freeDrawingBrush = new fabric.EraserBrush(this.canvas);
      //   this.canvas.freeDrawingBrush.width = 10;
      //   this.canvas.isDrawingMode = true;
      //   break;
      case "pencil":
        this.canvas.isDrawingMode = false;
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush.width = this.props.lineWidth;
        this.canvas.freeDrawingBrush.color = this.props.lineColor;
        break;
      case "selection":
        this.canvas.forEachObject(function (o) {
          o.set({ selectable: true }).setCoords();
        }).selection = true;
        this.canvas.isDrawingMode = false;
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
          this.redo.push(
            JSON.stringify(this.canvas.toDatalessJSON(this.canvas.extraProps))
          );
          this.props.socket.emit("undo", {
            figures: last,
            undo: this.undo,
            redo: this.redo,
            roomname: this.roomname,
          });
          const temp = this.canvas.loadFromJSON(last);
          temp.renderAll();
          this.change = false;
          undoFigure(temp._objects, this.roomname);
        }
        this.props.setShape("selection");
        break;
      case "redo":
        if (this.redo.length > 0) {
          this.change = true;
          const last = this.redo.pop();
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
        <canvas id="canvas" height={1500} width={3000}></canvas>
      </div>
    );
  }
}

export default Board;
