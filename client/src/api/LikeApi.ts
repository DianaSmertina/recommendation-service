import { AxiosResponse } from "axios";
import api from ".";
import { ILike } from "../types/types";

class LikeApi {
    static async checkLike(userId: number, reviewId: string): Promise<AxiosResponse<ILike | undefined>> {
        return api.get(`like/check?userId=${userId}&reviewId=${reviewId}`);
    }

    static async addLike(data: {userId: number; reviewId: string}): Promise<AxiosResponse<ILike>> {
        return api.post("like/add", data);
    }

    static async getCountForReview(reviewId: string): Promise<AxiosResponse<number>> {
        return api.get(`like/count/review?reviewId=${reviewId}`);
    }

    static async getCountForUser(userId: number): Promise<AxiosResponse<number>> {
        return api.get(`like/count/user?userId=${userId}`);
    }
}

export default LikeApi;