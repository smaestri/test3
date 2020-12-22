import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function DeleteBookModal({showModal, handleCloseModal, bookToDelete, deleteBook}) {
  return (
     <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer ce livre?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Etes-vous sur de vouloir supprimer le livre {bookToDelete.name} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={()=>deleteBook(bookToDelete.id)}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
