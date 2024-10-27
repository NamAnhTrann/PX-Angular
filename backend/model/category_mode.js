const mongoose = require("mongoose");

let categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
