import { Button, Form } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/store";
import ReviewsApi from "../../api/ReviewsApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { IReviewsRequest } from "../../types/types";
import BlankField from "../errors/BlankField";

function NewReview() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IReviewsRequest>({
        mode: "onSubmit",
    });
    const [reviewText, setReviewText] = useState("");
    const reviewGroups = useSelector(
        (state: RootState) => state.reviewGroups.groups
    );
    const userId = useSelector((state: RootState) => state.user.id);

    const onSubmit: SubmitHandler<IReviewsRequest> = async (formData) => {
        formData.userId = Number(userId);
        formData.text = reviewText;
        if (formData.image instanceof FileList) {
            formData.image = formData.image[0];
        }
        const dataForQuery = new FormData();
        Object.entries(formData).forEach((el) => {
            dataForQuery.append(el[0], el[1]);
        })
        await ReviewsApi.createReview(dataForQuery);
    };

    return (
        <>
            <ToastContainer />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="d-flex">
                    <Form.Label>Review Name</Form.Label>
                    <Form.Control
                        {...register("reviewName", {
                            required: true,
                        })}
                    ></Form.Control>
                    {errors.reviewName && <BlankField />}
                </Form.Group>
                <Form.Group className="d-flex">
                    <Form.Label>What's the review for?</Form.Label>
                    <Form.Control
                        {...register("productName", {
                            required: true,
                        })}
                    ></Form.Control>
                    {errors.productName && <BlankField />}
                </Form.Group>
                <Form.Group className="d-flex">
                    <Form.Label>Group</Form.Label>
                    <Form.Select
                        {...register("group", {
                            required: true,
                        })}
                    >
                        {reviewGroups.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="d-flex">
                    <Form.Label>Your assessment</Form.Label>
                    <Form.Select
                        {...register("authorsAssessment", {
                            required: true,
                        })}
                    >
                        {new Array(10).fill("").map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="d-flex">
                    <Form.Label>Download cover</Form.Label>
                    <Form.Control
                        type="file"
                        {...register("image")}
                    ></Form.Control>
                </Form.Group>
                <MDEditor
                    value={reviewText}
                    onChange={(e) => setReviewText(e || "")}
                />
                <Button type="submit" variant="primary" value="Submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default NewReview;
