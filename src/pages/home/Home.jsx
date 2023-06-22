//import { Navigate } from 'react-router-dom';
//import { useUser } from '../../context/UserContext';
import { useEffect, useState } from 'react';
//import { useNews } from '../../hooks/newsApi';
import './Home.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
  //const { loadTodayNews } = useNews();

  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(BACKEND_URL + '/today-news');
        const data = await response.json();
        if (data.status === 'ok') {
          setNews(data.data);
        } else {
          console.error('Error al obtener las noticias:', data.message);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      {news.length === 0 ? (
        <p>No se encontraron noticias.</p>
      ) : (
        <ul>
          {news.map((n, index) => (
            <li className="newscard" key={index}>
              <h2>{n.title}</h2>
              <p>{n.text}</p>
              <img src={n.imagenUrl} alt={n.title} />
              <div className="score">{n.score} </div>
              <p>{n.publishDate} </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* try {
    loadTodayNews(setNews);
  } catch (error) {
    alert(error);
    setNews();
  }

  return (
    <section>
      {news?.map((n) => (
        <div key={n.id}>n.title</div>
      ))}
      {JSON.stringify(news)}
    </section>
  );
} */

export default Home;
