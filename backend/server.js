const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/sleep", require("./routes/sleepRoutes"));

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
