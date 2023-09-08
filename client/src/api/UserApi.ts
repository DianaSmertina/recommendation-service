import { AxiosResponse } from "axios";
import { ITokenResponse } from "../types/types";
import api from ".";

class UserApi {
    static async signIn(data: { email: string; password: string }): Promise<AxiosResponse<ITokenResponse>> {
        return api.post<ITokenResponse>("/user/sign-in/", data);
    }

    static async signUp(data: {email: string; password: string, name: string}): Promise<AxiosResponse<ITokenResponse>> {
        return api.post<ITokenResponse>("/user/sign-up/", data);
    }
}

export default UserApi;
