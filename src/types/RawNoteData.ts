import NoteData from "./NoteData";

type RawNoteData = Omit<NoteData, "tags"> & {
  tagIds: string[];
};

export default RawNoteData;
