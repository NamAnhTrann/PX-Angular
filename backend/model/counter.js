const mongoose = require("mongoose");

// Define the counter schema
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Unique name for each counter (e.g., 'plant_id')
  seq: { type: Number, default: 0 }, // The sequence number
});

// Export the Counter model
module.exports = mongoose.model("Counter", counterSchema);
