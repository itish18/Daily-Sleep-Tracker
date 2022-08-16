const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static("public"));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/sleep", require("./routes/sleepRoutes"));

app.listen(process.env.PORT, () => {
  console.log("On Port 5000");
});
