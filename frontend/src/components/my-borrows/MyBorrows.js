import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Book from '../book/Book';
import './MyBorrows.scss'

function MyBorrows(props) {

  const { userInfo } = React.useContext(UserContext);
  const [ myBorrows, setMyBorrows ] =React.useState([]);

  // const config = {
  //   headers: { Authorization: `Bearer ${userInfo.token}` }
  // };


  const fetchMyLoans = () => {
    axios.get('/users/' + userInfo.userId + '/loans/'/*, config*/ ).then(response => {
      if (response && response.data) {
        setMyBorrows(response.data);
      }
    })
  }

  React.useEffect(() => {
    fetchMyLoans();
  },[]);

  const closeLoan = (idLoan) => {
  //   const config = {
  //     headers: { Authorization: `Bearer ${userInfo.token}` }
  // };
    axios.delete(`/loans/${idLoan}`/*, config*/).then(response => {
      fetchMyLoans();
    })
  }
  
  return (
    <div className="container">
    <h1>Mes emprunts</h1>
    <div className="list-container">
        {myBorrows.map(borrow => {
          return (
          <div className="borrow-container">
            <Book 
              name={borrow.book.name}
              category={borrow.book.category.label}
              lender={borrow.lender.firstName +" " + borrow.lender.lastName}
              loanDate={borrow.askDate}
              closeDate={borrow.closeDate}>
            </Book>
            <div className="text-center">
              {borrow.closeDate?"":<button className="btn btn-primary btn-sm" onClick={() => closeLoan(borrow.id)}>Clore</button>}
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
