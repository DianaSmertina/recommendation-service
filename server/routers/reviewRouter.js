const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");

router.post("/new", reviewController.addNew);
router.get("/all", reviewController.getAll);
router.get("/last", reviewController.getLast);
router.get("/best", reviewController.getBest);
router.get("/user/:id", reviewController.getAllByUserId);
router.get("/groups", reviewController.getGroups);

module.exports = router;