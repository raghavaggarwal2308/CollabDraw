const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
  {
    roomname: {
      $type: String,
      required: true,
    },
    users: [
      {
        username: String,
        lineColor: String,
        lineWidth: Number,
        shape: String,
      },
    ],
    figures: [
      {
        type: String,
        version: String,
        strokeDashArray: String,
        strokeLineCap: String,
        strokeDashOffset: Number,
        strokeLineJoin: String,
        strokeUniform: Boolean,
        strokeMiterLimit: Number,
        scaleX: Number,
        scaleY: Number,
        flipX: Boolean,
        flipY: Boolean,
        opacity: Number,
        shadow: String,
        visible: Boolean,
        backgroundColor: String,
        fillRule: String,
        paintFirst: String,
        globalCompositeOperation: String,
        skewX: Number,
        skewY: Number,
        id: String,
        left: Number,
        top: Number,
        rx: Number,
        ry: Number,
        originX: String,
        originY: String,
        angle: Number,
        fill: String,
        stroke: String,
        strokeWidth: Number,
        width: Number,
        height: Number,
      },
    ],
  },
  { typeKey: "$type" }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
