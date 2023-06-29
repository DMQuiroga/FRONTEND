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
        <ul className="noticia">
          {news.map((noticia) => (
            <li className="newscard" key={noticia.id}>
              <h2 className="newstitle">{noticia.title}</h2>
              <h4 className="introtext">{noticia.introText} </h4>
              <p className="text">{noticia.text}</p>
              {noticia.imagenUrl && !noticia.imagenUrl.startsWith('http') ? (
                <img
                  className="imagen"
                  src={`${BACKEND_URL}/uploads/${noticia.imagenUrl}`}
                  alt={noticia.title}
                />
              ) : noticia.imagenUrl && noticia.imagenUrl.startsWith('http') ? (
                <img
                  className="imagen"
                  src={noticia.imagenUrl}
                  alt={noticia.title}
                />
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
