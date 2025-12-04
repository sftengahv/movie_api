const express = require("express");
const app = express();

const morgan = require("morgan");

app.use(morgan("common"));

app.use(express.static("public"));

let topMovies = []

app.get("/", (req, res) => {
  res.send("Welcome to my Express app!");
});

// GET route for "/movies"
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// Set the port
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});