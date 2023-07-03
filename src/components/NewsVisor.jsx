import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { useNews } from '../hooks/newsApi';

function NewsVisor({ selectedCategory }) {
  const [reloadNews, setReloadNews] = useState(false);
  const news = useNews(selectedCategory, reloadNews);

  useEffect(() => {
    setReloadNews(false);
  }, [reloadNews]);

  return (
    <>
      {news.length === 0 ? (
        <p>No se encontraron noticias</p>
      ) : (
        <ul className="noticia">
          {news.map((noticia) => (
            <li key={noticia.id}>
              <NewsCard noticia={noticia} setReloadNews={setReloadNews} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default NewsVisor;
