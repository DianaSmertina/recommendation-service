const dotenv = require('dotenv');
dotenv.config();
const {Sequelize} = require("sequelize");
const {DB_NAME, DB_USER, DB_PASSWORD} = process.env

module.exports = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        dialect: "postgres",
        host: "dpg-cjqsjclhe99c738mcov0-a.frankfurt-postgres.render.com",
        port: 5432,
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
            }
        }
    }
);