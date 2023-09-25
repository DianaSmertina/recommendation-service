const Router = require("express");
const router = new Router();
const commentController = require("../controllers/commentController");
const authTokenMiddleware = require("../middleware/authTokenMiddleware");

router.get("", commentController.getComments);
router.post("", authTokenMiddleware, commentController.addComment);

module.exports = router;