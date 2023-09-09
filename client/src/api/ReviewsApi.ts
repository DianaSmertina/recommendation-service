import { AxiosResponse } from "axios";
import { IReviewsResponse } from "../types/types";
import api from ".";

class ReviewsApi {
    static async getAll(): Promise<AxiosResponse<Array<IReviewsResponse>>> {
        return api.get("/review/all");
    }

    static async getBest(): Promise<AxiosResponse<Array<IReviewsResponse>>> {
        return api.get("/review/best");
    }

    static async getLast(): Promise<AxiosResponse<Array<IReviewsResponse>>> {
        return api.get("/review/last");
    }
}

export default ReviewsApi;