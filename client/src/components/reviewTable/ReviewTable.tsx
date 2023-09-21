import { useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IReviewsResponse } from "../../types/types";
import { formatDate, getGroupById } from "../../utilities/utilities";
import ToolBar from "./toolbar/Toolbar";
import { RootState } from "../../redux/store";

interface IReviewTableProps {
    userReviews: Array<IReviewsResponse>;
    isLoading: boolean;
}

function ReviewTable({ userReviews, isLoading }: IReviewTableProps) {
    const [selectedReview, setSelectedReview] = useState<number>();
    const reviewGroups = useSelector(
        (state: RootState) => state.reviews.groups
    );

    const handleSelect = (id: number) => {
        setSelectedReview(id);
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : userReviews.length > 0 ? (
                <>
                    <ToolBar selectedReview={selectedReview}/>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Name</th>
                                <th>Product</th>
                                <th className="d-none d-sm-block">Group</th>
                                <th>?/10</th>
                                <th className="d-none d-sm-block">
                                    Date of writing
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userReviews.map((el) => (
                                <tr key={el.id}>
                                    <td>
                                        <input
                                            type="radio"
                                            id="radioButton"
                                            name="radioButton"
                                            value={el.id}
                                            checked={el.id === selectedReview}
                                            onChange={() => handleSelect(el.id)}
                                        />
                                    </td>
                                    <td>
                                        <Link
                                            to={`/review/${el.id}`}
                                            className="text-decoration-none"
                                        >
                                            {el.reviewName}
                                        </Link>
                                    </td>
                                    <td>{el.productName}</td>
                                    <td className="d-none d-sm-block">
                                        {getGroupById(reviewGroups, el.group)}
                                    </td>
                                    <td>{el.authorsAssessment}</td>
                                    <td className="d-none d-sm-block">
                                        {
                                            formatDate(
                                                el.createdAt,
                                                "ru-Ru"
                                            ).split(",")[0]
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            ) : (
                <div>You don't write any reviews yet</div>
            )}
        </>
    );
}

export default ReviewTable;
