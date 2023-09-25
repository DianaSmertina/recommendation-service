import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IReviewsResponseExtended, IReviewsResponse } from "../types/types";

export const reviewsApi = createApi({
    reducerPath: "reviewsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://recommendation-service-server.onrender.com/" }),
    endpoints: (builder) => ({
        getByTag: builder.query<Array<IReviewsResponse>, number>({
            query: (params) => {
                return {
                    url: `review/tag/${params}`,
                };
            },
        }),
        getById: builder.query<IReviewsResponseExtended, string | undefined>({
            query: (params) => {
                return {
                    url: `review/${params}`,
                };
            },
        }),
        countUserLikes: builder.query<number, number>({
            query: (userId) => {
                return {
                    url: `like/count/user?userId=${userId}`,
                }
            }
        })
    }),
});

export const { useGetByTagQuery, useGetByIdQuery, useCountUserLikesQuery } = reviewsApi;
