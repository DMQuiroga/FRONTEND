import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useAuthentication } from '../../hooks/authApi';
import './AvatarButton.css';
import { BACKEND_URL } from '../../config';

/* import {
  NOT_LOGIN_USER_AVATAR,
  DEFAULT_USER_AVATAR,
  BACKEND_URL,
} from '../../config';
 */
const AvatarButton = ({ userUpdateImage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickOut, setClickOut] = useState(false);
  const [user] = useUser();

  const { logout } = useAuthentication();
  const navigate = useNavigate();

  let avatarPhoto = userUpdateImage;

  // Verificamos si la URL existe y no comienza con 'https'
  if (avatarPhoto && !avatarPhoto.startsWith('https')) {
    // Si no comienza con 'https', agregamos la imagen de nuestro Backend de archivo uploads
    avatarPhoto = `${BACKEND_URL}/${userUpdateImage}`;
    // Si no hay URL de imagen de usuario en la noticia
  } else if (!avatarPhoto) {
    // Se construye una URL de avatar por defecto utilizando el BACKEND_URL y el ID de usuario de la noticia
    avatarPhoto = `${BACKEND_URL}/avatar/${userUpdateImage}`;
    // Verificamos si la URL del avatar por defecto tampoco comienza con 'https'
    if (!avatarPhoto.startsWith('https')) {
      // Asignamos la imagen de avatar por defecto = DEFAULT_USER_AVATAR
      avatarPhoto = userUpdateImage;
    }
  }

  // Determinar la URL para la imagen de avatar

  /* let userImage = NOT_LOGIN_USER_AVATAR;
  
  if (user) {
    if (!avatarImage) {
      userImage = DEFAULT_USER_AVATAR;
    } else {
      userImage = avatarImage;
    }
  }
  
  if (!userImage.startsWith('http')) {
    userImage = `${BACKEND_URL}/uploads/${userImage}`;
  } */

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
        {user && (
          <img className="avatar-userimage" src={avatarPhoto} alt="foto_user" />
        )}
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
                <Link to="usernews" onClick={() => handleMenuItemClick()}>
                  Noticias del Usuario
                </Link>
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
