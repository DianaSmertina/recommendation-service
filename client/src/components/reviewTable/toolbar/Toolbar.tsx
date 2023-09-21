import { useState, Dispatch, SetStateAction } from "react";
import { Button, Stack, Modal } from "react-bootstrap";
import EditModal from "../editModal/EditModal";
import ReviewsApi from "../../../api/ReviewsApi";

interface IToolBar {
    selectedReview: number | undefined;
    setUpdatesChecking: Dispatch<SetStateAction<boolean>>;
}

function ToolBar({ selectedReview, setUpdatesChecking }: IToolBar) {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEdit = async () => {
        if (selectedReview) {
            setShowEditModal(true);
        }
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleDelete = async () => {
        if (selectedReview) {
            await ReviewsApi.deleteReview(selectedReview);
            setUpdatesChecking((prev) => !prev)
        }
    };

    return (
        <Stack direction="horizontal" gap={1} className="mb-2">
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <EditModal selectedReview={selectedReview} />
            </Modal>
            <Button className="btn btn-primary" size="sm" onClick={handleEdit}>
                Edit
            </Button>
            <Button className="btn btn-primary btn-picture delete" size="sm" onClick={handleDelete}>
                Delete
            </Button>
        </Stack>
    );
}

export default ToolBar;
