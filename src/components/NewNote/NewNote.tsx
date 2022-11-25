import { NewNoteProps } from "../../types";
import NoteForm from "../NoteForm/NoteForm";

export default function NewNote({ onSubmit, onCreateTag }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New</h1>
      <NoteForm onSubmit={onSubmit} onCreateTag={onCreateTag} />
    </>
  );
}
