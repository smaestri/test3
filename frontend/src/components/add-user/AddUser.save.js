import React, { useContext } from 'react'
import axios from 'axios'
import {
  Link,
} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import './AddUser.scss'

function AddUser() {

  const [userData, setUserData] = React.useState({})
  const { userInfo, updateUserInfo } = useContext(UserContext);

  const handleInputChange = (e) => {
    let obj = { ...userData }
    obj[e.target.name] = e.target.value
    setUserData(obj)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post('/users', {
      ...userData
    }).then(response => {
      updateUserInfo({ /*token: response.data.token,*/ userId: response.data.id, userName: response.data.firstName + " " + response.data.lastName })
    })
  }

  return (
    <div className="add-user-container">
      <div>
        <h1>M'inscrire</h1>
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <label>email</label>
              <input name="email" type="text" className="form-control" onChange={handleInputChange} />
            </div>
            <div>
              <label>nom</label>
              <input name="lastName" type="text" className="form-control" onChange={handleInputChange} />
            </div>
            <div>
              <label>prenom</label>
              <input name="firstName" type="text" className="form-control" onChange={handleInputChange} />
            </div>
            <div>
              <label>password</label>
              <input name="password" type="password" className="form-control" onChange={handleInputChange} />
            </div>
            <div className="container-valid text-center">
              <input type="submit" value="Valider" className="btn btn-primary" onChange={handleInputChange} />
            </div>
          </form>
        </div>
        <div><Link to="/">Retour à l'accueil</Link></div>
      </div>
    </div>
  )
}

export default AddUser;