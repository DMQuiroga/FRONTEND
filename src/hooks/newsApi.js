import { useEffect, useState } from 'react';
import useAuthHttpCall from './useAuthHttpCall';

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

export default useNews;
