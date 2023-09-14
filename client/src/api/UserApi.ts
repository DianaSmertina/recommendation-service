import { AxiosResponse } from "axios";
import { ITokenResponse } from "../types/types";
import api from ".";

class UserApi {
    static async signIn(data: {
        email: string;
        password: string;
    }): Promise<AxiosResponse<ITokenResponse>> {
        return api.post("/user/sign-in/", data);
    }

    static async signUp(data: {
        email: string;
        password: string;
        name: string;
    }): Promise<AxiosResponse<ITokenResponse>> {
        return api.post("/user/sign-up/", data);
    }

    static async logout(): Promise<void> {
        return api.post("/user/logout");
    }
}

export default UserApi;
