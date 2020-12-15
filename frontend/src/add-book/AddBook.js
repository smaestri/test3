import React from 'react'
import ReactDOM from 'react-dom'

function AddBook() {
    return (
        <div class="container-add-book">
            <h1>Ajouter un livre</h1>
            <form>
                <div>
                    <label>Nom du livre</label>
                    <input name="name" type="text" class="form-control" />
                </div>
                <div>
                    <label>catégorie du livre</label>
                    <input name="category" type="text" class="form-control" />
                </div>

                <div class="container-submit">
                    <input type="submit" value="Valider" class="btn btn-primary" />
                </div>
            </form>
            <div><a routerLink="/home/my-books">Retour</a></div>
        </div>
    )
}

export default AddBook;
