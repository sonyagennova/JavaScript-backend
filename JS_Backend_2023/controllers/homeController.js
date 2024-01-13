const router = require('express').Router();
const animalService = require('../services/animalService');

router.get('/', async (req, res) => {
    console.log(req.user);
    const animal = await animalService.getAllByDate();
    res.render('home', {animal}); // This leads to views/home/index.hbs. When the file is called index, there's no need to write 'home/index.hbs' but just 'home'.
})


module.exports = router;