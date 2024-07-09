const express = require("express");
const cors = require("cors");
const bodyPasrser = require("body-parser");

const app = express();

app.use(cors());

app.use(bodyPasrser.json());
app.use(bodyPasrser.urlencoded({extended : false}));

module.exports = app;
