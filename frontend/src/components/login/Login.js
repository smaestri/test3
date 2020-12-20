import React from 'react'
import {
  Link
} from 'react-router-dom'
import logo from './logo.jpg';
import './Login.scss'

function Login({ authenticate }) {

  const [userData, setUserData] = React.useState({})

  const handleInputChange = (e) => {
    let obj = { ...userData }
    obj[e.target.name] = e.target.value
    setUserData(obj)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(userData)
    authenticate(userData.email, userData.password);

  }

  return (
    <div className="login-container">
      <div>
        <div>
          <img src={logo} alt="Logo" />;
        </div>
        <div className="title">
          Bienvenue sur Sharebook!
        </div>
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <span>Mail: </span>
            <input type="text" className="form-control" name="email" onChange={handleInputChange} />
            <span>Password: </span>
            <input type="password" className="form-control" name="password" onChange={handleInputChange} />
            <div className="text-center">
              <input type="submit" className="btn btn-primary" value="OK" />
            </div>
          </form>
        </div>
        <div><Link to="/addUser">M'inscrire</Link></div>
      </div>
    </div>
  );
}

export default Login;
