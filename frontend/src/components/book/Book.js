import React from 'react'

import './Book.scss'
import bookImg from './book.png'

function Book(props) {
  return (<div className="book-container">
    <div className="book">
      <div><img src={bookImg} alt="Book" /></div>
      <div>Titre : {props.name}</div>
      <div>Catégorie : {props.category}</div>
    </div>
  </div>
  )
}

export default Book;