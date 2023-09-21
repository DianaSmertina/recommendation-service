import { Container } from "react-bootstrap";

import ReviewInfo from "../components/reviewInfo/ReviewInfo";

function ReviewPage() {
    return (
        <Container className="py-3 content">
            <main>
                <ReviewInfo />
            </main>
        </Container>
    );
}

export default ReviewPage;
