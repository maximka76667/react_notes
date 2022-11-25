import Tag from "../Tag";

type SelectProps = {
  allTags: Tag[];
  selectedTags: Tag[];
  onCreateTag: (newTag: Tag) => void;
  onChange: (tags: Tag[]) => void;
};

export default SelectProps;
