const { Review } = require("../models/models");
const cloudinary = require("cloudinary").v2;

class ReviewController {
    async addNew(req, res) {
        try {
            const {
                reviewName,
                productName,
                text,
                authorsAssessment,
                group,
                userId,
            } = await req.body;
            const image = await cloudinary.uploader.upload(req.file.path);
            const newReview = await Review.create({
                reviewName,
                productName,
                text,
                authorsAssessment,
                group,
                userId,
                image,
            });
            return res.status(200).json(newReview);
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(req, res) {
        try {
            const reviews = await Review.findAll();
            return res.status(200).json(reviews);
        } catch (e) {
            console.log(e);
        }
    }

    async getLast(req, res) {
        try {
            const reviews = await Review.findAll({
                order: [["createdAt", "DESC"]],
                limit: 20,
            });
            return res.status(200).json(reviews);
        } catch (e) {
            console.log(e);
        }
    }

    async getBest(req, res) {
        try {
            const reviews = await Review.findAll({
                order: [["authorsAssessment", "DESC"]],
                limit: 20,
            });
            return res.status(200).json(reviews);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllByUserId(req, res) {
        try {
            const userId = req.params.id;
            const reviews = await Review.findAll({where: { userId }});
            return res.status(200).json(reviews);
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new ReviewController();
