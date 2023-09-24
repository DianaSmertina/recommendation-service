import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import CommentApi from "../../api/CommentApi";
import { IComment } from "../../types/types";
import { RootState } from "../../redux/store";
import ExistingComments from "./existingComments/ExistingComments";
import NewComment from "./newComment/NewComment";

const socket = io("http://localhost:5000");

function Comments() {
    const { reviewId } = useParams();
    const [messages, setMessages] = useState<Array<IComment>>([]);
    const [message, setMessage] = useState("");
    const userId = useSelector((state: RootState) => state.user.id);

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
        if (userId && reviewId) {
            const sendedMessage = await CommentApi.addComment({
                userId,
                reviewId,
                text: message,
            });
            socket.emit("message", reviewId, sendedMessage.data);
            setMessage("");
        }
    };

    return (
        <Row className="justify-content-end">
            <Col xs={8} md={9} className="px-4">
                <h4 className="text-center my-2">Comments</h4>
                <ExistingComments messages={messages} setMessages={setMessages} />
                <NewComment sendMessage={sendMessage} message={message} setMessage={setMessage} />
            </Col>
        </Row>
    );
}

export default Comments;
