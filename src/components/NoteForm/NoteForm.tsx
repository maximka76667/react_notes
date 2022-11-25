import { FormEvent, useRef, useState } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { Mutable, NoteFormProps } from "../../types";
import { Tag } from "../../types";
import { v4 as uuidV4 } from "uuid";
import Select from "../CreatableSelect/CreatableSelect";
import CreatableSelect from "../CreatableSelect/CreatableSelect";

export default function NoteForm({
  onSubmit,
  onCreateTag,
  allTags,
  note: { title, markdown, tags } = {
    title: "",
    markdown: "",
    tags: [],
  },
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  function handleSelectChange(tags: Tag[]) {
    setSelectedTags(tags);
  }

  function handleCreateTag(newTag: Tag) {
    setSelectedTags((prevTags) => [...prevTags, newTag]);
    onCreateTag(newTag);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Control
                placeholder="Title"
                ref={titleRef}
                required
                defaultValue={title}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <CreatableSelect
                allTags={allTags}
                selectedTags={selectedTags}
                onChange={handleSelectChange}
                onCreateTag={handleCreateTag}
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
            defaultValue={markdown}
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
