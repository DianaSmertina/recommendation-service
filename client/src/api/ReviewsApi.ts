import { AxiosResponse } from "axios";
import { IGroup, IReviewsResponse, IOptionalReviewsRequest, ITag, ITagForCloud } from "../types/types";
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
        data: FormData
    ): Promise<AxiosResponse<IReviewsResponse>> {
        return api.post("/review/new", data);
    }

    static async updateReview(data: IOptionalReviewsRequest, id: number): Promise<AxiosResponse<IReviewsResponse>> {
        return api.put(`/review/${id}`, data);
    }

    static async deleteReview(id: number): Promise<AxiosResponse<number>> {
        return api.delete(`/review/${id}`);
    }

    static async getGroups(): Promise<
        AxiosResponse<Array<IGroup>>
    > {
        return api.get("/review/groups");
    }

    static async getTags(): Promise<
        AxiosResponse<Array<ITag>>
    > {
        return api.get("tag/all");
    }

    static async getTagsForCloud(): Promise<
        AxiosResponse<Array<ITagForCloud>>
    > {
        return api.get("tag/cloud");
    }
}

export default ReviewsApi;
