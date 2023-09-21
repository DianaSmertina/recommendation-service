const Router = require("express");
const router = new Router();
const likeController = require("../controllers/likeController");
const authTokenMiddleware = require("../middleware/authTokenMiddleware");

router.get("/check", likeController.checkLike);
router.post("/add", authTokenMiddleware, likeController.addLike);
router.get("/count/review", likeController.countReviewLikes);
router.get("/count/user", likeController.countUserLikes);

module.exports = router;