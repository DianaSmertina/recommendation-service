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

export interface IReviewsResponse {
    id: number,
    reviewName: string,
    productName: string,
    text: string,
    authorsAssessment: number,
    group: string,
    userId: number,
    createdAt: string,
    updatedAt: string,
    image: string | null,
}
