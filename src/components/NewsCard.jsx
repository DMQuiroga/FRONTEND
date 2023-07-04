import Scorer from './Scorer';
import './NewsCard.css';
import {
  BACKEND_URL,
  NEWS_CATEGORIES,
  DEFAULT_USER_AVATAR,
  DEFAULT_IMAGE_NEWS,
} from '../config';
import { useAuthentication } from '../hooks/authApi';
import { useUser } from '../context/UserContext';
import Swal from 'sweetalert2';

function NewsCard({ noticia, setReloadNews }) {
  const { deleteNews } = useAuthentication();
  const [user] = useUser();

  const handleDelete = () => {
    Swal.fire({
      title: 'HB News',
      text: '¿Estás seguro de que quieres borrar esta noticia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNews(noticia.id)
          .then((response) => {
            console.log(
              'La noticia se ha borrado satisfactoriamente',
              response
            );
            setReloadNews((prevState) => !prevState);
          })
          .catch((error) => {
            console.error('No se ha podido borrar la noticia', error);
          });
      }
    });
  };

  // TUTORÍA STEFANO
  // let userAvatar = `${BACKEND_URL}/${noticia.userImageUrl}`;
  // let imagenNoticia = `${BACKEND_URL}/${noticia.imagenUrl}`;

  // _______________________________________________
  // FOTO AVATAR USUARIO EN PUBLICACIÓN NOTICIA:
  // 1º Obtenemos la URL de la imagen del avatar del usuario de la noticia
  let userAvatar = noticia.userImageUrl;
  // Verificamos si la URL existe y no comienza con 'https'
  if (userAvatar && !userAvatar.startsWith('https')) {
    // Si no comienza con 'https', agregamos la imagen del nuestro Backend de archivo uploads
    userAvatar = `${BACKEND_URL}/${noticia.userImageUrl}`;
    // Si no hay URL de imagen de usuario en la noticia
  } else if (!userAvatar) {
    // Se construye una URL de avatar por defecto utilizando el BACKEND_URL y el ID de usuario de la noticia
    userAvatar = `${BACKEND_URL}/avatar/${noticia.userId}`;
    // Verificamos si la URL del avatar por defecto tampoco comienza con 'https'
    if (!userAvatar.startsWith('https')) {
      // Asignamos la imagen de avatar por defecto = DEFAULT_USER_AVATAR
      userAvatar = DEFAULT_USER_AVATAR;
    }
  }

  // _______________________________________________
  // FOTO NOTICIA EN PUBLICACIÓN:
  let imagenNoticia = noticia.imagenUrl;
  // Verificamos si la URL de la imagen de la noticia existe y no comienza con 'https'
  if (imagenNoticia && !imagenNoticia.startsWith('https')) {
    // Si no comienza con 'https', agregamos la imagen del nuestro Backend de archivo uploads
    imagenNoticia = `${BACKEND_URL}/${noticia.imagenUrl}`;
  } else if (!imagenNoticia) {
    // Obtener la imagen de la noticia del backend si la URL local es nula
    imagenNoticia = `${BACKEND_URL}/noticia/${noticia.id}`;
  }
  // Verificamos si la imagen de la noticia es la imagen por defecto
  if (imagenNoticia === `${BACKEND_URL}/noticia/${noticia.id}`) {
    // Asignamos la imagen por defecto
    imagenNoticia = DEFAULT_IMAGE_NEWS;
  }

  return (
    <div className="newscard">
      <div className="userinfocard">
        <div>
          {userAvatar ? (
            <img className="userimage" src={userAvatar} alt="Avatar" />
          ) : null}
          <span className="usercreador">
            <h4 className="username">
              {noticia.name} {noticia.surname}
            </h4>
          </span>
        </div>
        <div className="scorer">
          <Scorer
            className="score"
            initial={noticia.score}
            newsId={noticia.id}
          />
        </div>
      </div>
      <div className="newsCard-container"></div>
      <h2 className="newstitle">{noticia.title}</h2>
      <h4 className="introtext">{noticia.introText} </h4>
      <div className="newsCard-container">
        {imagenNoticia ? (
          <div className="newsCard-left">
            <img className="imagen" src={imagenNoticia} alt={noticia.title} />
          </div>
        ) : null}
        <div className="newsCard-right">
          <p className="text">{noticia.text}</p>
        </div>
      </div>
      <p className="metadata">
        Fecha de publicación:{' '}
        {new Date(noticia.publishDate).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
        &nbsp;|&nbsp;
        {NEWS_CATEGORIES[noticia.categoryId - 1]}
        {user && user.id === noticia.userId ? (
          <>
            <button className="animated" onClick={handleDelete}>
              {' '}
              Borrar{' '}
            </button>
            <button className="animated" onClick={handleDelete}>
              {' '}
              Editar{' '}
            </button>
          </>
        ) : null}
      </p>
    </div>
  );
}

export default NewsCard;
