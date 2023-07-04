import { useEffect, useState } from 'react';
import useAuthHttpCall from './useAuthHttpCall';

// OBTENER TODAS LAS NOTICIAS POR CATEGORIAS ORDENADAS POR FECHA
// OBTENER NOTICIAS DEL DÍA ORDENADAS POR PUNTUACIÓN
export function useNews(selectedCategory, reloadNews) {
  const [news, setNews] = useState([]);
  const { get } = useAuthHttpCall();

  useEffect(() => {
    const fetchNews = async () => {
      let url = '/today-news';
      if (selectedCategory !== null) url = `/category-news/${selectedCategory}`;

      const data = await get(url);
      setNews(data.data);
    };

    fetchNews();
  }, [selectedCategory, reloadNews]);

  return news;
}

// VOTAR NOTICIAS POSITIVAMENTE O NEGATIVAMENTE
export function useVote(newsId, voteType) {
  const [, setVotes] = useState([]);
  const { post } = useAuthHttpCall();

  const votePositive = async () => {
    let url = `/news/${newsId}/${voteType}`;
    const data = await post(url);
    setVotes(data.data);
  };

  return votePositive;
}

export default { useNews, useVote };
