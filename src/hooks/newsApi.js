import { useEffect, useState } from 'react';
import useAuthHttpCall from './useAuthHttpCall';

// OBTENER LAS NOTICIAS DE CATEGORIAS ORDENADAS POR FECHA
// OBTENER NOTICIAS DEL DÍA ORDENADAS POR PUNTUACIÓN
export function useNews(selectedCategory, reloadNews) {
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
  }, [selectedCategory, reloadNews]);

  return news;
}

// VOTAR NOTICIAS POSITIVAMENTE
export function useVoteLike(newsId) {
  const [, setVotes] = useState([]);
  const { post } = useAuthHttpCall();

  const votePositive = async () => {
    try {
      const url = `/news/${newsId}/like`;
      const data = await post(url);
      setVotes(data.data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return votePositive;
}

// VOTAR NOTICIAS NEGATIVO
export function useVoteDislike(newsId) {
  const [, setVotes] = useState([]);
  const { post } = useAuthHttpCall();

  const voteNegative = async () => {
    try {
      const url = `/news/${newsId}/dislike`;
      const data = await post(url);
      setVotes(data.data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return voteNegative;
}

export default { useNews, useVoteLike, useVoteDislike };
