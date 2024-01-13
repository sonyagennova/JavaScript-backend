const router = require('express').Router();
const { isAuthorized } = require('../middleware/authMiddleware')
const animalService = require('../services/animalService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const animal = await animalService.getAll();
    res.render('animal/catalog', {animal});
});

router.get('/search', async (req, res) => {
    const {location} = req.query;
    const animal = await animalService.search(location);

    res.render('animal/search', {animal, location});
});

router.get('/:animalId/details', async (req, res) => {
    const animal = await animalService.getOne(req.params.animalId);


    // Проверка дали потребителят е owner и дали изобщо е логнат.
    const isOwner = animal.owner.toString() === req.user?._id; // Тук трябва toString, защото сравняваме обект със стринг
    // const isOwner = animal.owner == req.user?._id;   // Втори вариант само с ==, което не сравнява owner като обект, а само като стринг.
    const isDonation = animal.donations?.some(id => id == req.user?._id); // Проверявам дали юзъра е сред Donation-ите.


    res.render('animal/details', { animal, isOwner, isDonation });
});

router.get('/:animalId/donate', isAuthorized, async (req, res) => {
    try {
        await animalService.donate(req.user._id, req.params.animalId);
        
    } catch(error) {
        return res.status(400).render('animal/details', {error: getErrorMessage(error)});
    }
    
    res.redirect(`/animal/${req.params.animalId}/details`);
});


router.get('/:animalId/edit', isAuthorized, async (req, res) => {
    const animal = await animalService.getOne(req.params.animalId);


    res.render('animal/edit', {animal});
});

router.post('/:animalId/edit', isAuthorized, async (req, res) => {
    const animalData = req.body;
    await animalService.edit(req.params.animalId, animalData);

    // Check if owner
    res.redirect(`/animal/${req.params.animalId}/details`);
});

router.get('/:animalId/delete', isAuthorized, async (req, res) => {

    // TODO: Check if owner

    await animalService.delete(req.params.animalId);
    res.redirect('/animal/catalog');
});



router.get('/create', isAuthorized, (req, res) => {
    res.render('animal/create');
});

router.post('/create', isAuthorized, async (req, res) => {
    const animalData = req.body;
    try {
        await animalService.create(req.user._id, animalData);

    } catch(error) {
        return res.status(400).render('animal/create', {error: getErrorMessage(error)});
    }

    res.redirect('/animal/catalog');
});

module.exports = router;