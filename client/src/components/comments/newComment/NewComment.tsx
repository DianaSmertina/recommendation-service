import { Dispatch, SetStateAction } from "react";
import { Row, Form, Button } from "react-bootstrap";

interface INewCommentProps {
    sendMessage: () => Promise<void>;
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
}

function NewComment({sendMessage, message, setMessage}: INewCommentProps) {
    return (
        <Row>
            <Form onSubmit={sendMessage} className="flex">
                <Form.Control
                    as="textarea"
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="my-2 h-50"
                ></Form.Control>
                <Button onClick={sendMessage}>Send</Button>
            </Form>
        </Row>
    );
}

export default NewComment;
