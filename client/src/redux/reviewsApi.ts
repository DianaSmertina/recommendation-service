import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IReviewsResponse } from "../types/types";

export const reviewsApi = createApi({
    reducerPath: "reviewsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
    endpoints: (builder) => ({
        getByTag: builder.query<Array<IReviewsResponse>, string>({
            query: (params) => {
                return {
                    url: `review/tag/${params}`,
                };
            },
        }),
    }),
});

export const { useGetByTagQuery } = reviewsApi;
