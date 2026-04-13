// Import mongoose
const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // must be provided
  },
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // adds createdAt & updatedAt

// Create model
const User = mongoose.model("User", userSchema);

// Export model
module.exports = User;