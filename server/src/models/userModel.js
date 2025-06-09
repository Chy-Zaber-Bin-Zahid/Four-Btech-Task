const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "User first name is required!"],
      trim: true,
      maxlength: [30, "The length of user name can be maximum 31 characters"],
    },
    lastName: {
      type: String,
      required: [true, "User last name is required!"],
      trim: true,
      maxlength: [30, "The length of user name can be maximum 31 characters"],
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
    phone: {
      type: String,
      required: [true, "User phone is required!"],
      minlength: [
        11,
        "The length of user telephone can be minimum 11 characters",
      ],
      maxlength: [
        11,
        "The length of user telephone can be maximum 11 characters",
      ],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
