const jwt = require("jsonwebtoken");
const tokenService = require("../services/tokenService");

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "User unauthorized" });
        }
        const userData = tokenService.checkAccessToken(token);
        req.user = userData;
        next();
    } catch (e) {
        return res.status(401).json({ message: "User unauthorized" });
    }
};
