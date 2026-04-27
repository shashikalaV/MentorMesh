const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  maxCourses: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);