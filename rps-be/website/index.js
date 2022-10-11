const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;
const path = path.resolve(__dirname, './build/');

app.use(express.static(path));

app.get('/', function (req,res) {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});

// Handle requests for a route that does not exist
app.use(function (req, res, next) {
  res.status(404).send("Error: We're unable to find the information you are looking for. Please try again.");
});