import React from 'react'
import {
  Link
} from 'react-router-dom'
import logo from './logo.jpg';
import './Login.scss'

// function Login({ authenticate }) {
export default class Login extends React.Component {

  constructor() {
    super();
    this.state= {userData : {}}
  }

  handleInputChange = (e) => {
    let obj = { ...this.state.userData }
    obj[e.target.name] = e.target.value
    //setUserData(obj)
    this.setState({userData: {...obj}})
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.authenticate(this.state.userData.email, this.state.userData.password);

  }
  render() {

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
            <form onSubmit={this.onSubmit}>
              <span>Mail: </span>
              <input type="text" className="form-control" name="email" onChange={this.handleInputChange} />
              <span>Password: </span>
              <input type="password" className="form-control" name="password" onChange={this.handleInputChange} />
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
}
