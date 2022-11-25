import { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "./hooks";
import { NoteData, RawNote, Tag } from "./types";
import { v4 as uuidV4 } from "uuid";
import { EditNote, NewNote, NoteLayout, NoteList } from "./components";
import { Note } from "./components";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagValues.includes(tag.value)),
      };
    });
  }, [notes, tags]);

  function createNote({ tags, ...data }: NoteData) {
    const newRawNote = {
      id: uuidV4(),
      tagValues: tags.map((tag) => tag.value),
      ...data,
    };

    setNotes((prevNotes) => {
      return [...prevNotes, newRawNote];
    });
  }

  function updateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagValues: tags.map((tag) => tag.value) };
        }
        return note;
      });
    });
  }

  function deleteNote(id: string) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function updateTag(value: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.value === value) {
          return { ...tag, label };
        }
        return tag;
      });
    });
  }

  function deleteTag(value: string) {
    setTags((prevNotes) => prevNotes.filter((note) => note.value !== value));
  }

  function createTag(newTag: Tag) {
    setTags((prev) => [...prev, newTag]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          index
          element={
            <NoteList
              allTags={tags}
              onCreateTag={createTag}
              notes={notesWithTags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={createNote}
              onCreateTag={createTag}
              allTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={updateNote}
                onCreateTag={createTag}
                allTags={tags}
              />
            }
          ></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
