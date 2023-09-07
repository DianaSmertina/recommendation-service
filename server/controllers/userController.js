const { User } = require("../models/models");
const bcrypt = require("bcryptjs");
const tokenService = require("../services/tokenService");

class UserController {
    async signIn(req, res) {
        try {
            const { email, password } = await req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) return res.status(400).json({message: "User with this email doesn't exist"});
            const isRightPassword = await bcrypt.compare(password, user.password);
            if (!isRightPassword) return res.status(400).json({message: "Wrong password"});
            const token = tokenService.generateTokens({
                id: user.id,
                email,
                isAdmin: user.isAdmin,
            });
            await tokenService.saveRefreshToken(user.id, token.refreshToken);
            const maxAge = 30 * 24 * 60 * 60 * 1000;
            res.cookie("refreshToken", token.refreshToken, {
                maxAge,
                httpOnly: true,
            });
            return res.status(200).json({ token });
        } catch(e) {
            console.log(e);
        }
    }

    async signUp(req, res, next) {
        try {
            const { email, password, name, isAdmin = false } = await req.body;
            const isExist = await User.findOne({ where: { email } });
            if (isExist) return res.status(400).json({message: "This email is already taken"});
            const passwordHash = bcrypt.hashSync(password, 7);
            const newUser = await User.create({
                email,
                name,
                password: passwordHash,
                isAdmin,
            });
            const token = tokenService.generateTokens({
                id: newUser.id,
                email,
                isAdmin,
            });
            await tokenService.saveRefreshToken(newUser.id, token.refreshToken);
            const maxAge = 30 * 24 * 60 * 60 * 1000;
            res.cookie("refreshToken", token.refreshToken, {
                maxAge,
                httpOnly: true,
            });
            return res.status(200).json({ token });
        } catch(e) {
            console.log(e);
        }
    }

    async isAuth(req, res) {
        const token = tokenService.generateTokens({
            id: req.id,
            email: req.email,
            isAdmin: req.isAdmin,
        });
        return res.status(200).json({ token });
    }
}

module.exports = new UserController();
