import useUserMe from '../../hooks/userApi';
import './UserForm.css';

// BOTÓN DEL HEADER DE USUARIO FUNCIONALIDAD DE OBTENER LA INFORMACIÓN DEL USUARIO LOGUEADO

import {
  NOT_LOGIN_USER_AVATAR,
  DEFAULT_USER_AVATAR,
  BACKEND_URL,
} from '../../config';

const UserForm = () => {
  const user = useUserMe();
  //const formattedDate = user.createdAt ? user.createdAt.split(' ')[0] : '';

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

  return (
    <>
      <div className="contenedor">
        <h2 className="titulo">Información del Usuario</h2>
        <form className="general">
          <label>Nombre:</label>
          <input type="text" value={user.name} readOnly />

          <label>Apellidos:</label>
          <input type="text" value={user.surname} readOnly />

          <label>Correo electrónico:</label>
          <input type="email" value={user.email} readOnly />

          <label>Biografía:</label>
          <input type="text" value={user.biography} readOnly />

          {/* <label>Cuenta activa desde</label>
          <input type="date" value={formattedDate} readOnly /> */}

          <div className="imagen-usuario">
            <div className="newsCard-left">
              <img className="imagen" src={userImage} alt="" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
