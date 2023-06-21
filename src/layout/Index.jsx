import { Link, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Index.css';
import { useAuthentication } from '../hooks/authApi';
import SearchBar from '../components/SearchBar/SearchBar';

function Index() {
  const [user] = useUser();
  const { logout } = useAuthentication();

  return (
    <>
      <header>
        <div className="content">
          <Link to="/">
            <h1>HB NEWS</h1>
          </Link>
          <SearchBar />
          {user ? (
            <p>
              <span className="userName">{user.name}</span>
              <a href="#" onClick={() => logout()}>
                logout
              </a>
            </p>
          ) : (
            <p>
              <Link to="/login">Iniciar sesión</Link> |{' '}
              <Link to="/signup">Registrarse</Link>
            </p>
          )}
        </div>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </>
  );
}

export default Index;
