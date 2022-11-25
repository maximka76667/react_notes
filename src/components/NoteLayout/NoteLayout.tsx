import { Navigate, Outlet, useParams } from "react-router-dom";
import { NoteLayoutProps } from "../../types";

export default function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (note == null) {
    return <Navigate to="/" />;
  }

  return <Outlet context={note} />;
}
