const router = require("express").Router();
const nytController = require("../../controllers/nytControllers.js");
const axios = require("axios");

router.get("/articles", (req, res) => {
  axios
    .get("http://www.recipepuppy.com/api/d580d6be589b4e8499f01d5f0a3ba19d", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

// Matches with "/api/books"
router.route("/")
  .get(nytController.findAll)
  .post(nytController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(nytController.findById)
  .put(nytController.update)
  .delete(nytController.remove);

module.exports = router;
