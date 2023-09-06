const jwt = require("jsonwebtoken");

class TokenService {
    generateToken(payload) {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});
        return token;
    }
}

module.exports = new TokenService();