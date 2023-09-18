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
    };
}

export interface IReviewsResponse {
    id: number;
    reviewName: string;
    productName: string;
    text: string;
    authorsAssessment: number;
    group: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    image: string | null;
}

export interface IReviewsRequest {
    reviewName: string;
    productName: string;
    text: string;
    authorsAssessment: number;
    group: number;
    userId: number;
    image: File | FileList;
    tags: Array<string>;
}

export interface ITag {
    id_tag: number;
    tag: string;
}

export interface ITagForCloud {
    value: string;
    count: number;
}
