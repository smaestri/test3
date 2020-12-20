import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Book from '../book/Book';

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
    <div className="loans-container">
    <h1>Mes emprunts</h1>
    <span>Vous n'avez pas d'emprunt en cours,</span>
    <Link className="nav-link"  to="/listBooks">Livres disponibles</Link>
    <div className="loans">
      <div >
        {myBorrows.map(borrow => {
          return (
          <>
          <Book name={borrow.book.name} category={borrow.category}></Book>
          <div>Prété par {borrow.lender.firstName + " " + borrow.lender.lastName} le : {borrow.askDate}</div>
          {borrow.closeDate?<div>Clos le : {borrow.closeDate}</div>:<button className="btn btn-primary" onClick={()=>closeLoan(borrow.id)}>Clore</button>}
          </>
          )
        })}
      </div>
    </div>
  </div>
  );
}

export default MyBorrows;
