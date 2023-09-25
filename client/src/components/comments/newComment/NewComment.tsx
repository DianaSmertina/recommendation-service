import { Dispatch, SetStateAction } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface INewCommentProps {
    sendMessage: () => Promise<void>;
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
}

function NewComment({sendMessage, message, setMessage}: INewCommentProps) {
    const { t } = useTranslation();

    return (
        <Row>
            <Form onSubmit={sendMessage} className="flex p-0">
                <Form.Control
                    as="textarea"
                    placeholder={t("enter-comment")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="my-2 h-50"
                ></Form.Control>
                <Button onClick={sendMessage}>{t("submit")}</Button>
            </Form>
        </Row>
    );
}

export default NewComment;
