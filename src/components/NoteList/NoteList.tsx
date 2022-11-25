import { useState, useMemo, useEffect } from "react";
import { Form, Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Tag, NoteListProps } from "../../types";
import NoteCard from "../NoteCard/NoteCard";
import EditTagsModal from "../EditTagsModal/EditTagsModal";
import useFilteredNotes from "../../hooks/useFilteredNotes";
import Select from "../CreatableSelect/CreatableSelect";

export default function NoteList({
  allTags,
  onCreateTag,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const [isEditTagsModalOpen, setIsEditTagsModalOpen] = useState(false);

  const filteredNotes = useFilteredNotes(title, selectedTags, notes);

  function handleSelectChange(tags: Tag[]) {
    setSelectedTags(tags);
  }

  function handleCreateTag(newTag: Tag) {
    setSelectedTags((prevTags) => [...prevTags, newTag]);
    onCreateTag(newTag);
  }

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col>
          <Stack
            className="d-flex justify-content-end"
            gap={2}
            direction="horizontal"
          >
            <Link to="/new">
              <Button variant="primary" type="button">
                New note
              </Button>
            </Link>
            <Button
              onClick={() => setIsEditTagsModalOpen(true)}
              variant="outline-secondary"
              type="button"
            >
              Edit tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags"></Form.Group>
            <Select
              allTags={allTags}
              onCreateTag={handleCreateTag}
              selectedTags={selectedTags}
              onChange={handleSelectChange}
            />
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(({ id, title, tags }) => (
          <Col key={id}>
            <NoteCard id={id} title={title} tags={tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        allTags={allTags}
        show={isEditTagsModalOpen}
        handleClose={() => setIsEditTagsModalOpen(false)}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  );
}
