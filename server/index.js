const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const sequelize = require("./db");
require("pg");
const router = require("./routers/mainRouter");
const cookieParser = require("cookie-parser");

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
                origin: "http://localhost:5173",
            })
        );
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use("/", router);
    }
}

new Server().start();
