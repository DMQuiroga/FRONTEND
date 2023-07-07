import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

function UserNews() {
  const [news, setNews] = useState([]);
  const [user] = useUser();

  const getUserNewsById = async (userId) => {
    try {
      // Realizar la llamada al backend para obtener las noticias por ID de usuario
      const response = await fetch(`/news/${userId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchUserNews = async () => {
      if (user) {
        const userNews = await getUserNewsById(user.id);
        setNews(userNews);
      }
    };

    fetchUserNews();
  }, [user]);

  return (
    <>
      {news.length === 0 ? (
        <p>No se encontraron noticias</p>
      ) : (
        <ul className="noticia">
          {news.map((noticia) => (
            <li key={noticia.id}>{noticia.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default UserNews;
