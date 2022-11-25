import NoteData from "./NoteData";

type RawNoteData = Omit<NoteData, "tags"> & {
  tagValues: string[];
};

export default RawNoteData;
