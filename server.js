// Setup empty JS object to act as endpoint for all routes
projectData = {};

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
  projectData = {};
  res.send(null);
});
app.post("/", (req, res) => {
  // from unix timestamp to actual date
  const ts = req.body.data.dt;
  const ts_ms = ts * 1000;
  // initialize new Date object
  const date_ob = new Date(ts_ms);
  // year as 4 digits (YYYY)
  const year = date_ob.getFullYear();
  // month as 2 digits (MM)
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // date as 2 digits (DD)
  const day = ("0" + date_ob.getDate()).slice(-2);
  // date as YYYY-MM-DD format
  projectData = {
    city: req.body.data.city,
    units: req.body.data.units.value,
    description: req.body.data.weather[0].description,
    temp_min: req.body.data.main.temp_min,
    temp_max: req.body.data.main.temp_max,
    temp: req.body.data.main.temp,
    humidity: req.body.data.main.humidity,
    date: `${year} - ${month} - ${day}`,
    fact: req.body.data.fact,
  };
  res.send(projectData);
});
