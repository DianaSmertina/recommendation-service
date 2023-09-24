import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Comments() {
    const { reviewId } = useParams();
    const [messages, setMessages] = useState<Array<string>>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.emit("joinRoom", reviewId);
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
        return () => {
            socket.emit("leaveRoom", reviewId);
        };
    }, [reviewId, messages]);

    const sendMessage = () => {
        socket.emit("message", reviewId, message);
        setMessage("");
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
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    );
}

export default Comments;