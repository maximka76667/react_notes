import Tag from "../Tag";

type EditTagsModalProps = {
  allTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

export default EditTagsModalProps;
