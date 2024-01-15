const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const electronicsService = require("../services/electronicsService");

router.get("/:electronicsId/edit", isAuth, async(req,res) => {
    const { electronicsId } = req.params;
    const electronic = await electronicsService.getSingle(electronicsId).lean();
  
    res.render("edit", { electronic });
})

router.post("/:electronicsId/edit", async (req, res) => {
    const { electronicsId } = req.params;
    const { name, type, production, exploitation, damages, image, price, description } = req.body;
    const payload = { name, type, damages, image, description, production, exploitation, price };
  
    await electronicsService.update(electronicsId, payload);
  
    res.redirect(`/${electronicsId}/details`);
});

module.exports = router;