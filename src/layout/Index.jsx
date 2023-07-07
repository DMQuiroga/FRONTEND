import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Index.css';
import Footer from './Footer';

import Toggle from './toggle';
import AvatarButton from '../pages/user/AvatarButton';
import AddNewsButton from './addNewsButton/AddNewsButton';

function Index() {
  const navigate = useNavigate();
  const handleLinkClick = () => {
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <Link onClick={() => handleLinkClick()}>
            <h1>HB NEWS</h1>
          </Link>

          <AvatarButton />

          <span className="toggle-button">
            <Toggle />
          </span>
        </div>
      </header>
      <main className="content">
        <AddNewsButton />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Index;
