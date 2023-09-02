const express = require("express");
const PORT = process.env.PORT || 5000;

class Server {
    app = express();
    start() {
        try {
            const currentServer = this.app.listen(PORT, () => {
                console.log(`server start on port ${PORT}`);
            });
        } catch (e) {
            console.log(e);
        }
    }
}

new Server().start();