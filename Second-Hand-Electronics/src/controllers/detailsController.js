const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const electronicsService = require("../services/electronicsService");

router.get("/:electronicId/details", async(req,res) => {
    const { electronicId } = req.params;
    const electronic = await electronicsService.getSingle(electronicId).lean();

    if (!electronic) {
        res.redirect("/404");
        return;
    }

    const isBought = electronic.buyingList?.some(id => id === req.user?._id);
    const isOwner = electronic.owner?.toString() === req.user?._id;

    res.render("details", {electronic, isBought, isOwner});
})

router.get("/:electronicId/buy", isAuth, async(req, res) => {
    const electronicId = req.params.electronicId;
    await electronicsService.buy(req.user._id, electronicId);

    res.redirect(`/${electronicId}/details`);
})

router.get("/:electronicId/delete", isAuth, async(req, res) => {
    await electronicsService.delete(req.params.electronicId);
      
    res.redirect("/catalog");
})

module.exports = router;