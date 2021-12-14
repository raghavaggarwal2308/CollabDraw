const { addUser, removeUser } = require("../utils/socketUsers.js");
const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("connection established");
    socket.on("join", ({ username, roomname }, callback) => {
      username = username.trim().toLowerCase();
      roomname = roomname.trim().toLowerCase();
      const id = socket.id;
      const { error, message } = addUser({ username, roomname: "12345", id });
      if (message) {
        socket.join("1235");
      }
      callback(error, message);
    });

    socket.on("drawFigures", (object) => {
      console.log(socket.to("12345"));
      socket.broadcast.emit("newFigure", "test");
      //io.sockets.in("12345").emit("newFigure", "test");
      //io.to("html").emit("", "test");
    });
  });
};
module.exports = initializeSocket;
