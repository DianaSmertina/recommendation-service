const { User } = require("../models/models");
const CustomError = require("../error/customError");
const bcrypt = require("bcryptjs");

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
        return res.status(200).json("Authorization successfully completed");    
    }

    async signUp(req, res, next) {
        const { email, password, name, isAdmin = false } = await req.body;
        const isExist = await User.findOne({ where: { email } });
        console.log(isExist);
        if (isExist) {
            return next(CustomError.badRequest("This email is already taken"));
        }
        const passwordHash = bcrypt.hashSync(password, 7);
        const newUser = await User.create({email, name, password: passwordHash, isAdmin});
        return res.status(200).json("Registration successfully completed");
    }

    async isAuth(req, res) {
        return res.json("Hi!");
    }
}

module.exports = new UserController();
