const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const reviewRouter = require("./reviewRouter");
const tagRouter = require("./tagRouter");
const likeRouter = require("./likeRouter");

router.use("/user", userRouter);
router.use("/review", reviewRouter);
router.use("/tag", tagRouter);
router.use("/like", likeRouter);

module.exports = router;