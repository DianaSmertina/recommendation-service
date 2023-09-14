import { Form } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import ReviewsApi from "../../api/ReviewsApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { IReviewsRequest } from "../../types/types";

function NewReview() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IReviewsRequest>({
        mode: "onSubmit",
    });
    const [value, setValue] = useState("");
    const reviewGroups = useSelector(
        (state: RootState) => state.reviewGroups.groups
    );

    const onSubmit: SubmitHandler<IReviewsRequest> = async (formData) => {
        await ReviewsApi.createReview(formData);
    };

    const fileHandler = async(e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        const size = selectedFile?.size;
        if (size && size <= 500000) {
            
        }
        console.log(selectedFile);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="d-flex">
                <Form.Label>Review Name</Form.Label>
                <Form.Control></Form.Control>
            </Form.Group>
            <Form.Group className="d-flex">
                <Form.Label>What's the review for?</Form.Label>
                <Form.Control></Form.Control>
            </Form.Group>
            <Form.Group className="d-flex">
                <Form.Label>Group</Form.Label>
                <Form.Select>
                    {reviewGroups.map((el) => (
                        <option key={el.id} value={el.name}>
                            {el.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="d-flex">
                <Form.Label>Your assessment</Form.Label>
                <Form.Select>
                    {new Array(10).fill("").map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="d-flex">
                <Form.Label>Download cover</Form.Label>
                <Form.Control type="file" onChange={fileHandler}></Form.Control>
            </Form.Group>
            <MDEditor value={value} onChange={(e) => setValue(e || "")} />
        </Form>
    );
}

export default NewReview;
