import { useState } from "react";

import TagsCloud from "./tagsCloud/TagsCloud";
import TagsList from "./tagsList/TagsList";

function Tags() {
    const [selectedTag, setSelectedTag] = useState<number>();
    return (
        <div className="white-background d-flex flex-column justify-content-center align-items-center my-4">
            <TagsCloud setSelectedTag={setSelectedTag} />
            <TagsList selectedTag={selectedTag} />
        </div>
    )
}

export default Tags;