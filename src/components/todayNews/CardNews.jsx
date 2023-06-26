import useNews from '../../hooks/newsApi';
import './CardNews.css';
import Scorer from '../Scorer';

function CardNews() {
  const news = useNews();
  return (
    <>
      {news.length === 0 ? (
        <p>No se encontraron noticias.</p>
      ) : (
        <ul>
          {news.map((n, index) => (
            <li className="newscard" key={index}>
              <h2 className="newstitle">{n.title}</h2>
              <p className="introtext">{n.introText} </p>
              <p className="text">{n.text}</p>
              <img className="image" src={n.imagenUrl} alt="" />

              <div className="scorer">
                <Scorer className="score" initial={n.score} />
              </div>
              <p className="date">
                Fecha de publicación:{' '}
                {new Date(n.publishDate).toLocaleDateString('es-ES')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CardNews;
