import React, { useContext } from 'react'
import axios from 'axios'
import {
  Link,
} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import './AddUser.scss'

export default class AddUser extends React.Component {

  constructor() {
    super();
    this.state = { userData: {} }
  }


  handleInputChange = (e) => {
    let obj = { ...this.state.userData }
    obj[e.target.name] = e.target.value
    //setUserData(obj)
    this.setState({userData: {...obj}})
  }

  onSubmit = (event) => {
    //retrieve context
    if (!this.context || !this.context.updateUserInfo) {
      return;
    }

    event.preventDefault();
    axios.post('/users', {
      ...this.state.userData
    }).then(response => {
      this.context.updateUserInfo({ /*token: response.data.token,*/ userId: response.data.id, userName: response.data.firstName + " " + response.data.lastName })
    })
  }

  render() {
    return (
      <div className="add-user-container">
        <div>
          <h1>M'inscrire</h1>
          <div>
            <form onSubmit={this.onSubmit}>
              <div>
                <label>email</label>
                <input name="email" type="text" className="form-control" onChange={this.handleInputChange} />
              </div>
              <div>
                <label>nom</label>
                <input name="lastName" type="text" className="form-control" onChange={this.handleInputChange} />
              </div>
              <div>
                <label>prenom</label>
                <input name="firstName" type="text" className="form-control" onChange={this.handleInputChange} />
              </div>
              <div>
                <label>password</label>
                <input name="password" type="password" className="form-control" onChange={this.handleInputChange} />
              </div>
              <div className="container-valid text-center">
                <input type="submit" value="Valider" className="btn btn-primary" onChange={this.handleInputChange} />
              </div>
            </form>
          </div>
          <div><Link to="/">Retour à l'accueil</Link></div>
        </div>
      </div>
    )

  }
  
}
AddUser.contextType = UserContext;