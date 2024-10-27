const mongoose = require("mongoose");

let paymentSchema = new mongoose.Schema({
  payment_order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },

  payment_date: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (val) {
        return val <= new Date();
      },
    },
  },
  payment_amount: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    enum: ["credit card", "paypal", "cash on delivered"],
  },
  required: true,
});

module.exports = mongoose.model("Payment", paymentSchema);
