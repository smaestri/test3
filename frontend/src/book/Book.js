import React from 'react'
import ReactDOM from 'react-dom'

function Book() {
return (<div class="book-container">
  <div class="book">
    <div><img src="/assets/book.png" /></div>
    <div>Titre :</div>
    <div>Catégorie : </div>

    <div>Prêteur :</div>
    <div>
      <button  class="btn btn-primary">Supprimer</button>
    </div>
  </div>
</div>
)
}

export default Book;