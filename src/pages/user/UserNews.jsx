import NewsCard from '../../components/NewsCard';
import { UserIDNews } from '../../hooks/newsApi';

function UserNews() {
  const userNews = UserIDNews();
  console.log(userNews);

  return (
    <>
      {userNews.length === 0 ? (
        <p>No se encontraron noticias</p>
      ) : (
        <ul className="noticia">
          {userNews.map((noticia) => (
            <li key={noticia.title}>
              <NewsCard noticia={noticia} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default UserNews;
