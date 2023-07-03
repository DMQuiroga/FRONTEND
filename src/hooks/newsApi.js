import { useEffect, useState } from 'react';
import useAuthHttpCall from './useAuthHttpCall';

// OBTENER LAS NOTICIAS DE CATEGORIAS ORDENADAS POR FECHA
// OBTENER NOTICIAS DEL DÍA ORDENADAS POR PUNTUACIÓN
export function useNews(selectedCategory) {
  const [news, setNews] = useState([]);
  const { get } = useAuthHttpCall();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = '/today-news';
        if (selectedCategory !== null)
          url = `/category-news/${selectedCategory}`;

        const data = await get(url);
        setNews(data.data);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  return news;
}

// VOTAR NOTICIAS POSITIVAMENTE
export function useVote(newsId, voteType) {
  const [, setVotes] = useState([]);
  const { post } = useAuthHttpCall();

  const votePositive = async () => {
    try {
      let url = `/news/${newsId}/${voteType}`;
      const data = await post(url);
      setVotes(data.data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return votePositive;
}

export default { useNews, useVote };
