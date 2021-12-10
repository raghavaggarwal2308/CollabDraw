const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const connectDB = require("./db/db.js");
const initializeSocket = require("./socket/socket.js");
const userRoutes = require("./routes/User.js");
const cors = require("cors");
connectDB();
initializeSocket(io);

const PORT = process.env.port || 5000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(userRoutes);
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
