export interface IUser {
    id: number;
    email: string;
    isAdmin: boolean;
    name?: string;
    password?: string;
}

export interface ITokenResponse {
    accessToken: string;
    refreshToken: string;
}
