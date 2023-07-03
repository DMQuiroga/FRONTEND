import Scorer from './Scorer';
import './NewsCard.css';
import { BACKEND_URL, NEWS_CATEGORIES } from '../config';
import { useAuthentication } from '../hooks/authApi';
import { useUser } from '../context/UserContext';

function NewsCard({ noticia }) {
  const { deleteNews } = useAuthentication();
  const [user] = useUser();

  const handleDelete = () => {
    deleteNews(noticia.id)
      .then((response) => {
        console.log(
          'La noticia se ha borrado correctamente (FRONTEND)',
          response
        );
      })
      .catch((error) => {
        console.error('No se ha borrado la noticia (FRONTEND)', error);
      });
  };

  let userAvatar = noticia.userImageUrl;
  if (!userAvatar.startsWith('http')) {
    userAvatar = `${BACKEND_URL}/uploads/${noticia.userImageUrl}`;
  }

  let imagenNoticia = noticia.imagenUrl;
  if (!imagenNoticia.startsWith('http')) {
    imagenNoticia = `${BACKEND_URL}/uploads/${noticia.imagenUrl}`;
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
        {new Date(noticia.publishDate).toLocaleDateString('es-ES')}&nbsp;|&nbsp;
        Hora de publicación:{' '}
        {new Date(noticia.publishDate).toLocaleTimeString('es-ES')}
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
