import { Image, Spinner, Col, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { ToastContainer } from "react-toastify";

import { useGetByIdQuery } from "../../redux/reviewsApi";
import { RootState } from "../../redux/store";
import { getGroupById } from "../../utilities/utilities";
import displayError from "../errorsHelpers/requestError";
import LikeApi from "../../api/LikeApi";

import styles from "./reviewInfo.module.scss";

interface IReviewInfoProps {
    reviewId: string | undefined;
}

function ReviewInfo({ reviewId }: IReviewInfoProps) {
    const [isLike, setIsLike] = useState(false);
    const [reviewLikesCount, setReviewLikesCount] = useState<number>();
    const { data, isError, isFetching } = useGetByIdQuery(reviewId);
    const reviewGroups = useSelector(
        (state: RootState) => state.reviews.groups
    );
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
    }, [userId, reviewId, setIsLike]);

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
        <>
            <ToastContainer />
            <Row>
                {isFetching && <Spinner />}
                {isError && <p>Error...</p>}
                {data && (
                    <>
                        <Col xs={4} md={3}>
                            <Image
                                src={
                                    data.image || "../../../public/default.png"
                                }
                                className={styles.image}
                            />
                        </Col>
                        <Col>
                            <Card
                                border="light"
                                className="text-center p-1 mb-2"
                            >
                                <Card.Title>{data.reviewName}</Card.Title>
                                <Card.Subtitle>
                                    {data.productName}
                                </Card.Subtitle>
                                <Card.Subtitle className="text-muted my-1">
                                    {getGroupById(reviewGroups, data.group)}
                                </Card.Subtitle>
                                <Row className="my-1">
                                    <Col>
                                        <Image
                                            src="../../../public/rating.png"
                                            width={50}
                                            height={50}
                                        />
                                    </Col>
                                    <Col className="d-flex justify-content-center align-items-center">
                                        <Image
                                            src="../../../public/favorite.png"
                                            width={50}
                                            height={50}
                                            className={`me-2 ${
                                                isLike
                                                    ? styles.active_image
                                                    : styles.inactive_image
                                            }`}
                                            onClick={addLike}
                                        />
                                        <div
                                            className={
                                                isLike
                                                    ? styles.active_text
                                                    : styles.inactive_text
                                            }
                                        >
                                            {reviewLikesCount}
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                            <Card border="light" className="p-3">
                                <div className="d-flex align-items-center mb-2">
                                    <Image
                                        src={
                                            data.user.avatar ||
                                            "../../../public/default.jpg"
                                        }
                                        width={40}
                                        height={40}
                                        roundedCircle
                                        className="me-2"
                                    />
                                    <Card.Subtitle>
                                        {data.user.name}
                                    </Card.Subtitle>
                                </div>
                                <Card.Subtitle className="my-2">
                                    {data.user.name}'s assessment:{" "}
                                    {data.authorsAssessment}
                                </Card.Subtitle>
                                Tags:
                                <div className="d-flex mb-3">
                                    {data.tags.map((tag) => (
                                        <div
                                            key={tag.id}
                                            className={`me-2 bg-info p-1 ${styles.tag}`}
                                        >
                                            {tag.tag}
                                        </div>
                                    ))}
                                </div>
                                <MDEditor.Markdown
                                    source={data.text}
                                    className={styles.text}
                                />
                            </Card>
                        </Col>
                    </>
                )}
            </Row>
        </>
    );
}

export default ReviewInfo;
