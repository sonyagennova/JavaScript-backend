const router = require('express').Router();
const authService = require('../services/authService');
const {isAuthorized} = require('../middleware/authMiddleware');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        // Add token to cookie
        res.cookie('auth', token);
        res.redirect('/');
    } catch(error) {
        return res.status(404).render('auth/login', {error: getErrorMessage(error)});
    }

});

router.get('/register', (req, res) => {
    res. render('auth/register');
});

router.post('/register', async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    try {
        const token = await authService.register( email, password, repeatPassword );
        res.cookie('auth', token);
        res.redirect('/');
    } catch(error) {
        res.status(400).render('auth/register', {error: getErrorMessage(error)});
    }

});

router.get('/logout', isAuthorized, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
}) 



module.exports = router;