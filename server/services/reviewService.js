const { ReviewGroup } = require("../models/models");

class ReviewService {
    async createDefaultGroups() {
        try {
            const groupsData = await ReviewGroup.findAll();
            if (groupsData.length === 0) {
                await ReviewGroup.bulkCreate([
                    { name: "Movie", nameRus: "Фильм" },
                    { name: "Game", nameRus: "Игра" },
                    { name: "TV Show", nameRus: "Телевизионное шоу" },
                    { name: "Series", nameRus: "Сериал" },
                    { name: "Book", nameRus: "Книга" },
                ]);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new ReviewService();
