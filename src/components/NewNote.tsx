import { NewNoteProps } from "../props";
import NoteForm from "./NoteForm";

export default function NewNote({ onSubmit, onCreateTag, tags }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New</h1>
      <NoteForm onSubmit={onSubmit} onCreateTag={onCreateTag} tags={tags} />
    </>
  );
}
