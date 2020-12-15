import Book from '../book/Book';
import './App.css';

function ListBooks() {
  return (
    <div class="list-book-container">
      <h1>Livres disponibles</h1>
      <span>Pas de livres disponibles en cours</span>
      <div class="books">
        <div >
          <Book ></Book>
          <button class="btn btn-primary">Emprunter</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
