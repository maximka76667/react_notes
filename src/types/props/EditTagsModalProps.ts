import Tag from "../Tag";

type EditTagsModalProps = {
  show: boolean;
  handleClose: () => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

export default EditTagsModalProps;
