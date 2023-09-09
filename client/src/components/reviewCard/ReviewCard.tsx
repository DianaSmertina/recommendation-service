import { Card } from "react-bootstrap";
import { IReviewsResponse } from "../../types/types";

import styles from "./reviewCard.module.scss";

interface ICardProps {
    review: IReviewsResponse;
}

function ReviewCard({ review }: ICardProps) {
    return (
        <Card className={`${styles.card} bg-light text-center m-2`}>
            <Card.Title>{review.reviewName}</Card.Title>
            <Card.Subtitle className="text-muted">{review.productName}</Card.Subtitle>
        </Card>
    );
}

export default ReviewCard;
