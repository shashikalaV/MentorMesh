const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  subscription: {
    type: String,
    enum: ["free", "gold", "platinum"],
    default: "free",
  },
});

module.exports = mongoose.model("User", userSchema);