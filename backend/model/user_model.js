const mongoose = require("mongoose");
const Counter = require("./counter"); // Import the Counter model

let userSchema = new mongoose.Schmema({
  user_id: {
    type: String,
    unique: true,
  },
  user_lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return /^[a-zA-Z\s]+$/.test(val) && val.length >= 3 && val.length <= 20;
      },
    },
  },

  user_firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return /^[a-zA-Z\s]+$/.test(val) && val.length >= 3 && val.length <= 20;
      },
    },
  },

  user_email: {
    type: String,
    required: true,
  },

  user_address: {
    type: String,
    required: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.user_id) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { name: "user_id" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      user.user_Id = `U${counter.seq}`;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
