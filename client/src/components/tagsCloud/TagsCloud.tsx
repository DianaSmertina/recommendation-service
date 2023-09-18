import { TagCloud } from "react-tagcloud";
import { useEffect, useState } from "react";

import ReviewsApi from "../../api/ReviewsApi";
import { ITagForCloud } from "../../types/types";

function TagsCloud() {
    const [tags, setTags] = useState<Array<ITagForCloud>>([]);

    useEffect(() => {
        (async function () {
            const response = await ReviewsApi.getTagsForCloud();
            setTags(response.data);
        })();
    }, []);

    return (
        <div className="white-background d-flex justify-content-center">
            <TagCloud
                minSize={12}
                maxSize={35}
                tags={tags}
                className="simple-cloud"
                onClick={(tag: ITagForCloud) => console.log(tag)}
            />
        </div>
    );
}

export default TagsCloud;
