import { useState } from "react";
import { Button, Stack, Modal } from "react-bootstrap";

interface IToolBar {
    selectedReview: number | undefined;
}

function ToolBar({selectedReview}: IToolBar) {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleOpenModal = () => {
        if (selectedReview) {
            setShowEditModal(true);
        }
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    return (
        <Stack direction="horizontal" gap={1} className="mb-2">
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                {selectedReview}
            </Modal>
            <Button
                className="btn btn-primary"
                size="sm"
                onClick={handleOpenModal}
            >
                Edit
            </Button>
            <Button className="btn btn-primary btn-picture unblock" size="sm">
                View mode
            </Button>
            <Button className="btn btn-primary btn-picture delete" size="sm">
                Delete
            </Button>
        </Stack>
    );
}

export default ToolBar;
