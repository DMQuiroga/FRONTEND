import NewsCard from './NewsCard';

function NewsVisor({ news }) {
  return (
    <>
      {news.length === 0 ? (
        <p>No se encontraron noticias</p>
      ) : (
        <ul className="noticia">
          {news.map((noticia) => (
            <li key={noticia.id}>
              <NewsCard noticia={noticia} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default NewsVisor;
