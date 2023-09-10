const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    isAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
});

const Token = sequelize.define("token", {
    refreshToken: {type: DataTypes.STRING},
})

const Review = sequelize.define("review", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    reviewName: {type: DataTypes.STRING, allowNull: false},
    productName: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.TEXT, allowNull: false},
    authorsAssessment: {type: DataTypes.INTEGER},
    group: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING},
});

User.hasOne(Token);
Token.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(User);

module.exports = {User, Token, Review};