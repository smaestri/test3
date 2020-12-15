import Book from '../book/Book';
import './App.css';

function Login() {
  return (
    <div class="login-container">
      <div>
        <div>
          <img src="/assets/logo.jpg" />
        </div>
        <div class="title">
          Bienvenue sur Sharebook!
        </div>
        <div class="form-container">
          <form>
            <span>Mail: </span>
            <input type="text" class="form-control" name="email" />
            <span>Password: </span>
            <input type="password" class="form-control" name="password" />
            <div class="text-center">
              <input type="submit" class="btn btn-primary" value="OK" />
            </div>
          </form>
        </div>
        <div><a routerLink="/add-user" routerLinkActive="active">M'inscrire</a></div>
      </div>
    </div>
  );
}

export default Login;
