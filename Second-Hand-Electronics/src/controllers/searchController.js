const router = require("express").Router();
const electronicsService = require("../services/electronicsService"); 

router.get('/search', async (req, res) => {
    res.render('search');
});

router.post('/search', async (req, res) => {
    const {name, type} = req.body;
    const electronic = await electronicsService.search(name, type);

    res.render('search', {electronic, name, type});
});

module.exports = router;