import { AxiosResponse } from "axios";
import api from ".";
import { IComment } from "../types/types";

class CommentApi {
    static async getComments(reviewId: string): Promise<AxiosResponse<Array<IComment>>> {
        return api.get(`comment?reviewId=${reviewId}`);
    }

    static async addComment(data: {userId: number; reviewId: string; text: string}): Promise<AxiosResponse<IComment>> {
        return api.post("comment", data);
    }
}

export default CommentApi;