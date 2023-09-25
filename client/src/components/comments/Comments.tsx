import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useTranslation } from "react-i18next";

import CommentApi from "../../api/CommentApi";
import { IComment } from "../../types/types";
import { RootState } from "../../redux/store";
import ExistingComments from "./existingComments/ExistingComments";
import NewComment from "./newComment/NewComment";
import displayError from "../errorsHelpers/requestError";

const socket = io("https://recommendation-service-server.onrender.com");

function Comments() {
    const { reviewId } = useParams();
    const [messages, setMessages] = useState<Array<IComment>>([]);
    const [message, setMessage] = useState("");
    const userId = useSelector((state: RootState) => state.user.id);
    const { t } = useTranslation();

    useEffect(() => {
        socket.emit("joinRoom", reviewId);
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
        return () => {
            socket.emit("leaveRoom", reviewId);
        };
    }, [reviewId, messages]);

    const sendMessage = async () => {
        try {
            if (userId && reviewId) {
                const sendedMessage = await CommentApi.addComment({
                    userId,
                    reviewId,
                    text: message,
                });
                socket.emit("message", reviewId, sendedMessage.data);
                setMessage("");
            } else if (!userId) {
                throw new Error(t("sign-in-comment"));
            }
        } catch(e) {
            displayError(e as Error);
        }
    };

    return (
        <Row className="justify-content-end">
            <Col xs={12} md={9} className="px-4">
                <h4 className="text-center my-2">{t("comments")}</h4>
                <ExistingComments messages={messages} setMessages={setMessages} />
                <NewComment sendMessage={sendMessage} message={message} setMessage={setMessage} />
            </Col>
        </Row>
    );
}

export default Comments;
