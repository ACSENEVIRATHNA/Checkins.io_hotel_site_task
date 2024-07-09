const express = require("express");
const cors = require("cors");
const bodyPasrser = require("body-parser");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(bodyPasrser.json());
app.use(bodyPasrser.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use("/api/user", authRoutes);

//middlewares
app.use(notFound);
app.use(errorHandler);
module.exports = app;
