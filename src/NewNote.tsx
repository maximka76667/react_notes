import { NoteForm } from "./NoteForm";
import { NewNoteProps } from "./props";

export function NewNote({ onSubmit }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  );
}
