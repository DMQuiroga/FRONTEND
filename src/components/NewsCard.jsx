import Scorer from './Scorer';
import './NewsCard.css';
import { BACKEND_URL, NEWS_CATEGORIES } from '../config';
import { useAuthentication } from '../hooks/authApi';
import { useUser } from '../context/UserContext';
import Swal from 'sweetalert2';

function NewsCard({ noticia, setReloadNews }) {
  const { deleteNews } = useAuthentication();
  const [user] = useUser();
  console.log(noticia);
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

  let userAvatar = `${BACKEND_URL}/${noticia.userImageUrl}`;
  let imagenNoticia = `${BACKEND_URL}/${noticia.imagenUrl}`;
  // if (!userAvatar.startsWith('http')) {
  //   userAvatar = `${BACKEND_URL}/${noticia.userImageUrl}`;
  // }

  // if (!imagenNoticia.startsWith('http')) {
  //   imagenNoticia = `${BACKEND_URL}/${noticia.imagenUrl}`;
  // }

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
