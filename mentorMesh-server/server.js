// ================= IMPORTS =================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
mongoose.connect("mongodb://127.0.0.1:27017/mentorMeshDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("MentorMesh API is running 🚀");
});

// ================= REGISTER API =================
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists ❌" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
      subscription: "free",
    });

    await newUser.save();

    // ✅ SEND USER DATA (for auto login)
    res.status(201).json({
      message: "User registered successfully ✅",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        subscription: newUser.subscription,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// ================= LOGIN API =================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    // Success
    res.status(200).json({
      message: "Login successful ✅",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error ❌" });
  }
});

const Subscription = require("./models/Subscription");

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// CREATE SUBSCRIPTION (Admin)
app.post("/api/subscription", async (req, res) => {
  try {
    const { name, maxCourses } = req.body;

    const existing = await Subscription.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Plan already exists" });
    }

    const plan = new Subscription({ name, maxCourses });
    await plan.save();

    res.json({ message: "Subscription created ✅", plan });

  } catch (err) {
    res.status(500).json({ message: "Error creating subscription" });
  }
});

// GET ALL PLANS
app.get("/api/subscriptions", async (req, res) => {
  try {
    const plans = await Subscription.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching plans" });
  }
});

// ================= START SERVER =================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



