import { useState, useEffect } from 'react';
import './TodayNews.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function TodayNews() {
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

export default TodayNews;
