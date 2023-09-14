const { ReviewGroup } = require("../models/models");

class ReviewService {
    async createDefaultGroups() {
        try {
            const groupsData = await ReviewGroup.findAll();
            if (groupsData.length === 0) {
                await ReviewGroup.bulkCreate([
                    { name: "Movie" },
                    { name: "Game" },
                    { name: "TV Show" },
                    { name: "Series" },
                    { name: "Book" },
                ]);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new ReviewService();
