import { Card } from "react-bootstrap";
import { IComment } from "../../../types/types";
import UserBriefInfo from "../../userBriefInfo/UserBriefInfo";
import { formatDate } from "../../../utilities/utilities";

function Comment({ message }: { message: IComment }) {
    return (
        <Card className="white-background p-2 mb-2">
            <Card.Header>
                <UserBriefInfo user={message.user} />
            </Card.Header>
            <div className="mx-2 my-1">{message.text}</div>
            <div className="mx-2 text-muted" style={{"fontSize": "14px"}}>{formatDate(message.createdAt, "ru-RU")}</div>
        </Card>
    );
}

export default Comment;
