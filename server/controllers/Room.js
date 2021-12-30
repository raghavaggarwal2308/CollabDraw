const Room = require("../models/Room.js");

const addRoom = async (roomname, username) => {
  try {
    let room = await Room.findOne({ roomname });
    if (room == null) {
      room = await new Room({ roomname });
    }
    room.users.push({
      username,
      lineColor: "black",
      lineWidth: 2,
      shape: "rectangle",
    });
    await room.save();
    return room;
  } catch (e) {
    return { error: "Something went wrong" };
  }
};
const addFigure = async (request, response) => {
  const figure = request.body.figure;
  const roomname = request.body.roomname;
  const id = request.body.id;
  figure.id = id;
  try {
    let room = await Room.findOne({ roomname });
    room.figures.push(figure);
    await room.save();
    response.send({ message: "Figure added successfully" });
  } catch (e) {
    response.send({ message: e.message });
  }
};
const updateFigure = async (request, response) => {
  const figure = request.body.figure;
  const roomname = request.body.roomname;
  const id = request.body.id;
  figure.id = id;
  try {
    const room = await Room.findOne({ roomname });
    const index = room.figures.findIndex((figure) => figure.id === id);
    room.figures[index] = figure;
    await room.save();
    response.send({ message: "Figure updated successfully" });
  } catch (e) {
    response.json({ message: e.message });
  }
};
const getFigures = async (request, response) => {
  const roomname = request.query.roomname;
  const username = request.query.username;
  try {
    const room = await Room.findOne({ roomname });
    const index = room.users.findIndex((user) => user.username === username);
    if (room != null)
      response.send({
        figures: room.figures,
        lineColor: room.users[index].lineColor,
        lineWidth: room.users[index].lineWidth,
        shape: room.users[index].shape,
      });
  } catch (e) {
    response.json({ message: e.message });
  }
};

const clearCanvas = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    room.figures = [];
    await room.save();
    response.send({ message: "Canvas cleared" });
  } catch (e) {
    response.json({ message: e.message });
  }
};

const changeLineColor = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users.find(
      (user) => user.username === request.body.username
    );
    user.lineColor = request.body.lineColor;
    await room.save();
    response.send({ message: "Line Color updated" });
  } catch (e) {
    response.json({ message: e.message });
  }
};

const changeLineWidth = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users.find(
      (user) => user.username === request.body.username
    );
    user.lineWidth = request.body.lineWidth;
    await room.save();
    response.send({ message: "Line Width updated" });
  } catch (e) {
    response.json({ message: e.message });
  }
};

const changeShape = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users.find(
      (user) => user.username === request.body.username
    );
    if (
      request.body.shape !== "undo" &&
      request.body.shape !== "redo" &&
      request.body.shape !== "clear"
    )
      user.shape = request.body.shape;
    else user.shape = "selection";
    await room.save();
    response.send({ message: "Shape updated" });
  } catch (e) {
    response.json({ message: e.message });
  }
};
// const undoFigure = async (request, response) => {
//   try {
//     const room = await Room.findOne({ roomname: request.body.roomname });
//     room.figures = room.figures.filter(
//       (figure) => request.body.id !== figure.id
//     );
//     await room.save();
//     response.sed({ message: "undo successful" });
//   } catch (e) {
//     response.json({ message: e.message });
//   }
// };
const undoFigure = async (request, response) => {
  console.log(request.body.figures);
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    room.figures = request.body.figures;
    await room.save();
    response.send({ message: "undo successful" });
  } catch (e) {
    response.json({ message: e.message });
  }
};

module.exports = {
  addRoom,
  addFigure,
  updateFigure,
  getFigures,
  clearCanvas,
  changeLineWidth,
  changeLineColor,
  changeShape,
  undoFigure,
};
