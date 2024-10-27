const mongoose = require("mongoose");

let cartSchema = new mongoose.Schema({
  cart_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant",
        required: true,
      }, // Reference to Product
      quantity: { type: Number, required: true }, // Quantity of the product in the cart
    },
  ],
});
module.exports = mongoose.model("Cart", cartSchema);
