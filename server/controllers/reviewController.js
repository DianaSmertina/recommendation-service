const { Review, ReviewGroup, Tag } = require("../models/models");
const cloudinary = require("cloudinary").v2;
const reviewService = require("../services/reviewService");

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
                tags,
            } = await req.body;
            const image = (await cloudinary.uploader.upload(req.file.path)).url;
            const newReview = await Review.create({
                reviewName,
                productName,
                text,
                authorsAssessment,
                group,
                userId,
                image,
            });
            console.log(typeof tags);
            const tagsArray = tags.split(",");
            const allReviewTags = [];
            for (const tag of tagsArray) {
                let currentTag = await Tag.findOne({ where: { tag } });
                if (!currentTag) {
                    currentTag = await Tag.create({ tag });
                } 
                allReviewTags.push(currentTag);
            }
            await newReview.addTags(allReviewTags);
            return res.status(200).json(newReview);
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(req, res) {
        try {
            const reviews = await Review.findAll({
                include: [{ model: Tag, through: "reviewtag" }],
            });
            return res.status(200).json(reviews);
        } catch (e) {
            console.log(e);
        }
    }

    async getLast(req, res) {
        try {
            const reviews = await Review.findAll({
                order: [["createdAt", "DESC"]],
                include: [{ model: Tag, through: 'reviewtag' }],
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
                include: [{ model: Tag, through: 'reviewtag' }],
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
            const reviews = await Review.findAll({ 
                where: { userId },
                include: [{ model: Tag, through: 'reviewtag' }],
            });
            return res.status(200).json(reviews);
        } catch (e) {
            console.log(e);
        }
    }

    async getGroups(req, res) {
        try {
            await reviewService.createDefaultGroups();
            const groups = await ReviewGroup.findAll();
            return res.status(200).json(groups);
        } catch (e) {
            console.log(e);
        }
    }

    async getTags(req, res) {
        try {
            const tags = await Tag.findAll();
            return res.status(200).json(tags);
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new ReviewController();
