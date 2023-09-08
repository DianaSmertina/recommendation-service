export interface IUser {
    id: number;
    email: string;
    isAdmin: boolean;
    name?: string;
    password?: string;
}

export interface ITokenResponse {
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
    userData: {
        id: number;
        email: string;
        isAdmin: boolean;
    }
}
