const { addUser, removeUser } = require("../utils/socketUsers.js");
const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("connection established");
    socket.on("join", ({ username, roomname }, callback) => {
      username = username.trim().toLowerCase();
      roomname = roomname.trim().toLowerCase();
      const id = socket.id;
      const { error, message } = addUser({ username, roomname, id });
      if (message) {
        socket.join(roomname);
      }
      callback(error, message);
    });
    socket.on("drawFigures", ({ figure, id, roomname }) => {
      socket.broadcast.emit("newFigure", { figure, id, roomname });
    });
    socket.on("modifyFigure", ({ figure, id, roomname }) => {
      socket.broadcast.emit("updateFigure", { figure, id, roomname });
    });
  });
};
module.exports = initializeSocket;
