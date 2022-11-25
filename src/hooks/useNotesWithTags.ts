import { useMemo } from "react";
import { RawNote, Tag } from "../types";

export default function useNotesWithTags(notes: RawNote[], tags: Tag[]) {
  return useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagValues.includes(tag.value)),
      };
    });
  }, [notes, tags]);
}
