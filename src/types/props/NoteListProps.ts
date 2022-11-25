import Note from "../Note";
import OnCreateTag from "../OnCreateTag";
import Tag from "../Tag";

type NoteListProps = {
  allTags: Tag[];
  onCreateTag: OnCreateTag;
  notes: Note[];
  onUpdateTag: (value: string, label: string) => void;
  onDeleteTag: (value: string) => void;
};

export default NoteListProps;
