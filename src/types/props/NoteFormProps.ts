import { OnCreateTag, OnNoteSubmit, Tag, NoteData } from "..";

type NoteFormProps = {
  onSubmit: OnNoteSubmit;
  onCreateTag: OnCreateTag;
  note?: NoteData;
};

export default NoteFormProps;
