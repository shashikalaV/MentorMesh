// Import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

// ================= LOGIN API =================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    // 3️⃣ Success
    res.status(200).json({
      message: "Login successful ✅",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
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