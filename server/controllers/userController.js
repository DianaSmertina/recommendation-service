const { User } = require("../models/models");
const bcrypt = require("bcryptjs");
const tokenService = require("../services/tokenService");

maxTokenAge = 30 * 24 * 60 * 60 * 1000;
class UserController {
    async signIn(req, res) {
        try {
            const { email, password } = await req.body;
            const user = await User.findOne({ where: { email } });
            if (!user)
                return res
                    .status(400)
                    .json({ message: "User with this email doesn't exist" });
            const isRightPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!isRightPassword)
                return res.status(400).json({ message: "Wrong password" });
            const userData = {
                id: user.id,
                email,
                isAdmin: user.isAdmin,
            }
            const tokens = tokenService.generateTokens(userData);
            await tokenService.saveRefreshToken(user.id, tokens.refreshToken);
            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: maxTokenAge,
                httpOnly: true,
            });
            return res.status(200).json({ tokens, userData });
        } catch (e) {
            console.log(e);
        }
    }

    async signUp(req, res) {
        try {
            const { email, password, name, isAdmin = false } = await req.body;
            const isExist = await User.findOne({ where: { email } });
            if (isExist)
                return res
                    .status(400)
                    .json({ message: "This email is already taken" });
            const passwordHash = bcrypt.hashSync(password, 7);
            const newUser = await User.create({
                email,
                name,
                password: passwordHash,
                isAdmin,
            });
            const userData = {
                id: newUser.id,
                email,
                isAdmin,
            }
            const tokens = tokenService.generateTokens(userData);
            await tokenService.saveRefreshToken(newUser.id, tokens.refreshToken);
            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: maxTokenAge,
                httpOnly: true,
            });
            return res.status(200).json({ tokens, userData });
        } catch (e) {
            console.log(e);
        }
    }

    async logOut(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const token = tokenService.deleteToken(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(token);
        } catch (e) {
            console.log(e);
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(401).json({ message: "User unauthorized" });
            }
            const currentUser = tokenService.checkRefreshToken(refreshToken);
            const tokenDb = await tokenService.findRefreshToken(refreshToken);
            if (!currentUser || !tokenDb) {
                return res.status(401).json({ message: "User unauthorized" });
            }
            const user = await User.findOne({ where: { id: tokenDb.userId } });
            const userData = {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
            }
            const tokens = tokenService.generateTokens(userData);
            await tokenService.saveRefreshToken(user.id, tokens.refreshToken);
            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: maxTokenAge,
                httpOnly: true,
            });
            return res.status(200).json({ tokens, userData });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new UserController();
