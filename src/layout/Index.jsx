import { Link, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Index.css';
import { useAuthentication } from '../hooks/authApi';

import SearchBar from '../components/SearchBar/SearchBar';
import AboutUs from '../pages/aboutUs/AboutUs';
import Acordeon from '../components/Acordeon';
import Contact from '../pages/contact/Contact';
import TerminosCondiciones from '../pages/TerminosCondiciones/TerminosCondiciones';

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
      <footer>
        <section className="content-footer">
          <p>
            <Acordeon title="About us">
              <AboutUs />
            </Acordeon>
          </p>

          <p>
            <Acordeon title="Contact">
              <Contact />
            </Acordeon>
          </p>

          <p>
            <Acordeon title="Terminos y condiciones">
              <TerminosCondiciones />
            </Acordeon>
          </p>

          <p>
            <Link to="/">HB News Favicon</Link>
          </p>
        </section>
      </footer>
    </>
  );
}

export default Index;
