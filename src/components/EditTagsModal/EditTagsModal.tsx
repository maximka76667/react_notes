import { useContext } from "react";
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import TagsContext from "../../contexts/TagsContext";
import { EditTagsModalProps } from "../../types";

export default function EditTagsModal({
  show,
  handleClose,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  const allTags = useContext(TagsContext);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {allTags.map((tag) => {
              return (
                <Row key={tag.value}>
                  <Col>
                    <Form.Control
                      type="text"
                      onChange={(e) => onUpdateTag(tag.value, e.target.value)}
                      value={tag.label}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      onClick={() => onDeleteTag(tag.value)}
                      variant="outline-danger"
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
