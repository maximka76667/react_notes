import { OnCreateTag, OnNoteSubmit, Tag } from "..";

type NoteFormProps = {
  onSubmit: OnNoteSubmit;
  onCreateTag: OnCreateTag;
  tags: Tag[];
};

export default NoteFormProps;
