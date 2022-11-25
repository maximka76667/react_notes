import Tag from "../Tag";

type SelectProps = {
  selectedTags: Tag[];
  onCreateTag: (newTag: Tag) => void;
  onChange: (tags: Tag[]) => void;
};

export default SelectProps;
