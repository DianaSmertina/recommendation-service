import { Button, Stack } from "react-bootstrap";

function ToolBar() {
    return (
        <Stack direction="horizontal" gap={1} className="mb-2">
            <Button className="btn btn-primary" size="sm">
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
