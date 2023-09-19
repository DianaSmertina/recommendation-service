import { Image, Spinner, Col, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

import { useGetByIdQuery } from "../../redux/reviewsApi";
import { RootState } from "../../redux/store";
import { getGroupById } from "../../utilities/utilities";
import displayError from "../errorsHelpers/requestError";
import LikeApi from "../../api/LikeApi";

import styles from "./reviewInfo.module.scss";
import Likes from "./likes/Likes";

function ReviewInfo() {
    const { reviewId } = useParams();
    const { data, isError, isFetching } = useGetByIdQuery(reviewId);
    const reviewGroups = useSelector(
        (state: RootState) => state.reviews.groups
    );

    useEffect(() => {
        (async function () {
            try {
                if (data) {
                    const result = await LikeApi.getCountForUser(data.userId);
                    console.log(result);
                }
            } catch (e) {
                displayError(e as Error);
            }
        })();
    }, [data]);

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
                                    <Likes />
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
