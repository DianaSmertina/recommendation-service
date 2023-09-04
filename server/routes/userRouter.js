const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/sign-in", userController.signIn);
router.post("/sign-up", userController.signUp);
router.get("/auth", userController.isAuth);

module.exports = router;