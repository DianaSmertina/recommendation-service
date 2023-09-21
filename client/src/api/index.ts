import axios from "axios";

import { ITokenResponse } from "../types/types";

export const base = "https://recommendation-service-server.onrender.com";

const api = axios.create({
    withCredentials: true,
    baseURL: base,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<ITokenResponse>(
                    `${base}/refresh`,
                    { withCredentials: true }
                );
                localStorage.setItem("token", response.data.tokens.accessToken);
                localStorage.setItem("userId", JSON.stringify(response.data.userData));
                return api.request(originalRequest);
            } catch (e) {
                console.log('Unauthorized');
            }
        }
        throw error;
    }
);

export default api;
