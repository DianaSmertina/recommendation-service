import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import { Option } from "react-bootstrap-typeahead/types/types";
import { useTranslation } from "react-i18next";

import { RootState } from "../../redux/store";
import { setTags } from "../../redux/reviewsSlice";
import ReviewsApi from "../../api/ReviewsApi";
import { IGroup, IReviewsRequest, ITag } from "../../types/types";
import BlankField from "../errorsHelpers/BlankField";
import displayError from "../errorsHelpers/requestError";

interface INewReview {
    setUpdatesChecking: Dispatch<SetStateAction<boolean>>;
}

function NewReview({ setUpdatesChecking }: INewReview) {
    const { register, formState, handleSubmit, reset } =
        useForm<IReviewsRequest>({
            mode: "onSubmit",
        });
    const { isSubmitting, errors } = formState;
    const [reviewText, setReviewText] = useState("");
    const [inFocus, setInFocus] = useState(false);
    const [selectedTags, setSelectedTags] = useState<Array<Option>>([]);
    const reviewGroups = useSelector(
        (state: RootState) => state.reviews.groups
    );
    const reviewTags = useSelector((state: RootState) => state.reviews.tags);
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.id);
    const { t } = useTranslation();

    useEffect(() => {
        (async function () {
            const tags = await ReviewsApi.getTags();
            dispatch(setTags(tags.data));
        })();
    }, [isSubmitting, dispatch]);

    const onSubmit: SubmitHandler<IReviewsRequest> = async (formData) => {
        try {
            formData.userId = Number(userId);
            formData.text = reviewText;
            formData.tags = (selectedTags as Array<ITag>).map((el) => el.tag);
            if (formData.image instanceof FileList) {
                formData.image = formData.image[0];
                if (formData.image && formData.image.size > 500000) {
                    throw new Error(t("less-image"));
                }
            }
            const dataForQuery = new FormData();
            Object.entries(formData).forEach((el) => {
                dataForQuery.append(el[0], el[1]);
            });
            await ReviewsApi.createReview(dataForQuery);
            setUpdatesChecking((prev) => !prev);
            setSelectedTags([]);
            reset();
            setReviewText("");
        } catch (error) {
            displayError(error as Error);
        }
    };

    const handleFocus = () => {
        setInFocus(true);
    };

    const cancelReview = () => {
        setInFocus(false);
    };

    const getGroupName = (el: IGroup) => {
        const lang = localStorage.getItem("lang");
        if (lang === "RUS") {
            return el.nameRus;
        }
        return el.name;
    };

    return (
        <>
            <ToastContainer />
            {userId == Number(useParams().userId) && (
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-3 white-background"
                >
                    <Form.Group onFocus={handleFocus} className="mb-2">
                        <Form.Label>{t("review-question")}</Form.Label>
                        <Form.Control
                            placeholder={t("harry-potter")}
                            {...register("productName", {
                                required: true,
                            })}
                        ></Form.Control>
                        {errors.productName && <BlankField />}
                    </Form.Group>
                    {inFocus && (
                        <>
                            <Row className="mb-2">
                                <Col xs={8}>
                                    <Form.Group>
                                        <Form.Label>
                                            {t("review-title")}
                                        </Form.Label>
                                        <Form.Control
                                            {...register("reviewName", {
                                                required: true,
                                            })}
                                        ></Form.Control>
                                        {errors.reviewName && <BlankField />}
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <FormGroup>
                                        <Form.Label>{t("group")}</Form.Label>
                                        <Form.Select
                                            {...register("group", {
                                                required: true,
                                            })}
                                        >
                                            {reviewGroups.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {getGroupName(el)}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={8}>
                                    <Form.Group>
                                        <Form.Label>{t("cover")}</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            {...register("image")}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group>
                                        <Form.Label>{t("assessment")}</Form.Label>
                                        <Form.Select
                                            {...register("authorsAssessment", {
                                                required: true,
                                            })}
                                        >
                                            {new Array(10)
                                                .fill("")
                                                .map((_, i) => (
                                                    <option
                                                        key={i + 1}
                                                        value={i + 1}
                                                    >
                                                        {i + 1}
                                                    </option>
                                                ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup className="d-flex w-100">
                                    <Typeahead
                                        id="basic-typeahead-multiple"
                                        labelKey="tag"
                                        multiple
                                        onChange={setSelectedTags}
                                        options={reviewTags}
                                        placeholder={t("add-tags")}
                                        selected={selectedTags}
                                        dropup={true}
                                        allowNew={true}
                                        newSelectionPrefix="Add new: "
                                        className="w-100"
                                    />
                                </FormGroup>
                            </Row>
                            <MDEditor
                                className="my-2"
                                value={reviewText}
                                height={150}
                                onChange={(e) => setReviewText(e || "")}
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                variant="primary"
                                value="Submit"
                                className="me-2"
                            >
                                {t("submit")}
                            </Button>
                            <Button
                                variant="primary"
                                value="Cancel"
                                onClick={cancelReview}
                            >
                                {t("cancel")}
                            </Button>
                        </>
                    )}
                </Form>
            )}
        </>
    );
}

export default NewReview;
