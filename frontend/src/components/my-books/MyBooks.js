import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DeleteBookModal from '../modal/DeleteBookModal'
import SimpleModal from '../modal/SimpleModal'

import Book from '../book/Book';
import UserContext from '../../context/UserContext'

import './MyBooks.scss'


const MyBooks = () => {

  const { userInfo } = React.useContext(UserContext);
  const [myBooks, setMyBooks] = React.useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showForbiddenModal, setShowForbiddenModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState({});
  const handleCloseModal = () => setShowModalDelete(false);
  const handleShowModal = (book) => {
    setShowModalDelete(true);
    setBookToDelete(book);
  }
  const handleCloseForbiddenModal = () => setShowForbiddenModal(false);
  const deleteBook = (idBook) => {

    axios.delete(`/books/${idBook}`).then(response => {
      fetchMyBooks();
      setShowModalDelete(false);
    })
      .catch(error => {
        setShowForbiddenModal(true)
        setShowModalDelete(false)
        setBookToDelete({ ...bookToDelete, borrower: error.response.data.firstName })

      });
  }

  const fetchMyBooks = () => {
    axios.get('/books/'/*, config*/).then(response => {
      if (response && response.data) {
        setMyBooks(response.data);
      }
    })
  }

  React.useEffect(() => {
    fetchMyBooks();
  }, []);


  return (
    <div className="container">
      <h1>Mes livres</h1>
      {myBooks.length === 0 ? <div>Vous n'avez pas déclaré de livres.</div> : null}
      <div className="list-container">
        {myBooks.map(book => {
          return (<div className="mybook-container">
            <Book name={book.name} category={book.category.label}></Book>
            <div className="container-buttons text-center" >
              <Link to={`/addBook/${book.id}`}>
                <button className="btn btn-primary btn-sm">Modifier</button>
              </Link>
              <button className="btn btn-primary btn-sm" onClick={() => handleShowModal(book)}>Supprimer</button></div>
          </div>
          )
        }
        )}
      </div>
      <Link to={`/addBook/`}><button className="btn btn-primary">Nouveau</button></Link>
      <DeleteBookModal showModal={showModalDelete} handleCloseModal={handleCloseModal} bookToDelete={bookToDelete} deleteBook={deleteBook} />
      <SimpleModal
        showModal={showForbiddenModal}
        handleCloseModal={handleCloseForbiddenModal}
        title="Suppression impossible"
        bodyTxt={`Le livre ${bookToDelete.name} est en cours d'emprunt par ${bookToDelete.borrower} et ne peux etre supprimé.`}
      />

    </div>
  );
}

export default MyBooks;
