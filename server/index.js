const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const sequelize = require("./db");
require("pg");
const router = require("./routers/mainRouter");
const cookieParser = require("cookie-parser");
const cloudinary = require('cloudinary').v2;

var whitelistDomain = [
    "http://localhost:5173",
    "https://sweet-kheer-626c63.netlify.app",
];

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_PASSWORD,
});

class Server {
    app = express();
    async start() {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ alter: true });
            const currentServer = this.app.listen(PORT, () => {
                console.log(`server start on port ${PORT}`);
            });
            this.addMiddleware();
        } catch (e) {
            console.log(e);
        }
    }

    addMiddleware() {
        this.app.use(
            cors({
                credentials: true,
                origin: function (origin, callback) {
                    const originIsWhitelisted = whitelistDomain.indexOf(origin) !== -1;
                    callback(null, originIsWhitelisted);
                },
            })
        );
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use("/", router);
    }
}

new Server().start();
