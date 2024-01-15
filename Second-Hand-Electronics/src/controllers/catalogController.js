const router = require("express").Router();
const electronicsService = require("../services/electronicsService");

router.get("/catalog", async(req,res) => {
    const electronics = await electronicsService.getAll();
    //console.log(electronics)

    res.render("catalog", {electronics});
})

module.exports = router;