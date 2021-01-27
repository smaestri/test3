import {
  Link
} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function Header({ signout, userName }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </Button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/myBooks">Mes livres</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/myBorrows">Mes emprunts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/listBooks">Livres disponibles</Link>
          </li>
        </ul>
        <div>Bienvenue, {userName}</div>
        <Button variant="secondary" onClick={signout}>Se déconnecter</Button>
      </div>
    </nav>
  );
}

export default Header;
