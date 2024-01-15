const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt")
const SECRET = "8ee647d6-4d27-470a-b551-b2f09bef4c52"

exports.register = (userData) => {
  return User.create(userData);
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new Error("Invalid email or password!");
    }
  
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid email or password!");
    }
  
    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
  
    const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });
  
    return token;
  };