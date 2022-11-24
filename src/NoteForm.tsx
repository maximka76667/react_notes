import { FormEvent, useRef, useState } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteFormProps } from "./props";
import { Tag } from "./types";
import { v4 as uuidV4 } from "uuid";

export function NoteForm({ onSubmit }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Control placeholder="Title" ref={titleRef} required />
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
                placeholder="Tags"
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Control
            placeholder="e.g. Buy some chocolate..."
            required
            as="textarea"
            rows={15}
            ref={markdownRef}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
