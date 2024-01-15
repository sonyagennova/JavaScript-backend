const router = require("express").Router();
const electronicsService = require("../services/electronicsService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/create",isAuth, (req,res) => {
    res.render("create");
})

router.post("/create", async (req,res) => {
    const { name, type, damages, image, description, production, exploitation, price } = req.body;

    try{
        await electronicsService.createElectronics({
            name,
            type,
            damages,
            image,
            description,
            production,
            exploitation,
            price,
            owner: req.user
        })
        res.redirect("/catalog");

    } catch(err){
        const errorMessages = extractErrorMsgs(err);
        res.status(404).render("create", { errorMessages });
    }

})

module.exports = router;