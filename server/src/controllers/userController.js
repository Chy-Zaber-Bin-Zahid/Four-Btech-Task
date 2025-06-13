const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");

// Login check
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // Directly compare plain-text password
    if (existingUser.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Success login response
    return successResponse(res, {
      statusCode: 200,
      message: "Login successful",
      payload: {
        user: existingUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login
};
