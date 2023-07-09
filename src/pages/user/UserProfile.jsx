import { useState, useEffect, useContext } from 'react';
import { useUser } from '../../context/UserContext';
import useAuthHttpCall from '../../hooks/useAuthHttpCall';
import { BACKEND_URL } from '../../config';
import './UserProfile.css';
import { ImageContext } from '../../context/ImageContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, saveOrRemoveUser] = useUser();
  console.log(user);
  const [dataUser, setDataUser] = useState(user || {});
  console.log(dataUser);
  const { updateUserImage } = useContext(ImageContext);
  const { put } = useAuthHttpCall();
  const [userImage, setUserImage] = useState(dataUser.imagenUrl);
  const [imageKey, setImageKey] = useState(Date.now()); // Nuevo estado para el atributo key
  const navigate = useNavigate();

  useEffect(() => {
    updateUserImage(dataUser.imagenUrl);
  }, [updateUserImage, dataUser.imagenUrl]);

  useEffect(() => {
    setUserImage(dataUser.imagenUrl);
  }, [dataUser.imagenUrl]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataUser((prevDataUser) => ({
      ...prevDataUser,
      [name]: value,
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', dataUser.name);
      formData.append('surname', dataUser.surname);
      formData.append('email', dataUser.email);
      formData.append('biography', dataUser.biography);
      formData.append('ImagenUrl', userImage);

      const updatedUser = await put('/user/', formData, user);

      const newInfo = {
        ...user,
        name: updatedUser.data.updateName,
        surname: updatedUser.data.updateSurname,
        email: updatedUser.data.updateEmail,
        biography: updatedUser.data.updateBiography,
        imagenUrl: updatedUser.data.updateAvatarPhoto,
      };

      setUserImage(updatedUser.data.updateAvatarPhoto);
      console.log(newInfo);
      saveOrRemoveUser(newInfo);
      navigate(0);
      setImageKey(Date.now()); // Actualizar el atributo key
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  // FOTO AVATAR USUARIO EN PUBLICACIÓN NOTICIA:
  // 1º Obtenemos la URL de la imagen del avatar del usuario de la noticia
  let imagenUsuario = dataUser.imagenUrl;

  // Verificamos si la URL existe y no comienza con 'https'
  if (imagenUsuario && !imagenUsuario.startsWith('https')) {
    // Si no comienza con 'https', agregamos la imagen de nuestro Backend de archivo uploads
    imagenUsuario = `${BACKEND_URL}/${dataUser.imagenUrl}`;
    // Si no hay URL de imagen de usuario en la noticia
  } else if (!imagenUsuario) {
    // Se construye una URL de avatar por defecto utilizando el BACKEND_URL y el ID de usuario de la noticia
    imagenUsuario = `${BACKEND_URL}/avatar/${dataUser.userId}`;
    // Verificamos si la URL del avatar por defecto tampoco comienza con 'https'
    if (!imagenUsuario.startsWith('https')) {
      // Asignamos la imagen de avatar por defecto = DEFAULT_USER_AVATAR
      imagenUsuario = userImage;
    }
  }

  return (
    <>
      <div className="userform-contenedor">
        <h2 className="encabezado-titulo">Perfil de Usuario</h2>

        <form className="general" onSubmit={handleUpdateUser} key={userImage}>
          <label>
            Nombre
            <input
              type="text"
              name="name"
              value={dataUser?.name || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Apellido
            <input
              type="text"
              name="surname"
              value={dataUser?.surname || ''}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Biografía
            <textarea
              name="biography"
              value={dataUser?.biography || ''}
              onChange={handleInputChange}
            />
          </label>
          <div className="image-container">
            <img
              className="user-avatar-image"
              key={imageKey}
              src={imagenUsuario}
              alt="user-photo"
            />
          </div>
          <label>
            Imagen de Usuario
            <input
              name="file"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setUserImage(e.target.files[0]);
              }}
            />
          </label>

          <button className="updateuser-button" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
