const { addUser, removeUser } = require("../utils/socketUsers.js");
const { addRoom } = require("../controllers/Room.js");
const initializeSocket = (io) => {
  let room, user;
  io.on("connection", (socket) => {
    console.log("connection established");
    socket.on("join", ({ username, roomname, singleroom }, callback) => {
      const id = socket.id;
      roomname = roomname.trim().toLowerCase();
      username = username.trim().toLowerCase();
      room = roomname;
      user = username;
      if (singleroom) {
        socket.join(roomname);
        addRoom(roomname, username, singleroom, socket.id);
        callback(null, "User added");
      } else {
        addUser({ username, roomname, id }).then((res) => {
          const { error, message } = res;
          if (message) {
            socket.join(roomname);
            addRoom(roomname, username, singleroom, socket.id).then((res) => {
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

    socket.on("text", ({ text, textLines, id, roomname }) => {
      socket.broadcast.emit("textUpdate", { text, textLines, id, roomname });
    });

    socket.on("disconnectUser", ({ username, roomname }) => {
      removeUser(roomname, socket.id);
    });
    // io.of("/").adapter.on("leave-room", (room, id) => {
    //   console.log(`socket ${id} has joined room ${room}`);
    // });
    // socket.on("disconnecting", function (e) {
    //   const rooms = Array.from(socket.rooms);
    //   if (rooms.length == 2) {
    //     let roomname = rooms[1];
    //     removeUser(roomname, socket.id);
    //     console.log(roomname);
    //   }
    //   // console.log();
    //   //console.log(socket.id);
    // });
  });
};
module.exports = initializeSocket;
