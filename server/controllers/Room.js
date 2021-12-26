const Room = require("../models/Room.js");

const addRoom = async (roomname, username) => {
  try {
    let room = await Room.findOne({ roomname });
    if (room == null) {
      room = await new Room({ roomname });
    }
    room.users.push({ username });
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
  try {
    const room = await Room.findOne({ roomname });
    if (room != null) response.send({ figures: room.figures });
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
module.exports = { addRoom, addFigure, updateFigure, getFigures, clearCanvas };
