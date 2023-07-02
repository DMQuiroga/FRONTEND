import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useAuthentication } from '../../hooks/authApi';
import useUserMe from '../../hooks/userApi';
import './AvatarButton.css';

const AvatarButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickOut, setClickOut] = useState(false);
  const [user] = useUser();
  const { logout } = useAuthentication();
  const navigate = useNavigate();
  const userMe = useUserMe();
  const userImage = user
    ? userMe?.imagenUrl
    : 'https://cdn.onlinewebfonts.com/svg/img_322855.png';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setClickOut(false);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOut = (e) => {
      if (isMenuOpen && !e.target.closest('.avatar-button')) {
        setClickOut(true);
      }
    };

    window.addEventListener('click', handleClickOut);

    return () => {
      window.removeEventListener('click', handleClickOut);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isMenuOpen) {
        const isClickInside = e.target.closest('.avatar-button');
        if (!isClickInside) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <span className="avatar-button">
      <button className="avatar" onClick={toggleMenu}>
        <img src={userImage} alt="foto_user" />
      </button>
      {isMenuOpen && !clickOut && (
        <div className="menu">
          <ul className="menu-options">
            <li>
              {user ? (
                <p>
                  <span className="userName">{user.name}</span>
                </p>
              ) : (
                <>
                  <p>
                    <Link to="/login" onClick={() => handleMenuItemClick()}>
                      Iniciar sesión
                    </Link>{' '}
                    |{' '}
                    <Link to="/signup" onClick={() => handleMenuItemClick()}>
                      Registrarse
                    </Link>
                  </p>
                </>
              )}
            </li>
            {user && (
              <li>
                <Link to="/userinfo" onClick={() => handleMenuItemClick()}>
                  Información del Usuario
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link to="/userupdate" onClick={() => handleMenuItemClick()}>
                  Actualizar información del Usuario
                </Link>
              </li>
            )}
            {user && (
              <li onClick={() => handleMenuItemClick()}>
                Noticias del Usuario
              </li>
            )}
            {user && (
              <li onClick={() => handleLogoutClick()}>
                <a>Logout</a>
              </li>
            )}
          </ul>
        </div>
      )}
    </span>
  );
};

export default AvatarButton;
