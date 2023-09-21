const Router = require("express");
const router = new Router();
const ratingController = require("../controllers/ratingController");
const authTokenMiddleware = require("../middleware/authTokenMiddleware");

router.get("/check", ratingController.checkRating);
router.post("/add", authTokenMiddleware, ratingController.addRating);
router.get("/average", ratingController.averageReviewRating);

module.exports = router;