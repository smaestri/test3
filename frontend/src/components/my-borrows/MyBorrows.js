import React from 'react'
import axios from 'axios'
import Book from '../book/Book';
import './MyBorrows.scss'

function MyBorrows(props) {

  const [ myBorrows, setMyBorrows ] =React.useState([]);

  const fetchBorrows = () => {
    axios.get('/borrows'/*, config*/ ).then(response => {
      if (response && response.data) {
        setMyBorrows(response.data);
      }
    })
  }

  React.useEffect(() => {
    fetchBorrows();
  },[]);

  const closeBorrow = (borrowId) => {
    axios.delete(`/borrows/${borrowId}`/*, config*/).then(response => {
      fetchBorrows();
    })
  }
  
  return (
    <div className="container">
    <h1>Mes emprunts</h1>
    <div className="list-container">
        {myBorrows.map(borrow => {
          return (
          <div className="borrow-container" key={borrow.id}>
            <Book 
              name={borrow.book.name}
              category={borrow.book.category.label}
              lender={borrow.lender.firstName +" " + borrow.lender.lastName}
              askDate={borrow.askDate}
              closeDate={borrow.closeDate}>
            </Book>
            <div className="text-center">
              {borrow.closeDate?"":<button className="btn btn-primary btn-sm" onClick={() => closeBorrow(borrow.id)}>Clore</button>}
            </div>
          </div>
          )
        })}
        </div>
        {myBorrows.length === 0?<div>Vous n'avez pas d'emprunt</div>:null}
    </div>
  );
}

export default MyBorrows;
