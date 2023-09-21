const { Like, Review } = require("../models/models");

class LikeService {
    async getUserLikesCount(userId) {
        try {
            const likes = await Like.count({
                include: [{ model: Review, where: { userId } }],
            })
            return likes;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new LikeService();
