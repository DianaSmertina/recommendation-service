import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IReviewsResponse } from "../types/types";
import ReviewsApi from "../api/ReviewsApi";
import Slider from "../components/slider/Slider";
import TagsCloud from "../components/tagsCloud/TagsCloud";

function MainPage() {
    const [bestReviews, setBestReviews] = useState<Array<IReviewsResponse>>([]);
    const [lastReviews, setLastReviews] = useState<Array<IReviewsResponse>>([]);

    useEffect(() => {
        (async function getAsyncData() {
            const axiosBestReviews = await ReviewsApi.getBest();
            setBestReviews(axiosBestReviews.data);
            const axiosLastReviews = await ReviewsApi.getLast();
            setLastReviews(axiosLastReviews.data);
        })()
    }, []);


    return (
        <Container className="h-100 py-3">
            <main>
                <h2>Best reviews: </h2>
                <Slider reviews={bestReviews} type={"best"}/>
                <h2>Last reviews: </h2>
                <Slider reviews={lastReviews} type={"last"}/>
                <TagsCloud />
            </main>
        </Container>
    );
}

export default MainPage;