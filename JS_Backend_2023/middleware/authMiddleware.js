// Всички заявки ще минават през този middlewear и той ще регулира логнати и нелогнати поребители и ще казва кой какво ще може да прави в приложението.

const jwt = require('../lib/jsonwebtoken')
const { SECRET } = require('../constants');

exports.authentication = async (req, res, next) => {
    // Да успановим логнат ли е потребителят.
    const token = req.cookies['auth'];
    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            // Закрепяме инфото за рекуеста, за да може да е достъпно за всички последващи екшъни нататък по веригата, които директно ще могат да виждат кой е юзърът, който прави рекуеста.
            req.user = decodedToken;
            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;
        } catch(err) {
            res.clearCookie('auth');
            return res.status(401).render('home/404')
        }
    } 
    
    next();
};

exports.isAuthorized = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
}