import { Mutable, SelectProps, Tag } from "../../types";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { useContext } from "react";
import TagsContext from "../../contexts/TagsContext";

export default function CreatableSelect({
  selectedTags,
  onCreateTag,
  onChange,
}: SelectProps) {
  const allTags = useContext(TagsContext);

  return (
    <CreatableReactSelect
      onCreateOption={(label) => {
        onCreateTag({ value: uuidV4(), label });
      }}
      value={selectedTags}
      onChange={(tags) => onChange(tags as Mutable<Tag[]>)}
      options={allTags}
      placeholder="Tags"
      isMulti
    />
  );
}
