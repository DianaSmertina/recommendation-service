import { Image, Spinner, Col, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import MDEditor from "@uiw/react-md-editor";

import { useGetByIdQuery } from "../../redux/reviewsApi";
import { RootState } from "../../redux/store";
import { getGroupById } from "../../utilities/utilities";

import styles from "./reviewInfo.module.scss";

interface IReviewInfoProps {
    reviewId: string | undefined;
}

function ReviewInfo({ reviewId }: IReviewInfoProps) {
    const { data, isError, isFetching } = useGetByIdQuery(reviewId);
    const reviewGroups = useSelector(
        (state: RootState) => state.reviews.groups
    );

    return (
        <Row>
            {isFetching && <Spinner />}
            {isError && <p>Error...</p>}
            {data && (
                <>
                    <Col xs={4} md={3}>
                        <Image
                            src={data.image || "../../../public/default.png"}
                            className={styles.image}
                        />
                    </Col>
                    <Col>
                        <Card border="light" className="text-center p-1 mb-2">
                            <Card.Title>{data.reviewName}</Card.Title>
                            <Card.Subtitle>{data.productName}</Card.Subtitle>
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
                                <Col>
                                    <Image
                                        src="../../../public/favorite.png"
                                        width={50}
                                        height={50}
                                    />
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
                                <Card.Subtitle>{data.user.name}</Card.Subtitle>
                            </div>
                            <Card.Subtitle className="my-2">
                                {data.user.name} assessment:{" "}
                                {data.authorsAssessment}
                            </Card.Subtitle>
                            Tags:
                            <div className="d-flex mb-3">
                                {data.tags.map((tag) => (
                                    <div key={tag.id} className={`me-2 bg-info p-1 ${styles.tag}`}>{tag.tag}</div>
                                ))}
                            </div>
                            <Card.Text>
                                <MDEditor.Markdown
                                    source={data.text}
                                    className={styles.text}
                                />
                            </Card.Text>
                        </Card>
                    </Col>
                </>
            )}
        </Row>
    );
}

export default ReviewInfo;
