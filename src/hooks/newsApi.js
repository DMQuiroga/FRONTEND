import { useEffect, useState } from 'react';
import useAuthHttpCall from './useAuthHttpCall';
import { useUser } from '../context/UserContext';

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
  }, [get, selectedCategory, reloadNews]);

  return news;
}

export function UserIDNews() {
  const user = useUser();
  const [userNews, setUserNews] = useState([]);
  const { get } = useAuthHttpCall();
  const userId = user[0].id;
  console.log(userId);

  useEffect(() => {
    const fetchNews = async () => {
      let url = `/news/${userId}`; // Construir la URL con el ID del usuario
      console.log(url);

      const data = await get(url);
      setUserNews(data.data);
      console.log(data);
    };

    fetchNews();
  }, []); // Agregar userId como dependencia para que se ejecute cuando cambie

  return userNews;
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

// VOTAR NOTICIA FAKE
export function useVoteFake(newsId) {
  const [, setVotes] = useState([]);
  const { post } = useAuthHttpCall();

  const voteFake = async (amount) => {
    let url = `/news/${newsId}/fake`;
    const data = await post(url, { amount });
    setVotes(data.data);
  };

  return voteFake;
}

export default { useNews, useVote, useVoteFake, UserIDNews };
