const { addUser, removeUser } = require("../utils/socketUsers.js");
const { addRoom } = require("../controllers/Room.js");
const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("connection established");
    socket.on("join", ({ username, roomname, singleroom }, callback) => {
      const id = socket.id;
      if (singleroom) {
        socket.join(roomname);
        addRoom(roomname, username, singleroom);
        callback(null, "User added");
      } else {
        addUser({ username, roomname, id }).then((res) => {
          const { error, message } = res;
          if (message) {
            socket.join(roomname);
            addRoom(roomname, username, singleroom).then((res) => {
              io.emit("users", { roomname, users: res });
            });
          }
          callback(error, message);
        });
      }
    });
    socket.on("drawFigures", ({ figure, id, roomname }) => {
      socket.broadcast.emit("newFigure", { figure, id, roomname });
    });

    socket.on("modifyFigure", ({ figures, roomname }) => {
      socket.broadcast.emit("updateFigure", { figures, roomname });
    });
    socket.on("clear", ({ roomname }) => {
      socket.broadcast.emit("deleteFigures", roomname);
    });

    socket.on("undo", ({ figures, undo, redo, roomname }) => {
      socket.broadcast.emit("undoFigure", { figures, undo, redo, roomname });
    });

    socket.on("redo", ({ figures, undo, redo, roomname }) => {
      socket.broadcast.emit("redoFigure", { figures, undo, redo, roomname });
    });

    socket.on("text", ({ text, textLines, id }) => {
      socket.broadcast.emit("textUpdate", { text, textLines, id });
    });

    socket.on("disconnectUser", ({ username, roomname }) => {
      removeUser(username, roomname);
    });
  });
};
module.exports = initializeSocket;
