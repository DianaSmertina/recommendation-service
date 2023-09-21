const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");

class TokenService {
    generateTokens(payload) {
        try {
            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
                expiresIn: "30d",
            });
            return { accessToken, refreshToken };
        } catch (e) {
            console.log(e);
        }
    }

    async saveRefreshToken(userId, refreshToken) {
        try {
            const token = await Token.findOne({ where: { userId } });
            if (token) {
                await Token.update({ refreshToken }, { where: { userId } });
            } else {
                await Token.create({ userId, refreshToken });
            }
            return refreshToken;
        } catch (e) {
            console.log(e);
        }
    }

    checkRefreshToken(token) {
        try {
            const userData = jwt.verify(token, env.process.JWT_REFRESH);
            return userData;
        } catch (e) {
            return null;
        }
    }

    checkAccessToken(token) {
        try {
            const userData = jwt.verify(token, env.process.JWT_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findRefreshToken(refreshToken) {
        try {
            const tokenData = await Token.findOne({ where: { refreshToken } });
            return tokenData;
        } catch (e) {
            console.log(e);
        }
    }

    async deleteToken(refreshToken) {
        try {
            const tokenData = await Token.destroy({ where: { refreshToken } });
            return tokenData;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new TokenService();
