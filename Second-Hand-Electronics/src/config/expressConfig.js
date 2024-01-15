const express = require("express");
const path = require("path");
const cookieParse = require("cookie-parser");
const { auth } = require("../middlewares/authMiddleware");

const expressConfig = (app) => {
  app.use(express.static(path.resolve(__dirname, "../static")));
  app.use(cookieParse());
  app.use(auth);
  app.use(express.urlencoded({ extended: false }));
};

module.exports = expressConfig;