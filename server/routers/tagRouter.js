const Router = require("express");
const router = new Router();
const tagController = require("../controllers/tagController");

router.get("/all", tagController.getAll);
router.get("/cloud", tagController.getTagsForCloud);

module.exports = router;
