const { Rating, Review } = require("../models/models");
const { Op } = require("sequelize");

class RatingController {
    async addRating(req, res) {
        try {
            const { userId, reviewId, rating } = req.body;
            const createdRating = await Rating.create({
                rating,
                userId,
                reviewId,
            });
            return res.status(200).json(rating);
        } catch (e) {
            console.log(e);
        }
    }

    async checkRating(req, res) {
        try {
            const { userId, reviewId } = req.query;
            const currentRating = await Rating.findOne({
                where: {
                    [Op.and]: [{ userId, reviewId }],
                },
            });
            return res.status(200).json(currentRating);
        } catch (e) {
            console.log(e);
        }
    }

    async averageReviewRating(req, res) {
        try {
            const { reviewId } = req.query;
            const sum = await Rating.sum("rating", {
                where: { reviewId },
            });
            const count = await Rating.count({
                where: { reviewId },
            });
            const average = sum / count;
            return res.status(200).json(average);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new RatingController();
