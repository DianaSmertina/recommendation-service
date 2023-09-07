const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: "30d"});
        return {accessToken, refreshToken};
    }

    async saveRefreshToken(userId, refreshToken) {
        const token = await Token.findOne({ where: { userId } });
        if (token) {
            await Token.update({ refreshToken }, {
                where: { userId }
            });
        } else {
            await Token.create({userId, refreshToken});
        }
        return refreshToken;
    }
}

module.exports = new TokenService();
