require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/dbConfig");

//Import Routes
const userRoutes = require("./routes/userRoutes.js");

const app = express();
const PORT = process.env.PORT || 3001;

//Middleware Setup
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse incoming requests data
app.use(express.urlencoded({ extended: true }));

//Routes setup
app.use("/api/users", userRoutes);

// Catch-all route for testing the server is up by sending a message when the server is running
app.get("/", (req, res) => {
  res.send("Sudoku Backend is running...");
});

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
