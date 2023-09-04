const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const sequelize = require("./db");
const models = require("./models/models");
require("pg");

class Server {
    app = express();
    async start() {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            const currentServer = this.app.listen(PORT, () => {
                console.log(`server start on port ${PORT}`);
            });
        } catch (e) {
            console.log(e);
        }
    }

    addMiddleware() {
        this.app.use(
            cors({
                origin: ["https://sweet-kheer-626c63.netlify.app", "http://localhost:5173/"],
            })
        );
        this.app.use(express.json());
    }
}

new Server().start();