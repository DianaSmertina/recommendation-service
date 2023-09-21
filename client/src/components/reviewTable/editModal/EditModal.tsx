import { Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";

import { useGetByIdQuery } from "../../../redux/reviewsApi";
import ReviewsApi from "../../../api/ReviewsApi";

import styles from "./editModal.module.scss";

interface IEditModal {
    selectedReview: number | undefined;
}

function EditModal({ selectedReview }: IEditModal) {
    const { data, refetch } = useGetByIdQuery(`${selectedReview}`);
    const [reviewText, setReviewText] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [dataIsUpdated, setDataIsUpdated] = useState(false);

    useEffect(() => {
        setReviewText(data?.text || "");
    }, [data]);

    const handleSubmit = async () => {
        if (selectedReview) {
            setIsUpdating(true);
            await ReviewsApi.updateReview({ text: reviewText }, selectedReview);
            setIsUpdating(false);
            setDataIsUpdated(true);
            setTimeout(() => {
                setDataIsUpdated(false);
            }, 2000);
            refetch();
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <MDEditor
                className="m-4"
                value={reviewText}
                height={300}
                onChange={(e) => setReviewText(e || "")}
            />
            <Button
                type="submit"
                variant="primary"
                value="Submit"
                className={`${styles.submit} mx-4 mb-4`}
                onClick={handleSubmit}
            >
                {isUpdating && <Spinner />}
                {dataIsUpdated && <p>Updated!</p>}
                {!isUpdating && !dataIsUpdated && <p>Submit</p>}
            </Button>
        </div>
    );
}

export default EditModal;
