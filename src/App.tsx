import { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLocalStorage, useNotesWithTags } from "./hooks";
import { NoteData, RawNote, Tag } from "./types";
import { v4 as uuidV4 } from "uuid";
import { EditNote, NewNote, NoteLayout, NoteList, Note } from "./components";
import TagsContext from "./contexts/TagsContext";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useNotesWithTags(notes, tags);

  // Notes controllers
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

  // Tag controllers
  function createTag(newTag: Tag) {
    setTags((prevTags) => [...prevTags, newTag]);
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
    setTags((prevTags) => prevTags.filter((tag) => tag.value !== value));
  }

  return (
    <TagsContext.Provider value={tags}>
      <Container className="my-4">
        <Routes>
          {/* Index route with note list */}
          <Route
            index
            element={
              <NoteList
                onCreateTag={createTag}
                notes={notesWithTags}
                onUpdateTag={updateTag}
                onDeleteTag={deleteTag}
              />
            }
          />

          {/* Route for creating new note */}
          <Route
            path="/new"
            element={<NewNote onSubmit={createNote} onCreateTag={createTag} />}
          />

          {/* Routes with id parameter */}
          <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
            {/* Route for showing note */}
            <Route index element={<Note onDelete={deleteNote} />} />

            {/* Route for editing note */}
            <Route
              path="edit"
              element={
                <EditNote onSubmit={updateNote} onCreateTag={createTag} />
              }
            ></Route>
          </Route>

          {/* Not found route */}
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Container>
    </TagsContext.Provider>
  );
}

export default App;
