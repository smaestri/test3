import Book from '../book/Book';
import './App.css';

function MyBorrows() {
  return (
    <div class="loans-container">
    <h1>Mes emprunts</h1>
    <span>Vous n'avez pas d'emprunt en cours,</span>
     <a routerLink="/list-books">Allez voir les
        livres disponibles!</a>
    <div class="loans">
      <div >
        <div>Demandé Le :</div>
        <Book></Book>
        <div>Clos le :</div>
        <button class="btn btn-primary">Clore</button>
      </div>
    </div>
  </div>
  );
}

export default MyBorrows;
