import { Card, ListGroup } from "react-bootstrap";
import { IReviewsResponse } from "../../types/types";

import styles from "./reviewCard.module.scss";
import { formatDate, getGroupById } from "../../utilities/utilities";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ICardProps {
    review: IReviewsResponse;
}

function ReviewCard({ review }: ICardProps) {
    const reviewGroups = useSelector(
        (state: RootState) => state.reviews.groups
    );

    return (
        <Card className={`${styles.card} bg-light text-center m-2 p-1`}>
            <Card.Title className={styles.title}>{review.reviewName}</Card.Title>
            <Card.Img
                variant="top"
                src={review.image || "../../../public/default.jpg"}
                className={styles.image}
            />
            <Card.Subtitle className="text-muted mt-2">
                {getGroupById(reviewGroups, +review.group)}
            </Card.Subtitle>
            <Card.Subtitle className="my-1">{review.productName}</Card.Subtitle>
            <ListGroup variant="flush">
                <ListGroup.Item className="bg-light">
                    {`${review.authorsAssessment}/10`}
                </ListGroup.Item>

                <ListGroup.Item className="bg-light">
                    {formatDate(review.createdAt, "ru-Ru")}
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
}

export default ReviewCard;
