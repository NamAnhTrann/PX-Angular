const mongoose = require("mongoose");
const Counter = require("./counter"); // Import the Counter model

// Define the plant schema
let plantSchema = new mongoose.Schema({
  plant_id: {
    type: String,
    unique: true,
  },
  plant_name: {
    type: String,
    required: true,
    minlegnth: [2, "plant name must be at least 2 characters"],
    maxlength: [100, "plant name cannot be more than 100 characters"],
    validate: {
      validator: function (val) {
        const allowedCharacters = /^[\p{L}\s]+$/u;
        return allowedCharacters.test(val);
      },
    },
  },
  plant_size: {
    type: String,
    required: true,
  },
  plant_cost: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        return val > 0;
      },
    },
  },

  plant_createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    valiedate: {
      validator: function (val) {
        return val <= new Date();
      },
    },
  },

  plant_available: {
    type: Boolean,
    default: true,
    required: [true, "Allocation is required"],
  },

  plant_quantity: {
    type: Number,
    required: true,
  },

  plant_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  imagePath: {
    type: String,
  },
});

// Pre-save middleware to handle plant_id generation
plantSchema.pre("save", async function (next) {
  const plant = this;

  // Only generate a new plant_id if it's not already set (e.g., during updates)
  if (!plant.plant_id) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "plant_id" }, // Find the counter for plant IDs
        { $inc: { seq: 1 } }, // Increment the counter by 1
        { new: true, upsert: true } // Create the counter if it doesn't exist
      );
      plant.plant_id = `PL${counter.seq}`; // Set the plant_id with the incremented sequence
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next(); // If plant_id is already set, proceed without generating a new one
  }
});

// Export the Plant model
module.exports = mongoose.model("Plant", plantSchema);
