const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authTokenMiddleware = require("../middleware/authTokenMiddleware");

router.post("/sign-in", userController.signIn);
router.post("/sign-up", userController.signUp);
router.get("/refresh", userController.refresh);
router.post("/logout", userController.logOut);
// router.get("/auth", authTokenMiddleware, userController.isAuth);

module.exports = router;
