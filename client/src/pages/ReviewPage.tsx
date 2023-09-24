import { Container } from "react-bootstrap";

import ReviewInfo from "../components/reviewInfo/ReviewInfo";
import Comments from "../components/comments/Comments";

function ReviewPage() {
    return (
        <Container className="py-3 content">
            <main>
                <ReviewInfo />
                <Comments />
            </main>
        </Container>
    );
}

export default ReviewPage;
