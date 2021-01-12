import React from 'react'

import './Book.scss'
import bookImg from './book.png'

function Book(props) {

  const displayDate = (dateStr) => {
    let newDate = new Date(dateStr);
    return (newDate.toLocaleString("fr-FR"))
  }

  return (
    <div className="book">
      <div className="book-image"><img src={bookImg} alt="Book" /></div>
      <div>Titre : {props.name}</div>
      <div>Catégorie : {props.category}</div>
      {props.lender?<div>Prêteur : {props.lender}</div>:null}
      {props.askDate?<div>Demandé le: {displayDate(props.askDate)}</div>:null}
      {props.closeDate?<div>Clos le: {displayDate(props.closeDate)}</div>:null}
    </div>
  )
}

export default Book;