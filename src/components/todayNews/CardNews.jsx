import useNews from '../../hooks/newsApi';
import './CardNews.css';
import Scorer from '../Scorer';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function CardNews() {
  const news = useNews();
  return (
    <>
      {news.length === 0 ? (
        <p>No se encontraron noticias</p>
      ) : (
        <ul>
          {news.map((noticia) => (
            <li className="newscard" key={noticia.id}>
              <h2 className="newstitle">{noticia.title}</h2>
              <p className="introtext">{noticia.introText} </p>
              <p className="text">{noticia.text}</p>
              {noticia.imagenUrl ? (
                <img
                  className="imagenUploads"
                  src={`${BACKEND_URL}/uploads/${noticia.imagenUrl}`}
                  alt="Imagen noticia"
                />
              ) : null}

              {noticia.imagenUrl ? (
                <img className="imagenUrl" src={noticia.imagenUrl} alt="" />
              ) : null}

              <div className="scorer">
                <Scorer className="score" initial={noticia.score} />
              </div>
              <p className="date">
                Fecha de publicación:{' '}
                {new Date(noticia.publishDate).toLocaleDateString('es-ES')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CardNews;
