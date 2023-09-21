import { Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import LikeApi from "../../../api/LikeApi";
import displayError from "../../errorsHelpers/requestError";
import likeImage from "../../../assets/favorite.png";

function Likes() {
    const [isLike, setIsLike] = useState(false);
    const [reviewLikesCount, setReviewLikesCount] = useState<number>();
    const { reviewId } = useParams();
    const userId = useSelector((state: RootState) => state.user.id);

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
            } else if (!userId) {
                throw new Error("Sign in to like review");
            } else if (isLike) {
                throw new Error("You already liked this review");
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
