import { Link, Outlet } from 'react-router-dom';
import './Index.css';
import Footer from './Footer';

import Toggle from './toggle';
import AvatarButton from '../pages/user/AvatarButton';
import AddNewsButton from './addNewsButton/AddNewsButton';
import { useDark } from '../context/DarkContext';

function Index() {
  const [dark] = useDark();
  return (
    <>
      <header className={`header masuno ${dark}`}>
        <div className={`header-content ${dark}`}>
          <Link reloadDocument to="/">
            <h1>HB NEWS</h1>
          </Link>

          <AvatarButton />

          <span className="toggle-button">
            <Toggle />
          </span>
        </div>
      </header>
      <main className={`content ${dark}`}>
        <AddNewsButton />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Index;
