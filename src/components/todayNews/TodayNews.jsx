import useNews from '../../hooks/newsApi';
import './TodayNews.css';
import NewsCard from '../NewsCard';

function TodayNews() {
  const news = useNews();
  return (
    <>
      <h1>Noticias de Hoy</h1>
      {news.length === 0 ? (
        <p>No se encontraron noticias</p>
      ) : (
        <ul className="noticia">
          {news.map((noticia) => (
            <li className="newscard" key={noticia.id}>
              <NewsCard noticia={noticia} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default TodayNews;
