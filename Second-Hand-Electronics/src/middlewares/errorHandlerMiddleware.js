const { extractErrorMsgs } = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  const errorMessages = extractErrorMsgs(err);
  res.render("404", { errorMessages });
};