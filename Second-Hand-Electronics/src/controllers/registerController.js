const router = require("express").Router();
const { extractErrorMsgs } = require("../utils/errorHandler");
const userService = require("../services/userService");

router.get("/register", (req,res) => {
    res.render("register");
})

router.post("/register", async(req, res) => {
    const { email, username, password, rpassword } = req.body;
    //console.log(req.body)

    try {
        await userService.register({ email, username, password, rpassword });
        const token = await userService.login(email, password);
        res.cookie("auth", token, { httpOnly: true });
        res.redirect("/");
    } catch (err) {
        const errorMessages = extractErrorMsgs(err);
        res.status(404).render("register", { errorMessages });
    }
})

module.exports = router;