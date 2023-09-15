import { Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IReviewsResponse } from "../../types/types";
import ReviewsApi from "../../api/ReviewsApi";
import { formatDate } from "../../utilities/utilities";
import ToolBar from "./Toolbar.tsx/Toolbar";
import { RootState } from "../../redux/store";

function ReviewTable() {
    const { userId } = useParams();
    const [userReviews, setUserReviews] = useState<Array<IReviewsResponse>>([]);
    const reviewGroups = useSelector(
        (state: RootState) => state.reviewGroups.groups
    );

    useEffect(() => {
        (async function getUserReviews() {
            const axiosReviews = await ReviewsApi.getAllByUserId(
                Number(userId)
            );
            setUserReviews(axiosReviews.data);
        })();
    }, [userId]);

    return (
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
                        <th className="d-none d-sm-block">Date of writing</th>
                    </tr>
                </thead>
                <tbody>
                    {userReviews.length === 0 ? (
                        <Spinner />
                    ) : (
                        userReviews.map((el) => (
                            <tr key={el.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{el.reviewName}</td>
                                <td>{el.productName}</td>
                                <td className="d-none d-sm-block">{(reviewGroups.find((group) => group.id === +el.group))?.name}</td>
                                <td>{el.authorsAssessment}</td>
                                <td className="d-none d-sm-block">{(formatDate(el.createdAt, "ru-Ru")).split(",")[0]}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default ReviewTable;
