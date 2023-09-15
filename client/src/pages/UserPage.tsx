import { Container } from "react-bootstrap";

import NewReview from "../components/newReview/NewReview";
import ReviewTable from "../components/reviewTable/ReviewTable";

function UserPage() {
    return (
        <Container className="h-100 py-3">
            <NewReview />
            {/* <div>{userReviews.map((el) => Object.entries(el).map((data) => <div key={data[0]}>{data[1]}</div> ))}</div> */}
            <h4 className="my-3">My Reviews</h4>
            <ReviewTable />
        </Container>
    )
}

export default UserPage;