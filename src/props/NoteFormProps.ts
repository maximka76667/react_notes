import { OnCreateTag, OnNoteSubmit, Tag } from "../types";

type NoteFormProps = {
  onSubmit: OnNoteSubmit;
  onCreateTag: OnCreateTag;
  tags: Tag[];
};

export default NoteFormProps;
