import { useParams } from "react-router-dom";
import { Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import RatingApi from "../../../api/RatingApi";
import displayError from "../../errorsHelpers/requestError";
import starImage from "../../../assets/star.png";

function Rating() {
    const { reviewId } = useParams();
    const [averageRating, setAverageRating] = useState<string>("0");
    const [ratingClasses, setRatingClasses] = useState(
        new Array(5).fill("inactive_image")
    );
    const [isRating, setIsRating] = useState(false);
    const userId = useSelector((state: RootState) => state.user.id);

    useEffect(() => {
        (async function () {
            try {
                if (userId && reviewId) {
                    const rating = await RatingApi.checkRating(
                        userId,
                        reviewId
                    );
                    if (rating.data) {
                        setIsRating(true);
                        setRatingClasses((prev) =>
                        prev.map((_, i) => {
                            if (rating.data && i + 1 <= rating.data.rating) {
                                return "active_image";
                            } else {
                                return "inactive_image";
                            }
                        })
                    );
                }
                    
                }
                if (reviewId) {
                    const ratingResponse = await RatingApi.getAverageRating(
                        reviewId
                    );
                    if (ratingResponse.data) {
                        setAverageRating(ratingResponse.data.toFixed(2));
                    }
                }
            } catch (e) {
                displayError(e as Error);
            }
        })();
    }, [userId, reviewId, isRating]);

    const handleMouseLeave = () => {
        if (!isRating) {
            setRatingClasses(new Array(5).fill("inactive_image"));
        }
    };

    const handleStarHover = (starNum: number) => {
        if (!isRating) {
            setRatingClasses((prev) => (
                prev.map((_, i) => {
                    if (i <= starNum) {
                        return "active_image";
                    } else {
                        return "inactive_image";
                    }
                })
            ))
        }
    }

    const handleClick = async (starNum: number) => {
        try {
            if (!isRating && userId && reviewId) {
                setIsRating(true);
                await RatingApi.addRating({ userId, reviewId, rating: starNum + 1 });
            } else if (!userId) {
                throw new Error("Sign in to rate review");
            } else if (isRating) {
                throw new Error("You already rate this review");
            }
        } catch(e) {
            displayError(e as Error);
        }
    }

    return (
        <Col className="d-flex justify-content-center align-items-center" onMouseLeave={handleMouseLeave}>
            {ratingClasses.map((el, i) => (
                <Image
                    key={i}
                    src={starImage}
                    width={25}
                    height={25}
                    className={`me-2 ${el}`}
                    onMouseEnter={() => handleStarHover(i)}
                    onClick={() => handleClick(i)}
                />
            ))}
            {averageRating}
        </Col>
    );
}

export default Rating;
