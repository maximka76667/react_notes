import { OnNoteSubmit, OnCreateTag, Tag } from "..";

type NewNoteProps = {
  onSubmit: OnNoteSubmit;
  onCreateTag: OnCreateTag;
  tags: Tag[];
};

export default NewNoteProps;
