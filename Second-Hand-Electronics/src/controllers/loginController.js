const router = require("express").Router();
const userService = require("../services/userService");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/login", (req,res) => {
    res.render("login");
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try{
        const token = await userService.login(email, password);
        res.cookie("auth", token, { httpOnly: true });
        res.redirect("/");
    } catch(err){
        const errorMessages = extractErrorMsgs(err);
        res.status(404).render("login", { errorMessages });
    }
});

module.exports = router;