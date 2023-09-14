import { AxiosResponse } from "axios";
import { IReviewsRequest, IReviewsResponse } from "../types/types";
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

    static async getAllByUserId(
        id: number
    ): Promise<AxiosResponse<Array<IReviewsResponse>>> {
        return api.get(`/review/user/${id}`);
    }

    static async createReview(
        data: IReviewsRequest
    ): Promise<AxiosResponse<IReviewsResponse>> {
        return api.post("/review/new", data);
    }

    static async getGroups(): Promise<
        AxiosResponse<Array<{ id: number; name: string }>>
    > {
        return api.get("review/groups");
    }
}

export default ReviewsApi;
