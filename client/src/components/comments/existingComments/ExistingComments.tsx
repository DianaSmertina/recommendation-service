import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { IComment } from "../../../types/types";
import CommentApi from "../../../api/CommentApi";
import Comment from "../comment/Comment";
import displayError from "../../errorsHelpers/requestError";

interface IExistingCommentsProps {
    messages: Array<IComment>;
    setMessages: Dispatch<SetStateAction<IComment[]>>;
}

function ExistingComments({ messages, setMessages }: IExistingCommentsProps) {
    const { reviewId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        try {
            (async function () {
                const messagesList = await CommentApi.getComments(reviewId || "");
                setMessages(messagesList.data);
                setIsLoading(false);
            })();
        } catch(e) {
            displayError(e as Error);
        }
    }, [reviewId, setMessages]);

    return (
        <Row>
            {isLoading && <Spinner />}
            {!isLoading && messages.length === 0 && <p>{t("no-comment")}</p>}
            {!isLoading && messages.length !== 0 && (
                messages.map((msg) => (
                    <Comment key={msg.id} message={msg} />
                ))
            )}
        </Row>
    );
}

export default ExistingComments;
