import { BACKEND_URL } from '../../config';
import useUserMe from '../../hooks/userApi';
import './UserForm.css';

const UserForm = () => {
  const user = useUserMe();
  //const formattedDate = user.createdAt ? user.createdAt.split(' ')[0] : '';

  return (
    <>
      <div className="contenedor">
        <h2 className="titulo">Información del Usuario</h2>
        <form className="general">
          <label>Nombres</label>
          <input type="text" value={user.name} readOnly />

          <label>Apellidos</label>
          <input type="text" value={user.surname} readOnly />

          <label>Correo electrónico</label>
          <input type="email" value={user.email} readOnly />

          <label>Biografía</label>
          <input type="text" value={user.biography} readOnly />

          {/* <label>Cuenta activa desde</label>
          <input type="date" value={formattedDate} readOnly /> */}

          <div className="imagen-usuario">
            {user.imagenUrl && !user.imagenUrl.startsWith('http') ? (
              <div className="newsCard-left">
                <img
                  className="imagen"
                  src={`${BACKEND_URL}/uploads/${user.imagenUrl}`}
                  alt=""
                />
              </div>
            ) : user.imagenUrl && user.imagenUrl.startsWith('http') ? (
              <div className="newsCard-left">
                <img className="imagen" src={user.imagenUrl} alt="" />
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
