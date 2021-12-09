const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/db.js");
const userRoutes = require("./routes/User.js");
const cors = require("cors");
connectDB();

const app = express();
const PORT = process.env.port || 5000;
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
