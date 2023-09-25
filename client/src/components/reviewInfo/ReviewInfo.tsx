import { Image, Spinner, Col, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGetByIdQuery } from "../../redux/reviewsApi";
import { RootState } from "../../redux/store";
import { getGroupById } from "../../utilities/utilities";
import Likes from "./likes/Likes";
import Rating from "./rating/Rating";
import defaultImage from "../../assets/default.jpg";

import styles from "./reviewInfo.module.scss";
import UserBriefInfo from "../userBriefInfo/UserBriefInfo";

function ReviewInfo() {
    const { reviewId } = useParams();
    const { data, isError, isFetching } = useGetByIdQuery(reviewId);
    const reviewGroups = useSelector(
        (state: RootState) => state.reviews.groups
    );
    const { t } = useTranslation();

    return (
        <>
            <ToastContainer />
            <Row>
                {isFetching && <Spinner />}
                {isError && <p>{t("error")}</p>}
                {data && (
                    <>
                        <Col xs={4} md={3}>
                            <Image
                                src={
                                    data.image || defaultImage
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
                                    <Rating />
                                    <Likes authorsId={data.userId}/>
                                </Row>
                            </Card>
                            <Card border="light" className="p-3">
                                <UserBriefInfo user={data.user}/>
                                <Card.Subtitle className="my-2">
                                    {t("authors-assessment")}
                                    {data.authorsAssessment}
                                </Card.Subtitle>
                                {t("tags")}
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
