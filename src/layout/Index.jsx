import { Link, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Index.css';
import Footer from './Footer';
import { useAuthentication } from '../hooks/authApi';
import Toggle from './toggle';
import AvatarButton from '../pages/user/AvatarButton';

function Index() {
  const [user] = useUser();
  const { logout } = useAuthentication();

  const handleLinkClick = () => {
    window.location.reload();
  };

  return (
    <>
      <header>
        <div className="content">
          <Link to="/" onClick={handleLinkClick}>
            <h1>HB NEWS</h1>
          </Link>
          {user ? (
            <p>
              <span className="userName">{user.name}</span>
              <a href="#" onClick={() => logout()}>
                logout
              </a>
            </p>
          ) : (
            <>
              <p>
                <Link to="/login">Iniciar sesión</Link> |{' '}
                <Link to="/signup">Registrarse</Link>
              </p>
              <span>
                <Toggle />
              </span>
            </>
          )}
        </div>

        <AvatarButton />
      </header>
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Index;
