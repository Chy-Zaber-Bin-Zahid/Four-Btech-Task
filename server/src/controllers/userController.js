const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");

// Register new user
const regUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    const arr = [];
    // Checking existing user by email
    if (existingUser) {
      arr.push("email");
    }

    // Checking telephone length
    if (req.body.phone.length < 11) {
      arr.push("telephone");
    }

    // Sending error message to client (front-end)
    if (arr.length === 2) {
      return res.status(400).json({
        error:
          "User with this email already exists and telephone is less than 11",
      });
    } else if (arr.length === 1 && arr[0] === "email") {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    } else if (arr.length === 1 && arr[0] === "telephone") {
      return res.status(400).json({
        error: "Telephone is less than 11",
      });
    }

    const createUser = await User.create(req.body);

    return successResponse(res, {
      statusCode: 200,
      message: "user account created successfully",
      payload: {
        user: createUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Fetch Data
const getData = async (req, res, next) => {
  try {
    const users = await User.find();
    return successResponse(res, {
      statusCode: 200,
      message: "all data fetched successfully",
      payload: {
        user: users,
      },
    });
  } catch (error) {
    next(err);
  }
};

// Delete User
const deleteData = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    return successResponse(res, {
      statusCode: 200,
      message: "user deleted successfully",
      payload: {
        user: deletedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get User by id
const getDataId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    return successResponse(res, {
      statusCode: 200,
      message: "user retrieved successfully",
      payload: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update Details by id
const updateDetails = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedDetails = req.body;
    console.log(updatedDetails);
    const user = await User.findByIdAndUpdate(userId, updatedDetails, {
      new: true,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User details updated successfully",
      payload: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  regUser,
  getData,
  deleteData,
  getDataId,
  updateDetails,
};
