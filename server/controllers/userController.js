const { User } = require("../models/models");
const CustomError = require("../error/customError");
const bcrypt = require("bcryptjs");
const tokenService = require("../services/tokenService");

class UserController {
    async signIn(req, res, next) {
        const { email, password } = await req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(CustomError.badRequest("User with this email doesn't exist"));
        } 
        const isRightPassword = await bcrypt.compare(
            password,
            user.password
        );
        if (!isRightPassword) return next(CustomError.badRequest("Wrong password"));
        const token = tokenService.generateToken({id: user.id, email, isAdmin: user.isAdmin});
        return res.status(200).json({token});    
    }

    async signUp(req, res, next) {
        const { email, password, name, isAdmin = false } = await req.body;
        const isExist = await User.findOne({ where: { email } });
        if (isExist) {
            return next(CustomError.badRequest("This email is already taken"));
        }
        const passwordHash = bcrypt.hashSync(password, 7);
        const newUser = await User.create({email, name, password: passwordHash, isAdmin});
        const token = tokenService.generateToken({id: newUser.id, email, isAdmin});
        return res.status(200).json({token});
    }

    async isAuth(req, res) {
        const token = tokenService.generateToken({id: req.id, email: req.email, isAdmin: req.isAdmin});
        return res.status(200).json({token});
    }
}

module.exports = new UserController();
