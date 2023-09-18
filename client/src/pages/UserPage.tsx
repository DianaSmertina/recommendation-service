import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import NewReview from "../components/newReview/NewReview";
import ReviewTable from "../components/reviewTable/ReviewTable";
import { IReviewsResponse } from "../types/types";
import ReviewsApi from "../api/ReviewsApi";
import displayError from "../components/errorsHelpers/requestError";

function UserPage() {
    const { userId } = useParams();
    const [userReviews, setUserReviews] = useState<Array<IReviewsResponse>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newReview, setNewReview] = useState(false);

    useEffect(() => {
        (async function getUserReviews() {
            try {
                const axiosReviews = await ReviewsApi.getAllByUserId(
                    Number(userId)
                );
                setUserReviews(axiosReviews.data);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                displayError(e as Error);
            }
        })();
    }, [newReview, userId]);

    return (
        <Container className="py-3 content">
            <NewReview setNewReview={setNewReview} />
            <h4 className="my-3">My Reviews</h4>
            <ReviewTable userReviews={userReviews} isLoading={isLoading} />
        </Container>
    )
}

export default UserPage;