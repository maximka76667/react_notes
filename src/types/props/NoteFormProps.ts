import { OnCreateTag, OnNoteSubmit, Tag, NoteData } from "..";

type NoteFormProps = {
  onSubmit: OnNoteSubmit;
  onCreateTag: OnCreateTag;
  allTags: Tag[];
  note?: NoteData;
};

export default NoteFormProps;
