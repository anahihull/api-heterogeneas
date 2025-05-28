const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use("/api", routes); // all routes prefixed with /api

module.exports = app;
