import { Spinner, Image, Container } from "react-bootstrap";

import { IReviewsResponse } from "../../types/types";
import ReviewCard from "../reviewCard/ReviewCard";

import styles from "./slider.module.scss";

interface ISliderProps {
    reviews: Array<IReviewsResponse>;
}

function Slider({ reviews }: ISliderProps) {
    return (
        <Container className="d-flex align-items-center justify-content-between p-0">
            <Image src="./arrow-left.png" width={50} height={50} />
            <div className={`d-flex m-auto ${styles.slider}`}>
                {reviews.length > 0 ? (
                    reviews.map((el) => <ReviewCard key={el.id} review={el} />)
                ) : (
                    <Spinner />
                )}
            </div>
            <Image src="./arrow-right.png" width={50} height={50} />
        </Container>
    );
}

export default Slider;
