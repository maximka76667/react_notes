import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link, useOutletContext } from "react-router-dom";
import { useNote } from "../hooks";
import { Note } from "../types";

export default function NoteShow() {
  const { id, title, markdown, tags } = useNote();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{title}</h1>

          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {tags.map((tag) => {
                return (
                  <Badge className="text-truncate" key={tag.id}>
                    {tag.label}
                  </Badge>
                );
              })}
            </Stack>
          )}
        </Col>
        <Col>
          <Stack
            className="d-flex justify-content-end"
            gap={2}
            direction="horizontal"
          >
            <Link to="edit">
              <Button variant="primary" type="button">
                Edit
              </Button>
            </Link>
            <Button variant="outline-danger" type="button">
              Delete
            </Button>
            <Link to="..">
              <Button variant="outline-secondary" type="button">
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </>
  );
}
