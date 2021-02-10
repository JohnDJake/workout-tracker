const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

if (process.env.NODE_ENV != "production") app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutTrackerDB", { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/api", require("./controllers/apiController"));

app.listen(PORT, () => console.log(`App running on port ${PORT}`));