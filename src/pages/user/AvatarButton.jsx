import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useAuthentication } from '../../hooks/authApi';
import './AvatarButton.css';
import {
  NOT_LOGIN_USER_AVATAR,
  DEFAULT_USER_AVATAR,
  BACKEND_URL,
} from '../../config';

const AvatarButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickOut, setClickOut] = useState(false);

  const [user] = useUser();
  const { logout } = useAuthentication();
  const navigate = useNavigate();

  // Determinar la URL para la imagen de avatar
  let userImage = NOT_LOGIN_USER_AVATAR;
  if (user) {
    if (!user.imagenUrl) {
      userImage = DEFAULT_USER_AVATAR;
    } else {
      userImage = user.imagenUrl;
    }
  }
  if (!userImage.startsWith('http')) {
    userImage = `${BACKEND_URL}/uploads/${userImage}`;
  }

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
        <img className="avatar-userimage" src={userImage} alt="foto_user" />
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
                <Link>Logout</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </span>
  );
};

export default AvatarButton;
