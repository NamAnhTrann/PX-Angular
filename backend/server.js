const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//import
const plantRoutes = require("./route/plant_route");

let app = express();
app.use(express.json());
app.use(plantRoutes);
// app.use(userRoutes);

//constants
const url = process.env.DB_URL; // Access the DB URL from .env

//IIFE method to start both server and database (db first) without calling the method in a new line
(async function connectDBAndStartServer() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");

    // Start the server after successful DB connection
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1); // Exit if connection fails
  }
})();
