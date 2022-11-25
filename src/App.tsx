import { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "./hooks";
import { NoteData, RawNote, Tag } from "./types";
import { v4 as uuidV4 } from "uuid";
import { NewNote, NoteLayout, NoteList } from "./components";
import NoteShow from "./components/NoteShow";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function createNote({ tags, ...data }: NoteData) {
    const newRawNote = {
      id: uuidV4(),
      tagIds: tags.map((tag) => tag.id),
      ...data,
    };

    setNotes((prevNotes) => {
      return [...prevNotes, newRawNote];
    });
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
              tags={tags}
              onCreateTag={createTag}
              notes={notesWithTags}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={createNote}
              onCreateTag={createTag}
              tags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<NoteShow />} />
          <Route path="edit" element={<h1>Edit</h1>}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
