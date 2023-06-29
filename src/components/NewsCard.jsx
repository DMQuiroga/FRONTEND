import Scorer from './Scorer';
import './NewsCard.css';
import { BACKEND_URL } from '../config';

function NewsCard({ noticia }) {
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
        <Scorer className="score" initial={noticia.score} />
      </div>
      <p className="date">
        Fecha de publicación:{' '}
        {new Date(noticia.publishDate).toLocaleDateString('es-ES')}
      </p>
    </div>
  );
}

export default NewsCard;
