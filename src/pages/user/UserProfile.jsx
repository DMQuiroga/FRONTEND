import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import useAuthHttpCall from '../../hooks/useAuthHttpCall';
import './UserProfile.css';

const UserProfile = () => {
  const [user, saveOrRemoveUser] = useUser();
  const [dataUser, setDataUser] = useState(user);
  const { put } = useAuthHttpCall();

  useEffect(() => {
    setDataUser(user);
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataUser((prevdataUser) => ({
      ...prevdataUser,
      [name]: value,
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await put('/user/', dataUser, user);

      const newInfo = {
        ...user,
        name: updatedUser.data.updateName,
        surname: updatedUser.data.updateSurname,
        email: updatedUser.data.updateEmail,
        biography: updatedUser.data.updateBiography,
        imagenUrl: updatedUser.data.updateAvatarPhoto,
      };

      console.log('newInfo', newInfo);

      saveOrRemoveUser(newInfo);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  if (!user) {
    return <div>No hay usuario</div>;
  }

  return (
    <>
      <div className="contenedor">
        <h2 className="encabezado-titulo">Perfil de Usuario</h2>
        <form className="general" onSubmit={handleUpdateUser}>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={dataUser.name}
            onChange={handleInputChange}
          />

          <label>Apellido</label>
          <input
            type="text"
            name="surname"
            value={dataUser.surname}
            onChange={handleInputChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={dataUser.email}
            onChange={handleInputChange}
          />

          <label>Biografía</label>
          <textarea
            name="biography"
            value={dataUser.biography}
            onChange={handleInputChange}
          />

          <button className="updateuser-button" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
