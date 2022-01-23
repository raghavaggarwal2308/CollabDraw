const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const cron = require("node-cron");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const connectDB = require("./db/db.js");
const initializeSocket = require("./socket/socket.js");
const userRoutes = require("./routes/User.js");
const roomRoutes = require("./routes/Room.js");
const cors = require("cors");
const Room = require("./models/Room.js");
connectDB();
initializeSocket(io);

const PORT = process.env.port || 5000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(function (req, res, next) {
  req.io = io;
  next();
});
app.use(userRoutes);
app.use(roomRoutes);
cron.schedule("*/2 * * * *", async function () {
  const rooms = await Room.find();
  console.log("cron fired");
  for (room of rooms) {
    room.users = room.users.filter((user) => {
      return user.delete !== true;
    });
    await room.save();
  }
});
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
