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

    // const config = {
    //   headers: { Authorization: `Bearer ${this.context.userInfo.token}` }
    // };

    axios.get('/users/' + this.context.userInfo.userId + '/books/status/FREE'/*, config*/).then(response => {
      if (response && response.data) {
        this.setState({ listBooks: response.data })
      }
    })
  }

  doLoan(bookId) {
    // const config = {
    //   headers: { Authorization: `Bearer ${this.context.userInfo.token}` }
    // };
    axios.post(`/users/${this.context.userInfo.userId}/loans/${bookId}`, {}/*, config*/).then(response => {
      this.props.history.push("/myBorrows")
    })
  }

  render() {
    return (
      <div className="list-book-container">
        <h1>Livres disponibles</h1>
        {this.state.listBooks.length === 0 ? <span>Pas de livres disponibles en cours</span> : ""}
        <div className="books">
            {this.state.listBooks.map(book => {
              return (
                <div>
                  <Book name={book.name} category={book.category}></Book>
                  <button className="btn btn-primary" onClick={() => this.doLoan(book.id)}>Emprunter</button>
                </div>
              )
            })}
        </div>
      </div>
    );
  }

}

ListBooks.contextType = UserContext;