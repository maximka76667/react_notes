import { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "./hooks";
import { NoteData, RawNote, Tag } from "./types";
import { v4 as uuidV4 } from "uuid";
import { EditNote, NewNote, NoteLayout, NoteList, Note } from "./components";
import TagsContext from "./contexts/TagsContext";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  // const tags = useContext(TagsContext);

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
          <Route
            path="/new"
            element={<NewNote onSubmit={createNote} onCreateTag={createTag} />}
          />
          <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
            <Route index element={<Note onDelete={deleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote onSubmit={updateNote} onCreateTag={createTag} />
              }
            ></Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Container>
    </TagsContext.Provider>
  );
}

export default App;
