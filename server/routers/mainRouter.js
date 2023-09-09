const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const reviewRouter = require("./reviewRouter");

router.use("/user", userRouter);
router.use("/review", reviewRouter);

module.exports = router;