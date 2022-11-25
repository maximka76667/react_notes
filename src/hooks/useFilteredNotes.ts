import { useState, useMemo } from "react";
import { Note, Tag } from "../types";

export default function useFilteredNotes(
  title: string,
  selectedTags: Tag[],
  notes: Note[]
) {
  return useMemo(
    () =>
      notes.filter((note) => {
        const isTitleMatch = note.title
          .toLowerCase()
          .includes(title.toLowerCase());

        const isSelectedTagsMatch = selectedTags.every((tag) =>
          note.tags.some((noteTag) => noteTag.value === tag.value)
        );

        return isTitleMatch && isSelectedTagsMatch;
      }),
    [title, selectedTags, notes]
  );
}
