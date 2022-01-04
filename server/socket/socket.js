const { addUser, removeUser } = require("../utils/socketUsers.js");
const { addRoom } = require("../controllers/Room.js");
const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("connection established");
    socket.on("join", ({ username, roomname }, callback) => {
      username = username.trim().toLowerCase();
      roomname = roomname.trim().toLowerCase();
      const id = socket.id;
      addUser({ username, roomname, id }).then((res) => {
        const { error, message } = res;
        if (message) {
          socket.join(roomname);
          addRoom(roomname, username);
        }
        callback(error, message);
      });
    });
    socket.on("drawFigures", ({ figure, id, roomname }) => {
      socket.broadcast.emit("newFigure", { figure, id, roomname });
    });
    // socket.on("modifyFigure", ({ figure, id, roomname }) => {
    //   console.log(figure);
    //   socket.broadcast.emit("updateFigure", { figure, id, roomname });
    // });
    socket.on("modifyFigure", ({ figures, roomname }) => {
      console.log(figures);
      socket.broadcast.emit("updateFigure", { figures, roomname });
    });
    socket.on("clear", ({ roomname }) => {
      socket.broadcast.emit("deleteFigures", roomname);
    });
    // socket.on("undo", ({ figure, roomname, id }) => {
    //   socket.broadcast.emit("undoFigure", { figure, roomname, id });
    // });
    socket.on("undo", ({ figures, undo, redo, roomname }) => {
      socket.broadcast.emit("undoFigure", { figures, undo, redo, roomname });
    });
    // socket.on("redo", ({ figure, roomname, id }) => {
    //   socket.broadcast.emit("newFigure", { figure, id, roomname });
    // });
    socket.on("redo", ({ figures, undo, redo, roomname }) => {
      socket.broadcast.emit("redoFigure", { figures, undo, redo, roomname });
    });
    socket.on("disconnectUser", ({ username, roomname }) => {
      removeUser(username, roomname);
    });
  });
};
module.exports = initializeSocket;
