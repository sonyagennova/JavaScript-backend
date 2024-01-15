const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    minLength: [10, "Email too short!"],
    match: [
      /^[A-Za-z0-9]+[@][a-z]+[.][a-z]+$/,
      "Incorrect email address!",
    ],
    unique: {
      value: true,
      message: "Email already exists",
    },
  },

  username: {
    type: String,
    required: [true, "Username is required!"],
    minLength: [3, "Username too short!"],
    unique: {
      value: true,
      message: "Username already exists",
    },
  },

  password: {
    type: String,
    minLength: [4, "Password too short!"],
    required: true
  },
});

userSchema.path("email").validate(function (email) {
  const user = mongoose.model("User").findOne({ email });
  return !!user;
}, "Email already exists!");


userSchema.virtual("rpassword").set(function (value) {
    console.log({value})
  if (value !== this.password) {
    throw new Error("Password mismatch!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash; 
});

const User = mongoose.model("User", userSchema);

module.exports = User;