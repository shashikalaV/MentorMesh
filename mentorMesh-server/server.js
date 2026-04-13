// Import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt"); // 🔐 for hashing
const User = require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/mentorMeshDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("MentorMesh API is running 🚀");
});

// ================= REGISTER API =================
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists ❌" });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully ✅",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error ❌",
    });
  }
});

// ================= START SERVER =================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});