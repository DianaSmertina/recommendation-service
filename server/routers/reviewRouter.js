const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");

router.post("/new", reviewController.addNew);
router.get("/all", reviewController.getAll);
router.get("/last", reviewController.getLast);
router.get("/best", reviewController.getBest);

module.exports = router;