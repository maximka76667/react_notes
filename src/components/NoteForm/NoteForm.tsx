import { FormEvent, useContext, useRef, useState } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NoteFormProps } from "../../types";
import { Tag } from "../../types";
import CreatableSelect from "../CreatableSelect/CreatableSelect";
import TagsContext from "../../contexts/TagsContext";
import ReactMarkdown from "react-markdown";

export default function NoteForm({
  onSubmit,
  onCreateTag,
  note: { title, markdown, tags } = {
    title: "",
    markdown: "",
    tags: [],
  },
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const [markdownState, setMarkdownState] = useState(markdown);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownState,
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
        <Row className="mb-4">
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
                selectedTags={selectedTags}
                onChange={handleSelectChange}
                onCreateTag={handleCreateTag}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="markdown">
          <Row xs={1} lg={2}>
            <Col className="mb-4">
              <h2 className="fs-6 mb-3 d-inline-block bg-light rounded p-2">
                Markdown
              </h2>
              <Form.Control
                placeholder="e.g. Buy some chocolate..."
                required
                as="textarea"
                rows={10}
                value={markdownState}
                onChange={(e) => setMarkdownState(e.target.value)}
              />
            </Col>
            <Col>
              <h2 className="fs-6 mb-3 d-inline-block bg-light rounded p-2">
                Preview
              </h2>
              <ReactMarkdown>{markdownState}</ReactMarkdown>
            </Col>
          </Row>
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
