import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { IReviewsResponse } from "../types/types";
import ReviewsApi from "../api/ReviewsApi";
import Slider from "../components/slider/Slider";
import displayError from "../components/errorsHelpers/requestError";
import Tags from "../components/tags/Tags";

function MainPage() {
    const [bestReviews, setBestReviews] = useState<Array<IReviewsResponse>>([]);
    const [lastReviews, setLastReviews] = useState<Array<IReviewsResponse>>([]);
    const [isBestLoading, setIsBestLoading] = useState(true);
    const [isLastLoading, setIsLastLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        (async function getAsyncData() {
            try {
                const axiosBestReviews = await ReviewsApi.getBest();
                setBestReviews(axiosBestReviews.data);
                setIsBestLoading(false);
                const axiosLastReviews = await ReviewsApi.getLast();
                setLastReviews(axiosLastReviews.data);
                setIsLastLoading(false);
            } catch (e) {
                setIsBestLoading(false);
                setIsLastLoading(false);
                displayError(e as Error);
            }
        })();
    }, []);

    return (
        <Container className="py-3 content">
            <main>
                <h4 className="mb-3">{t("best-reviews")}</h4>
                <Slider
                    reviews={bestReviews}
                    isLoading={isBestLoading}
                />
                <h4 className="my-3">{t("last-reviews")}</h4>
                <Slider
                    reviews={lastReviews}
                    isLoading={isLastLoading}
                />
                <Tags />
            </main>
        </Container>
    );
}

export default MainPage;
