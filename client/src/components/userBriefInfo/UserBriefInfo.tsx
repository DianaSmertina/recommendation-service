import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";

import { IUser } from "../../types/types";
import defaultImage from "../../assets/default.jpg";
import likeImage from "../../assets/favorite.png";
import { useCountUserLikesQuery } from "../../redux/reviewsApi";

function UserBriefInfo({ user }: { user: IUser }) {
    const { data } = useCountUserLikesQuery(user.id);

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
                    {data}
                </div>
            </Card.Subtitle>
        </Link>
    );
}

export default UserBriefInfo;
