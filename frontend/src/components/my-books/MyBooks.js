import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DeleteBookModal from '../modal/DeleteBookModal'
import ForbiddenDeleteBookModal from '../modal/ForbiddenDeleteBookModal'

import Book from '../book/Book';
import UserContext from '../../context/UserContext'

import './MyBooks.scss'


const MyBooks = () => {

  const { userInfo} =React.useContext(UserContext);
  const [ myBooks, setMyBooks ] =React.useState([]);
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
    console.log('book en cours demprunt')
    console.log(error.response)
    setShowForbiddenModal(true)
    setShowModalDelete(false)
    
});
  }

  const fetchMyBooks = () => {
    axios.get('/users/' + userInfo.userId + '/books/'/*, config*/ ).then(response => {
      console.log(response)
      if (response && response.data) {
        setMyBooks(response.data);
      }
    })
  }

  React.useEffect(() => {
    console.log('useeffect')
    fetchMyBooks();
  },[]);

  return (
    <div className="mybooks-container">
      <>
      <h1>Mes livres</h1>
      <div className="books">
        {myBooks.map(book => {
          return (<div>
            <Book name={book.name} category={book.category}></Book>
            <Link to={`/addBook/${book.id}`}><button className="btn btn-primary">Modifier</button></Link>
            <button className="btn btn-primary" onClick={()=>handleShowModal(book)}>Supprimer</button>
            </div>
        )}
        )}
      </div>
      <Link to={`/addBook/`}><button className="btn btn-primary">Nouveau livre</button></Link>
      <DeleteBookModal showModal={showModalDelete} handleCloseModal={handleCloseModal} bookToDelete={bookToDelete} deleteBook={deleteBook} />
      <ForbiddenDeleteBookModal showModal={showForbiddenModal} handleCloseModal={handleCloseForbiddenModal} bookToDelete={bookToDelete} />
  </>

      

    </div>
  );
}

export default MyBooks;
