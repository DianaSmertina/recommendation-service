import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getGroupById } from "../../utilities/utilities";
import { RootState } from "../../redux/store";
import { IReviewsResponse } from "../../types/types";
import defaultImage from "../../assets/default.jpg";

import styles from "./reviewCard.module.scss";

interface ICardProps {
    review: IReviewsResponse;
}

function ReviewCard({ review }: ICardProps) {
    const reviewGroups = useSelector(
        (state: RootState) => state.reviews.groups
    );

    return (
        <Card className={`${styles.card} bg-light text-center m-2 p-1`}>
            <Link to={`/review/${review.id}`} className="text-decoration-none link">
                <Card.Title className={styles.title}>{review.reviewName}</Card.Title>
                <Card.Img
                    variant="top"
                    src={review.image || defaultImage}
                    className={styles.image}
                />
                <Card.Subtitle className="text-muted mt-2">
                    {getGroupById(reviewGroups, review.group)}
                </Card.Subtitle>
                <Card.Subtitle className="my-1">{review.productName}</Card.Subtitle>
                <ListGroup variant="flush">
                    <ListGroup.Item className="bg-light">
                        {`${review.authorsAssessment}/10`}
                    </ListGroup.Item>                 
                </ListGroup>
            </Link>
        </Card>
    );
}

export default ReviewCard;
