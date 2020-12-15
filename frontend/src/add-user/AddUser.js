import React from 'react'
import ReactDOM from 'react-dom'

function AddUser() {
    return (
        <div class="add-user-container">
        <div>
          <h1>M'inscrire</h1>
          <div>
            <form>
              <div>
                <label>email</label>
                <input name="email" type="text"  class="form-control" />
              </div>
              <div>
                <label>nom</label>
                <input name="lastName" type="text"  class="form-control" />
              </div>
              <div>
                <label>prenom</label>
                <input name="firstName" type="text"  class="form-control" />
              </div>
              <div>
                <label>password</label>
                <input name="password" type="password" class="form-control" />
              </div>
              <div class="container-valid text-center">
                <input type="submit" value="Valider" class="btn btn-primary" />
              </div>
            </form>
          </div>
          <div><a routerLink="" routerLinkActive="active">Retour</a></div>
        </div>
      </div>
    )
}

export default AddUser;
