import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IReviewsResponse } from "../types/types";
import ReviewsApi from "../api/ReviewsApi";

function UserPage() {
    const { userId } = useParams();
    const [userReviews, setUserReviews ] = useState<Array<IReviewsResponse>>([]);
    
    useEffect(() => {
        (async function getUserReviews() {
            const axiosReviews = await ReviewsApi.getAllByUserId(Number(userId));
            setUserReviews(axiosReviews.data);
        })()
    }, [userId])

    return (
        <div>{userReviews.map((el) => Object.entries(el).map((data) => <div key={data[0]}>{data[1]}</div> ))}</div>
    )
}

export default UserPage;