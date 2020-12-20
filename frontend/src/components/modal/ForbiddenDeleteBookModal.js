import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function ForbiddenDeleteBookModal({showModal, handleCloseModal, bookToDelete}) {
  return (
    <>
     <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression impossible</Modal.Title>
        </Modal.Header>
        <Modal.Body>Le livre {bookToDelete.name} est en cours d'emporunt et ne peux etre supprimé.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}
