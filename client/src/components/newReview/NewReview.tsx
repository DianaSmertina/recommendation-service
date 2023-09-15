import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { RootState } from "../../redux/store";
import ReviewsApi from "../../api/ReviewsApi";
import { IReviewsRequest } from "../../types/types";
import BlankField from "../errorsHelpers/BlankField";
import displayError from "../errorsHelpers/requestError";

import styles from "./newReview.module.scss";

function NewReview() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IReviewsRequest>({
        mode: "onSubmit",
    });
    const [reviewText, setReviewText] = useState("");
    const [inFocus, setInFocus] = useState(false);
    const reviewGroups = useSelector(
        (state: RootState) => state.reviewGroups.groups
    );
    const userId = useSelector((state: RootState) => state.user.id);

    const onSubmit: SubmitHandler<IReviewsRequest> = async (formData) => {
        try {
            formData.userId = Number(userId);
            formData.text = reviewText;
            if (formData.image instanceof FileList) {
                formData.image = formData.image[0];
                if (formData.image.size > 500000) {
                    throw new Error("Please choose image less then 5MB");
                }
            }
            const dataForQuery = new FormData();
            Object.entries(formData).forEach((el) => {
                dataForQuery.append(el[0], el[1]);
            });
            await ReviewsApi.createReview(dataForQuery);
        } catch (error) {
            displayError(error as Error);
        }
    };

    const handleFocus = () => {
        setInFocus(true);
    };

    const cancelReview = () => {
        setInFocus(false);
    };

    return (
        <>
            <ToastContainer />
            {userId == Number(useParams().userId) && (
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`p-3 ${styles.form}`}
                >
                    <Form.Group onFocus={handleFocus} className="mb-2">
                        <Form.Label>What would you like to review?</Form.Label>
                        <Form.Control
                            placeholder="Harry Potter"
                            {...register("productName", {
                                required: true,
                            })}
                        ></Form.Control>
                        {errors.productName && <BlankField />}
                    </Form.Group>
                    {inFocus && (
                        <>
                            <Row className="mb-2">
                                <Col xs={8}>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            {...register("reviewName", {
                                                required: true,
                                            })}
                                        ></Form.Control>
                                        {errors.reviewName && <BlankField />}
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <FormGroup>
                                        <Form.Label>Group</Form.Label>
                                        <Form.Select
                                            {...register("group", {
                                                required: true,
                                            })}
                                        >
                                            {reviewGroups.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={8}>
                                    <Form.Group>
                                        <Form.Label>Download cover</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            {...register("image")}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group>
                                        <Form.Label>Your assessment</Form.Label>
                                        <Form.Select
                                            {...register("authorsAssessment", {
                                                required: true,
                                            })}
                                        >
                                            {new Array(10)
                                                .fill("")
                                                .map((_, i) => (
                                                    <option
                                                        key={i + 1}
                                                        value={i + 1}
                                                    >
                                                        {i + 1}
                                                    </option>
                                                ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <MDEditor
                                className="my-2"
                                value={reviewText}
                                height={150}
                                onChange={(e) => setReviewText(e || "")}
                            />
                            <Button
                                type="submit"
                                variant="primary"
                                value="Submit"
                                className="me-2"
                            >
                                Submit
                            </Button>
                            <Button
                                variant="primary"
                                value="Cancel"
                                onClick={cancelReview}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </Form>
            )}
        </>
    );
}

export default NewReview;
