import { Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { RootState } from "../../../redux/store";
import LikeApi from "../../../api/LikeApi";
import displayError from "../../errorsHelpers/requestError";
import likeImage from "../../../assets/favorite.png";
import { useCountUserLikesQuery } from "../../../redux/reviewsApi";

function Likes({authorsId}: {authorsId: number}) {
    const [isLike, setIsLike] = useState(false);
    const [reviewLikesCount, setReviewLikesCount] = useState<number>();
    const { reviewId } = useParams();
    const userId = useSelector((state: RootState) => state.user.id);
    const { refetch } = useCountUserLikesQuery(authorsId);
    const { t } = useTranslation();

    useEffect(() => {
        (async function () {
            try {
                if (userId && reviewId) {
                    const like = await LikeApi.checkLike(userId, reviewId);
                    like.data ? setIsLike(true) : setIsLike(false);
                }
                if (reviewId) {
                    const count = await LikeApi.getCountForReview(reviewId);
                    setReviewLikesCount(count.data);
                }
            } catch (e) {
                displayError(e as Error);
            }
        })();
    }, [userId, reviewId]);

    const addLike = async () => {
        try {
            if (!isLike && userId && reviewId) {
                await LikeApi.addLike({ userId, reviewId });
                setIsLike(true);
                setReviewLikesCount((prev) => {
                    if (prev !== undefined) {
                        return ++prev;
                    } 
                });
                refetch();
            } else if (!userId) {
                throw new Error(t("sign-in-like"));
            } else if (isLike) {
                throw new Error(t("already-liked"));
            }
        } catch (e) {
            displayError(e as Error);
        }
    };

    return (
        <Col className="d-flex justify-content-center align-items-center">
            <Image
                src={likeImage}
                width={50}
                height={50}
                className={`me-2 ${
                    isLike ? "active_image" : "inactive_image"
                }`}
                onClick={addLike}
            />
            <div className={isLike ? "active_text" : "inactive_text"}>
                {reviewLikesCount}
            </div>
        </Col>
    );
}

export default Likes;
