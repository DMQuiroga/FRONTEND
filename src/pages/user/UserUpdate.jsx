import { useState } from 'react';
import useUserMe from '../../hooks/userApi';
import { useUser } from '../../context/UserContext';
//import useAuthHttpCall from '../../hooks/useAuthHttpCall';
import './UserForm.css';

const UserUpdate = () => {
  const { userMe, updateUser } = useUserMe();
  const [, saveOrRemoveUser] = useUser();
  //const { post } = useAuthHttpCall();
  const [formData, setFormData] = useState({
    name: userMe.name || '',
    surname: userMe.surname || '',
    email: userMe.email || '',
    password: userMe.password || '',
    biography: userMe.biography || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    //await post();
    e.preventDefault();
    updateUser(formData);
    saveOrRemoveUser(formData);
  };

  return (
    <>
      <div className="contenedor">
        <h2 className="titulo">Editar Información del Usuario</h2>
        <form className="general" onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Apellidos:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />

          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Contraseña:</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <label>Biografía:</label>
          <input
            type="text"
            name="biography"
            value={formData.biography}
            onChange={handleChange}
          />

          <button className="updateuser-button" type="submit">
            Actualizar
          </button>
        </form>
      </div>
    </>
  );
};

export default UserUpdate;
