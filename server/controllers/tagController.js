const { Review, Tag } = require("../models/models");
const { Sequelize } = require('sequelize');

class TagController {
    async getAll(req, res) {
        try {
            const tags = await Tag.findAll();
            return res.status(200).json(tags);
        } catch (e) {
            console.log(e);
        }
    }

    async getTagsForCloud(req, res) {
        try {
            const tagsWithCount = await Tag.findAll({
                attributes: [
                    "tag",
                    [
                        Sequelize.fn("COUNT", Sequelize.col("reviews.id")),
                        "count",
                    ],
                ],
                include: [
                    {
                        model: Review,
                        as: "reviews",
                        attributes: [],
                        through: { attributes: [] },
                    },
                ],
                group: ["tag.tag_id"]
            });
            const formattedTags = tagsWithCount.map((tag) => ({
                value: tag.tag,
                count: tag.get("count"),
            }));
            return res.status(200).json(formattedTags);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new TagController();
