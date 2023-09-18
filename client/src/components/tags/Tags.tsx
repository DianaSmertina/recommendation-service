import TagsCloud from "./tagsCloud/TagsCloud";
import TagsList from "./tagsList/TagsList";

function Tags() {
    return (
        <div className="white-background d-flex flex-column justify-content-center align-items-center">
            <TagsCloud />
            <TagsList />
        </div>
    )
}

export default Tags;