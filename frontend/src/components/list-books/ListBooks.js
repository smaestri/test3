import React from 'react'
import axios from 'axios'
import Book from '../book/Book';

import UserContext from '../../context/UserContext'

import './ListBooks.scss'

export default class ListBooks extends React.Component {

  constructor() {
    super();
    this.state = { listBooks: [] }
  }

  componentDidMount() {
    //call APi to get books available (not those from user!)
    if (!this.context || !this.context.userInfo || !this.context.userInfo.userId) {
      return;
    }
    axios.get('/books?status=FREE').then(response => {
      if (response && response.data) {
        this.setState({ listBooks: response.data })
      }
    })
  }

  makeBorrow(bookId) {
    axios.post(`/borrows/${bookId}`, {}/*, config*/).then(() => {
      this.props.history.push("/myBorrows")
    })
  }

  render() {
    return (
      <div>
        <h1>Livres disponibles</h1>
        {this.state.listBooks.length === 0 ? <span>Pas de livres disponibles en cours</span> : ""}
        <div className="list-container">
          {this.state.listBooks.map(book => {
            return (
              <div className="book-container">
                <Book
                  name={book.name}
                  category={book.category.label}
                  lender={book.user.firstName + " " + book.user.lastName}>
                </Book>
                <div className="text-center">
                  <button className="btn btn-primary btn-sm" onClick={() => this.makeBorrow(book.id)}>Emprunter</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

ListBooks.contextType = UserContext;