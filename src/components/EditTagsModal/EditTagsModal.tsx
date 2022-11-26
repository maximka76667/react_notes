import { useContext, useState } from "react";
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import TagsContext from "../../contexts/TagsContext";
import { EditTagsModalProps, Tag } from "../../types";

export default function EditTagsModal({
  show,
  handleClose,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  const allTags = useContext(TagsContext);

  const [tagForDeleting, setTagForDeleting] = useState<Tag>();
  const [isConfimationModalOpen, setIsConfirmationModalOpen] = useState(false);

  function handleCloseConfirmationModal() {
    setIsConfirmationModalOpen(false);
  }

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
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
                        onClick={() => {
                          setTagForDeleting(tag);
                          setIsConfirmationModalOpen(true);
                        }}
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
      <ConfirmationModal
        show={isConfimationModalOpen}
        handleClose={() => setIsConfirmationModalOpen(false)}
        onDelete={onDeleteTag}
        tag={tagForDeleting!}
      />
    </>
  );
}

type ConfirmationModalProps = Pick<
  EditTagsModalProps,
  "show" | "handleClose"
> & {
  onDelete: (id: string) => void;
  tag: Tag;
};

function ConfirmationModal({
  show,
  handleClose,
  onDelete,
  tag,
}: ConfirmationModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-end">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onDelete(tag.value);
            handleClose();
          }}
        >
          <Stack gap={2} direction="horizontal">
            <Button type="submit">Of course!</Button>
            <Button onClick={handleClose} type="button">
              No.
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
