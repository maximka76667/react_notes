import { useNote } from "../../hooks";
import { NewNoteProps, NoteData } from "../../types";
import NoteForm from "../NoteForm/NoteForm";

type EditNoteProps = Omit<NewNoteProps, "onSubmit"> & {
  onSubmit: (id: string, data: NoteData) => void;
};

export default function EditNote({ onSubmit, onCreateTag }: EditNoteProps) {
  const { id, title, markdown, tags } = useNote();
  return (
    <>
      <h1 className="mb-4">New</h1>
      <NoteForm
        note={{ title, markdown, tags }}
        onSubmit={(data) => onSubmit(id, data)}
        onCreateTag={onCreateTag}
      />
    </>
  );
}
