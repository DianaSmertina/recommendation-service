const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const sequelize = require("./db");
const models = require("./models/models");
require("pg");
const router = require("./routers/mainRouter");
const errorHandler = require("./error/errorHandler");

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
        this.app.use(cors());
        // this.app.use(
        //     cors({
        //         origin: [
        //             "https://sweet-kheer-626c63.netlify.app",
        //             "http://localhost:5173/",
        //         ],
        //     })
        // );
        this.app.use(express.json());
        this.app.use("/", router);
        this.app.use(errorHandler);
    }
}

new Server().start();