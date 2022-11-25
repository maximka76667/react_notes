import { useState, useMemo } from "react";
import { Form, Button, Col, Row, Stack, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { Note, OnCreateTag, Tag } from "../types";
import NoteCard from "./NoteCard";

type NoteListProps = {
  tags: Tag[];
  onCreateTag: OnCreateTag;
  notes: Note[];
};

export default function NoteList({ tags, onCreateTag, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

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
            <Button variant="outline-secondary" type="button">
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
            <Form.Group controlId="tags">
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onCreateTag(newTag);
                  setSelectedTags((prevTags) => [...prevTags, newTag]);
                }}
                value={selectedTags.map(({ label, id }) => {
                  return { label, value: id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map(({ label, value }) => {
                      return { label, id: value };
                    })
                  );
                }}
                options={tags.map(({ label, id }) => {
                  return { label, value: id };
                })}
                placeholder="Tags"
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {notes
          .filter(
            (note) =>
              note.title.toLowerCase().includes(title.toLowerCase()) &&
              selectedTags.every((tag) =>
                note.tags.some((noteTag) => noteTag.id === tag.id)
              )
          )
          .map(({ id, title, tags }) => (
            <Col key={id}>
              <NoteCard id={id} title={title} tags={tags} />
            </Col>
          ))}
      </Row>
    </>
  );
}
