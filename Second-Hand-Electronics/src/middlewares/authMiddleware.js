const jwt = require("../lib/jwt");
const SECRET = "8ee647d6-4d27-470a-b551-b2f09bef4c52"

exports.auth = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      next();
    } catch (error) {
      console.log({ error });
      res.clearCookie("auth");
      res.redirect("/login");
    }
  } else {
    next();
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  next();
};