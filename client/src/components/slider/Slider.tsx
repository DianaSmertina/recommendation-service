import { Spinner, Image, Container } from "react-bootstrap";

import { IReviewsResponse } from "../../types/types";
import ReviewCard from "../reviewCard/ReviewCard";

import styles from "./slider.module.scss";
import { useRef } from "react";

interface ISliderProps {
    reviews: Array<IReviewsResponse>;
}

function Slider({ reviews }: ISliderProps) {
    const slider = useRef<HTMLDivElement>(null);

    const arrowClickHandler = (isLeft: boolean) => {
        if (slider.current) {
            isLeft
                ? (slider.current.scrollLeft += 200)
                : (slider.current.scrollLeft -= 200);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-between p-0 position-relative">
            <Image
                src="./arrow-left.png"
                width={50}
                height={50}
                onClick={() => arrowClickHandler(false)}
            />
            {reviews.length > 0 ? (
                <div
                    className={`d-flex m-auto position-relative slider ${styles.slider}`}
                    ref={slider}
                >
                    {reviews.map((el) => (
                        <ReviewCard key={el.id} review={el} />
                    ))}
                </div>
            ) : (
                <Spinner />
            )}
            <Image
                src="./arrow-right.png"
                width={50}
                height={50}
                onClick={() => arrowClickHandler(true)}
            />
        </Container>
    );
}

export default Slider;
