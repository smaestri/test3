import React from 'react'

import './Book.scss'
import bookImg from './book.png'

export default class Book extends React.Component {

  constructor(props) {
super()
  }


  render() {
    const displayDate = (dateStr) => {
      let newDate = new Date(dateStr);
      return (newDate.toLocaleString("fr-FR"))
    }
    return (
      <div className="book">
        <div className="book-image"><img src={bookImg} alt="Book" /></div>
        <div>Titre : {this.props.name}</div>
        <div>Catégorie : {this.props.category}</div>
        {this.props.lender?<div>Prêteur : {this.props.lender}</div>:null}
        {this.props.askDate?<div>Demandé le: {displayDate(this.props.askDate)}</div>:null}
        {this.props.closeDate?<div>Clos le: {displayDate(this.props.closeDate)}</div>:null}
      </div>
    )
  }
  
}