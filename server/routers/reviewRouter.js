const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");
const multer = require("multer");
const path = require("path");
const loader = multer({ dest: path.join(__dirname, "tmp") });

router.post("/new", loader.single("image"), reviewController.addNew);
router.get("/all", reviewController.getAll);
router.get("/last", reviewController.getLast);
router.get("/best", reviewController.getBest);
router.get("/user/:id", reviewController.getAllByUserId);
router.get("/groups", reviewController.getGroups);
router.get("/tags", reviewController.getTags);

module.exports = router;
