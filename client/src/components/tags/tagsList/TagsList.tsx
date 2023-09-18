import { Spinner } from "react-bootstrap";

import { useGetByTagQuery } from "../../../redux/reviewsApi";
import ReviewCard from "../../reviewCard/ReviewCard";

interface ITagList {
    selectedTag: number | undefined;
}

function TagsList({selectedTag}: ITagList) {
    const { data, isError, isFetching } = useGetByTagQuery(selectedTag || 0);

    return (
        <div className="d-flex">
            {isFetching && <Spinner />}
            {isError && <p>Error...</p>}
            {isError || isFetching || data?.map(el => <ReviewCard key={el.id} review={el} />)}
        </div>
    )
}

export default TagsList;