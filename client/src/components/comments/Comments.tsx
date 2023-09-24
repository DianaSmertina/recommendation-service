import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import CommentApi from "../../api/CommentApi";
import { IComment } from "../../types/types";
import { RootState } from "../../redux/store";

const socket = io("http://localhost:5000");

function Comments() {
    const { reviewId } = useParams();
    const [messages, setMessages] = useState<Array<IComment>>([]);
    const [message, setMessage] = useState("");
    const userId = useSelector((state: RootState) => state.user.id);

    useEffect(() => {
        (async function () {
            const messagesList = await CommentApi.getComments(reviewId || "");
            setMessages(messagesList.data);
        })();
    }, [reviewId]);

    useEffect(() => {
        socket.emit("joinRoom", reviewId);
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
        return () => {
            socket.emit("leaveRoom", reviewId);
        };
    }, [reviewId, messages, userId]);

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
        <div>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={sendMessage}>Send</Button>
            </div>
            <div>
                {messages.map((msg) => (
                    <p key={msg.id}>{msg.text}</p>
                ))}
            </div>
        </div>
    );
}

export default Comments;
