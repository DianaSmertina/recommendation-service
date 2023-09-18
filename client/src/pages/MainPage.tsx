import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IReviewsResponse } from "../types/types";
import ReviewsApi from "../api/ReviewsApi";
import Slider from "../components/slider/Slider";
import TagsCloud from "../components/tagsCloud/TagsCloud";
import displayError from "../components/errorsHelpers/requestError";

function MainPage() {
    const [bestReviews, setBestReviews] = useState<Array<IReviewsResponse>>([]);
    const [lastReviews, setLastReviews] = useState<Array<IReviewsResponse>>([]);
    const [isBestLoading, setIsBestLoading] = useState(true);
    const [isLastLoading, setIsLastLoading] = useState(true);

    useEffect(() => {
        (async function getAsyncData() {
            try {
                const axiosBestReviews = await ReviewsApi.getBest();
                setBestReviews(axiosBestReviews.data);
                setIsBestLoading(false);
                const axiosLastReviews = await ReviewsApi.getLast();
                setLastReviews(axiosLastReviews.data);
                setIsLastLoading(false);
            } catch(e) {
                setIsBestLoading(false);
                setIsLastLoading(false);
                displayError(e as Error);
            }
        })()
    }, []);


    return (
        <Container className="py-3 content">
            <main>
                <h2>Best reviews: </h2>
                <Slider reviews={bestReviews} type={"best"} isLoading={isBestLoading} />
                <h2>Last reviews: </h2>
                <Slider reviews={lastReviews} type={"last"} isLoading={isLastLoading} />
                <TagsCloud />
            </main>
        </Container>
    );
}

export default MainPage;