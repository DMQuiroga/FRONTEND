import useUserMe from '../../hooks/userApi';
import './UserForm.css';

import {
  NOT_LOGIN_USER_AVATAR,
  DEFAULT_USER_AVATAR,
  BACKEND_URL,
} from '../../config';

const UserFormPrueba = () => {
  const user = useUserMe();

  // Determinar la URL para la imagen de avatar
  let userImage = NOT_LOGIN_USER_AVATAR;
  if (user.userMe) {
    if (!user.userMe.imagenUrl) {
      userImage = DEFAULT_USER_AVATAR;
    } else {
      userImage = user.userMe.imagenUrl;
    }
  }
  if (!userImage.startsWith('http')) {
    userImage = `${BACKEND_URL}/uploads/${userImage}`;
  }

  return (
    <>
      <div className="contenedor">
        <h2 className="encabezado-titulo">Información del Usuario</h2>
        <form className="general">
          <label>Nombre:</label>
          <input type="text" value={user.userMe.name || ''} readOnly />

          <label>Apellidos:</label>
          <input type="text" value={user.userMe.surname || ''} readOnly />

          <label>Correo electrónico:</label>
          <input type="email" value={user.userMe.email || ''} readOnly />

          <label>Biografía:</label>
          <input type="text" value={user.userMe.biography || ''} readOnly />

          <label>ID</label>
          <input type="text" value={user.userMe.id || ''} readOnly />

          <div className="imagen-usuario"></div>
        </form>
        <img className="imagen-usuario" src={userImage} alt="" />
      </div>
    </>
  );
};

export default UserFormPrueba;
