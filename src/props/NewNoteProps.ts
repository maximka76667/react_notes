import { OnNoteSubmit, OnCreateTag, Tag } from "../types";

type NewNoteProps = {
  onSubmit: OnNoteSubmit;
  onCreateTag: OnCreateTag;
  tags: Tag[];
};

export default NewNoteProps;
