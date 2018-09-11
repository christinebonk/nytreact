const router = require("express").Router();
const articleController = require("../../controllers/articleControllers.js");
const axios = require("axios");

router.get("/articles", (req, res) => {
  axios
    .get("http://www.recipepuppy.com/api/d580d6be589b4e8499f01d5f0a3ba19d", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

// Matches with "/api/books"
router.route("/")
  .get(articleController.findAll)
  .post(articleController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(articleController.findById)
  .put(articleController.update)
  .delete(articleController.remove);

module.exports = router;
