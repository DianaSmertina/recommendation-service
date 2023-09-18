import { Card, ListGroup } from "react-bootstrap";
import { IReviewsResponse } from "../../types/types";

import styles from "./reviewCard.module.scss";
import { formatDate } from "../../utilities/utilities";

interface ICardProps {
    review: IReviewsResponse;
    type: string;
}

function ReviewCard({ review, type }: ICardProps) {
    return (
        <Card className={`${styles.card} bg-light text-center m-2`}>
            <Card.Title>{review.reviewName}</Card.Title>
            <Card.Img variant="top" src={review.image || "../../../public/default.jpg"} />
            <Card.Subtitle className="text-muted">{review.group}</Card.Subtitle>
            <Card.Subtitle className="my-1">{review.productName}</Card.Subtitle>
            <ListGroup variant="flush">
                {type === "best" ? (
                    <ListGroup.Item className="bg-light">
                        {`${review.authorsAssessment}/10`}
                    </ListGroup.Item>
                ) : (
                    <ListGroup.Item className="bg-light">
                        {formatDate(review.createdAt, "ru-Ru")}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    );
}

export default ReviewCard;
