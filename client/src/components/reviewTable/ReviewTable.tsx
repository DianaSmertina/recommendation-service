import { Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import { IReviewsResponse } from "../../types/types";
import { formatDate, getGroupById } from "../../utilities/utilities";
import ToolBar from "./Toolbar.tsx/Toolbar";
import { RootState } from "../../redux/store";

interface IReviewTableProps {
    userReviews: Array<IReviewsResponse>;
    isLoading: boolean;
}

function ReviewTable({userReviews, isLoading}: IReviewTableProps) {
    const reviewGroups = useSelector(
        (state: RootState) => state.reviews.groups
    );

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : userReviews.length > 0 ? (
                <>
                    <ToolBar />
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
                                        <input type="checkbox" />
                                    </td>
                                    <td>{el.reviewName}</td>
                                    <td>{el.productName}</td>
                                    <td className="d-none d-sm-block">
                                        {getGroupById(reviewGroups, +el.group)}
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
