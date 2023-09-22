import { Spinner, Image, Container } from "react-bootstrap";
import { useRef } from "react";
import { Link } from "react-router-dom";

import { IReviewsResponse } from "../../types/types";
import arrowLeft from "../../assets/arrow-left.png";
import arrowRight from "../../assets/arrow-right.png";
import defaultImage from "../../assets/default.jpg";

import styles from "./slider.module.scss";

interface ISliderProps {
    reviews: Array<IReviewsResponse>;
    isLoading: boolean;
}

function Slider({ reviews, isLoading }: ISliderProps) {
    const slider = useRef<HTMLDivElement>(null);

    const arrowClickHandler = (isLeft: boolean) => {
        if (slider.current) {
            isLeft
                ? (slider.current.scrollLeft += 100)
                : (slider.current.scrollLeft -= 100);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-between p-0 position-relative mb-3">
            <Image
                src={arrowLeft}
                width={50}
                height={50}
                onClick={() => arrowClickHandler(false)}
                className={styles.arrow}
            />
            {!isLoading ? (
                <div
                    className={`d-flex m-auto position-relative slider ${styles.slider}`}
                    ref={slider}
                >
                    {reviews.map((el) => (
                        <div className="me-3 mb-3" key={el.id}>
                            <Link to={`/review/${el.id}`}>
                                <Image
                                    src={
                                        el.image ||
                                        defaultImage
                                    }
                                    width={80}
                                    height={80}
                                    roundedCircle
                                    style={{objectFit: "cover"}}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <Spinner />
            )}
            <Image
                src={arrowRight}
                width={50}
                height={50}
                onClick={() => arrowClickHandler(true)}
                className={styles.arrow}
            />
        </Container>
    );
}

export default Slider;
