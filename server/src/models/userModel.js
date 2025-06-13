const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required!"],
      trim: true,
      maxlength: [30, "The length of user name can be maximum 30 characters"],
    },
    email: {
      type: String,
      required: [true, "User email is required!"],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v);
        },
        message: "Please enter a valid email!",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;