import Scorer from './Scorer';
import './NewsCard.css';
import { BACKEND_URL, NEWS_CATEGORIES } from '../config';
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

  return (
    <div className="newscard">
      <div className="userinfocard">
        <div className="userImage">
          {noticia.userImageUrl && !noticia.userImageUrl.startsWith('http') ? (
            <img
              className="imagen"
              src={`${BACKEND_URL}/uploads/${noticia.userImageUrl}`}
              alt="Avatar"
            />
          ) : noticia.userImageUrl &&
            noticia.userImageUrl.startsWith('http') ? (
            <img className="imagen" src={noticia.userImageUrl} alt="Avatar" />
          ) : null}
        </div>
        <span className="usercreador">
          Autor noticia:{' '}
          <h4 className="username">
            {noticia.name} {noticia.surname}
          </h4>
        </span>
      </div>
      <div className="newsCard-container"></div>
      <h2 className="newstitle">{noticia.title}</h2>
      <h4 className="introtext">{noticia.introText} </h4>
      <div className="newsCard-container">
        {noticia.imagenUrl && !noticia.imagenUrl.startsWith('http') ? (
          <div className="newsCard-left">
            <img
              className="imagen"
              src={`${BACKEND_URL}/uploads/${noticia.imagenUrl}`}
              alt={noticia.title}
            />
          </div>
        ) : noticia.imagenUrl && noticia.imagenUrl.startsWith('http') ? (
          <div className="newsCard-left">
            <img
              className="imagen"
              src={noticia.imagenUrl}
              alt={noticia.title}
            />
          </div>
        ) : null}
        <div className="newsCard-right">
          <p className="text">{noticia.text}</p>
        </div>
      </div>
      <div className="scorer">
        <Scorer className="score" initial={noticia.score} newsId={noticia.id} />
      </div>
      {user && user.id === noticia.userId ? (
        <section className="delete">
          <button onClick={handleDelete}> Borrar </button>
        </section>
      ) : null}
      <p className="date">
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
      </p>
    </div>
  );
}

export default NewsCard;
