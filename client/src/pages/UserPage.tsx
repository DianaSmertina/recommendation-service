import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import { IReviewsResponse } from "../types/types";
import ReviewsApi from "../api/ReviewsApi";
import NewReview from "../components/newReview/NewReview";

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
        <Container className="h-100 py-3">
            <NewReview />
            <div>{userReviews.map((el) => Object.entries(el).map((data) => <div key={data[0]}>{data[1]}</div> ))}</div>
        </Container>
    )
}

export default UserPage;