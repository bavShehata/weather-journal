// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
// Callback to debug
app.listen(8000, () => {
  console.log("Listening on port 8000");
});

// Initialize all route with a callback function
app.get("/all", (req, res) => {
  res.send(projectData);
});
app.delete("/all", (req, res) => {
  projectData = [];
  res.send(null);
});
app.post("/", (req, res) => {
  const newEntry = {
    city: req.body.city,
    units: req.body.units.value,
    description: req.body.weather[0].description,
    temp_min: req.body.main.temp_min,
    temp_max: req.body.main.temp_max,
    temp: req.body.main.temp,
    humidity: req.body.main.humidity,
    fact: req.body.fact,
  };
  projectData.push(newEntry);
  res.send(projectData);
});
