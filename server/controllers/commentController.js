const { Comment, User } = require("../models/models");

class CommentController {
    async addComment(req, res) {
        try {
            const {userId, reviewId, text} = req.body;
            const comment = await Comment.create({
                userId,
                reviewId,
                text
            }, 
            {
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ["password"],
                        },
                    },
                ],
            }
            );
            return res.status(200).json(comment);
        } catch(e) {
            console.log(e);
        }
    }

    async getComments(req, res) {
        try {
            const {reviewId} = req.query;
            const comments = await Comment.findAll({
                where: {reviewId},
                order: [["createdAt", "ASC"]],
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ["password"],
                        },
                    },
                ],
            })
            return res.status(200).json(comments);
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new CommentController();