import { useParams } from "react-router-dom";

function ReviewPage() {
    const { reviewId } = useParams();
    return <div>{reviewId}</div>
}

export default ReviewPage;