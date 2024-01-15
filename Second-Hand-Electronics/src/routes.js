const router = require("express").Router();

const homeController = require("./controllers/homeController");
const catalogController = require("./controllers/catalogController");
const createController = require("./controllers/createController");
const detailsController = require("./controllers/detailsController");
const editController = require("./controllers/editContoller");
const loginController = require("./controllers/loginController");
const registerController = require("./controllers/registerController");

const logoutController = require("./controllers/logoutController");
const searchController = require("./controllers/searchController");

router.use(homeController);
router.use(catalogController);
router.use(createController);
router.use(detailsController);
router.use(editController);
router.use(loginController);
router.use(registerController);
router.use(logoutController);

router.use(searchController);

router.use("*", router.get("*", (req, res) => {
    res.render("404");
}))

module.exports = router;