import { AxiosResponse } from "axios";
import api from ".";
import { IRating } from "../types/types";

class RatingApi {
    static async checkRating(userId: number, reviewId: string): Promise<AxiosResponse<IRating | undefined>> {
        return api.get(`rating/check?userId=${userId}&reviewId=${reviewId}`);
    }

    static async addRating(data: {userId: number; reviewId: string; rating: number}): Promise<AxiosResponse<IRating>> {
        return api.post("rating/add", data);
    }

    static async getAverageRating(reviewId: string): Promise<AxiosResponse<number>> {
        return api.get(`rating/average?reviewId=${reviewId}`);
    }
}

export default RatingApi;