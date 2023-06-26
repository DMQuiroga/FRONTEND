import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AvatarButton.css';

const AvatarButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    console.log('Se ha seleccionado la opción:', menuItem);
  };

  return (
    <span className="avatar-button">
      <button className="avatar" onClick={toggleMenu}>
        <img
          src="https://cdn.onlinewebfonts.com/svg/img_322855.png"
          alt="foto_user"
        />
      </button>
      {isMenuOpen && (
        <div className="menu">
          <ul>
            <li>
              <Link
                to="/userinfo"
                onClick={() => handleMenuItemClick('Opción 1')}
              >
                Información del Usuario
              </Link>
            </li>
            <li onClick={() => handleMenuItemClick('Opción 2')}>
              Actualizar información del Usuario
            </li>
            <li onClick={() => handleMenuItemClick('Opción 3')}>
              Noticias del Usuario
            </li>
            <li onClick={() => handleMenuItemClick('Opción 4')}>Logout</li>
          </ul>
        </div>
      )}
    </span>
  );
};

export default AvatarButton;
