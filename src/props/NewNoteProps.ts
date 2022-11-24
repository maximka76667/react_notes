import OnNoteSubmit from "../types";

type NewNoteProps = {
  onSubmit: OnNoteSubmit;
  onCreateTag: (tag: Tag) => void;
};

export default NewNoteProps;
