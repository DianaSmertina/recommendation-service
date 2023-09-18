import { TagCloud } from "react-tagcloud";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import ReviewsApi from "../../../api/ReviewsApi";
import { ITagForCloud } from "../../../types/types";

interface ITagsCloudProps {
    setSelectedTag: Dispatch<SetStateAction<number | undefined>>;
}

function TagsCloud({setSelectedTag}: ITagsCloudProps) {
    const [tags, setTags] = useState<Array<ITagForCloud>>([]);

    useEffect(() => {
        (async function () {
            const response = await ReviewsApi.getTagsForCloud();
            setTags(response.data);
        })();
    }, []);

    return (
        <TagCloud
            minSize={12}
            maxSize={35}
            tags={tags}
            className="simple-cloud mb-2"
            onClick={(tag: ITagForCloud) => setSelectedTag(tag.id)}
        />
    );
}

export default TagsCloud;
