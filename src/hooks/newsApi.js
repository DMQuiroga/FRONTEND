/* import { useState, useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function useNews() {
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

  return news;
}

export default useNews; */
