const router = require("express").Router();
const nytController = require("../../controllers/nytControllers.js");

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
