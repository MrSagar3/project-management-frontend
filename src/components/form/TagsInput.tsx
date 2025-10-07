import { Tag } from "node_modules/react-tag-input/types/components/SingleTag";
import { WithContext as ReactTags } from "react-tag-input";

import { TTag } from "@/types/tag";

const KeyCodes = {
  enter: 13,
  space: 32,
};

const delimiters = [KeyCodes.space, KeyCodes.enter];

interface TagsInputProps {
  taskId: number;
  tags: TTag[];
  setTags: (tags: TTag[]) => void;
}

const mapToTag = (tag: TTag): Tag => ({
  id: tag.id?.toString() || "",
  className: tag.className || "",
  text: tag.label,
  label: "",
});

const TagsInput = ({ tags, setTags, taskId }: TagsInputProps) => {
  const handleDelete = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    if (tags.some((existingTag) => existingTag.label === tag.text)) {
      return;
    }
    const tagToAdd: TTag = {
      id: taskId,
      label: tag.text,
    };
    setTags([...tags, tagToAdd]);
  };

  return (
    <div className="flex flex-col space-x-3  border border-black  p-1 rounded">
      <ReactTags
        tags={tags.map(mapToTag)}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        delimiters={delimiters}
        placeholder="Add tags"
      />
    </div>
  );
};

export default TagsInput;
