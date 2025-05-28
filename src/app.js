const express = require("express");
const routes = require("./routes/index");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // Allow CORS for all origins
app.use(bodyParser.json({ limit: '1gb' })); // Increase the limit for JSON body parsing
app.use("/api", routes); // all routes prefixed with /api

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

module.exports = app;
