const { Like, Review } = require("../models/models");
const { Op } = require('sequelize');

class LikeController {
    async addLike(req, res) {
        try {
            const {userId, reviewId} = req.body;
            const like = await Like.create({
                userId,
                reviewId
            });
            return res.status(200).json(like);
        } catch(e) {
            console.log(e);
        }
    }

    async checkLike(req, res) {
        try {
            const {userId, reviewId} = req.query;
            const like = await Like.findOne({
                where: {
                    [Op.and]: [{ userId, reviewId }],
                }
            });
            return res.status(200).json(like);
        } catch(e) {
            console.log(e);
        }
    }

    async countReviewLikes(req, res) {
        try {
            const {reviewId} = req.query;
            const count = await Like.count({
                where: {reviewId},
            });
            return res.status(200).json(count);
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new LikeController();