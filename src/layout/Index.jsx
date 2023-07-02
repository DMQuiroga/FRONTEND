import { Link, Outlet } from 'react-router-dom';
import './Index.css';
import Footer from './Footer';
import Toggle from './toggle';
import AvatarButton from '../pages/user/AvatarButton';

function Index() {
  const handleLinkClick = () => {
    window.location.reload();
  };

  return (
    <>
      <header className="header">
        <div className="content">
          <Link to="/" onClick={handleLinkClick}>
            <h1>HB NEWS</h1>
          </Link>

          <AvatarButton />

          <span className="toggle-button">
            <Toggle />
          </span>
        </div>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Index;
