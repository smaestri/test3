import Book from '../book/Book';
import './App.css';

function MyBooks() {
  return (
    <div class="mybooks-container">
      <h1>Mes livres</h1>
      <div class="books">
        <Book></Book>
      </div>

      <button>Ajouter un livre</button>

    </div>
  );
}

export default MyBooks;
