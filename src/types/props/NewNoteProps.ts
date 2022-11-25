import { OnNoteSubmit, OnCreateTag, Tag } from "..";

type NewNoteProps = {
  onSubmit: OnNoteSubmit;
  onCreateTag: OnCreateTag;
  allTags: Tag[];
};

export default NewNoteProps;
