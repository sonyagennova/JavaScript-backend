const { isAuth } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/logout", isAuth, (req,res) => {
    res.clearCookie("auth");
    res.redirect("/");
})

module.exports = router;