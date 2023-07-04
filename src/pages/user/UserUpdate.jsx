import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import './UserForm.css';

// BOTÓN DEL HEADER DE USUARIO FUNCIONALIDAD DE ACTUALIZAR LA INFORMACIÓN DEL USUARIO

const UserUpdate = () => {
  const [user, setUser] = useUser();
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(updatedUser);
    window.alert('¡Cambios realizados con éxito!');
  };

  return (
    <>
      <div className="contenedor">
        <h2 className="titulo">Actualizar información del Usuario</h2>
        <form className="general" onSubmit={handleSubmit}>
          <label>Nombres</label>
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
          />

          <label>Apellidos</label>
          <input
            type="text"
            name="surname"
            value={updatedUser.surname}
            onChange={handleChange}
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
          />

          <label>Biografía</label>
          <input
            type="text"
            name="biography"
            value={updatedUser.biography}
            onChange={handleChange}
          />

          <button type="submit">Actualizar</button>
        </form>
      </div>
    </>
  );
};

export default UserUpdate;
