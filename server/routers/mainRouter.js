const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const reviewRouter = require("./reviewRouter");
const tagRouter = require("./tagRouter");

router.use("/user", userRouter);
router.use("/review", reviewRouter);
router.use("/tag", tagRouter);

module.exports = router;