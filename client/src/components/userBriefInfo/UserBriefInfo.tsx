import { useState, useEffect } from "react";
import displayError from "../errorsHelpers/requestError";
import LikeApi from "../../api/LikeApi";
import { IUser } from "../../types/types";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import defaultImage from "../../assets/default.jpg";
import likeImage from "../../assets/favorite.png";

function UserBriefInfo({ user }: { user: IUser }) {
    const [userLikeCount, setUserLikeCount] = useState<number>();

    useEffect(() => {
        (async function () {
            try {
                const result = await LikeApi.getCountForUser(user.id);
                setUserLikeCount(result.data);
            } catch (e) {
                displayError(e as Error);
            }
        })();
    }, [user]);

    return (
        <Link
            to={`/user/${user.id}`}
            className="d-flex align-items-center mb-2 text-decoration-none link"
        >
            <Image
                src={user.avatar || defaultImage}
                width={40}
                height={40}
                roundedCircle
                className="me-2"
            />
            <Card.Subtitle>
                {user.name}
                <div className="d-flex align-items-center justify-content-center">
                    <Image
                        src={likeImage}
                        width={10}
                        height={10}
                        className="me-1"
                    />
                    {userLikeCount}
                </div>
            </Card.Subtitle>
        </Link>
    );
}

export default UserBriefInfo;
