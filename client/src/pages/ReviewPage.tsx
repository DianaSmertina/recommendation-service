import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReviewInfo from "../components/reviewInfo/ReviewInfo";

function ReviewPage() {
    const { reviewId } = useParams();
    return (
        <Container className="py-3 content">
            <main>
                <ReviewInfo reviewId={reviewId} />
            </main>
        </Container>
    );
}

export default ReviewPage;
