import { Mutable, SelectProps, Tag } from "../../types";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";

export default function CreatableSelect({
  allTags,
  selectedTags,
  onCreateTag,
  onChange,
}: SelectProps) {
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
