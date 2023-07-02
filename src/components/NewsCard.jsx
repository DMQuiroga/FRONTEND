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

  return (
    <div className="newscard">
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
      {user && user.id == noticia.userId ? (
        <section className="delete">
          <button onClick={handleDelete}> Borrar </button>
        </section>
      ) : null}
      <p className="date">
        Fecha de publicación:{' '}
        {new Date(noticia.publishDate).toLocaleDateString('es-ES')}&nbsp;|&nbsp;
        {NEWS_CATEGORIES[noticia.categoryId - 1]}
      </p>
    </div>
  );
}

export default NewsCard;
