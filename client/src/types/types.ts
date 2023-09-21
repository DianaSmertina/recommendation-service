export interface IUser {
    id: number;
    email: string;
    isAdmin: boolean;
    name?: string;
    password?: string;
    avatar?: string | null;
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

export interface IReviewsResponseExtended extends IReviewsResponse {
    tags: Array<ITag>;
    user: IUser;
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
    id: number;
    tag: string;
}

export interface ITagForCloud {
    value: string;
    count: string;
    id: number;
}

export interface IGroup {
    id: number;
    name: string; 
}

export interface ILike {
    id: number;
    userId: number;
    reviewId: number;
}

export interface IRating {
    id: number;
    rating: number;
    userId: number;
    reviewId: number;
}
