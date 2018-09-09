const router = require("express").Router();
const nytRoutes = require("./nyt");

router.use("nyt", nytRoutes);

module.exports = router;

