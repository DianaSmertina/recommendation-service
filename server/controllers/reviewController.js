const { Review, ReviewGroup, Tag, User } = require("../models/models");
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
            } = req.body;
            let imgUrl = null;
            if (req.file) {
                const imageUrl = (await cloudinary.uploader.upload(req.file.path)).url;
                const secureImageUrl = imageUrl.replace("http://", "https://");
                imgUrl = secureImageUrl;
            }
            const newReview = await Review.create({
                reviewName,
                productName,
                text,
                authorsAssessment,
                group,
                userId,
                image: imgUrl,
            });
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
                include: [{ model: Tag, through: "reviewtag" }],
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
                include: [{ model: Tag, through: "reviewtag" }],
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
                include: [{ model: Tag, through: "reviewtag" }],
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

    async getByTag(req, res) {
        try {
            const id = req.params.tag;
            const reviews = await Review.findAll({
                include: [{ model: Tag, through: "reviewtag", where: { id } }],
            });
            return res.status(200).json(reviews);
        } catch (e) {
            console.log(e);
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const review = await Review.findOne({
                where: { id },
                include: [
                    Tag,
                    {
                        model: User,
                        attributes: {
                            exclude: ["password"],
                        },
                    },
                ],
            });
            return res.status(200).json(review);
        } catch (e) {
            console.log(e);
        }
    }

    async updateById(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const updatedReview = await Review.update(updateData, {
                where: { id },
                returning: true,
            });
            return res.status(200).json(updatedReview);
        } catch (e) {
            console.log(e);
        }
    }

    async deleteById(req, res) {
        try {
            const id = req.params.id;
            const deletedReviewCount = await Review.destroy({
                where: { id },
            });
            return res.status(200).json(deletedReviewCount);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new ReviewController();
