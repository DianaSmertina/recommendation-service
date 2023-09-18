const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");
const multer = require("multer");
const path = require("path");
const loader = multer({ dest: path.join(__dirname, "tmp") });
const authTokenMiddleware = require("../middleware/authTokenMiddleware");

router.post("/new", loader.single("image"), reviewController.addNew);
router.get("/all", reviewController.getAll);
router.get("/last", reviewController.getLast);
router.get("/best", reviewController.getBest);
router.get("/user/:id", authTokenMiddleware, reviewController.getAllByUserId);
router.get("/groups", reviewController.getGroups);
router.get("/tag/:tag", reviewController.getByTag);

module.exports = router;
