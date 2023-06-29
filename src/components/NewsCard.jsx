import Scorer from './Scorer';
import { BACKEND_URL } from '../config';

function NewsCard({ noticia }) {
  return (
    <div>
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
        <img className="imagen" src={noticia.imagenUrl} alt={noticia.title} />
      ) : null}
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
