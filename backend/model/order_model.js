const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
  order_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order_date: {
    type: Date,
    required: true,
    default: Date.now,
    validate: {
      validator: function (val) {
        return val <= new Date();
      },
    },
  },
  order_total_amount: {
    type: Number,
    required: true,
  },

  order_status: {
    type: Boolean,
    required: true,
    default: false,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant",
        required: true,
      }, // Reference to Product
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
