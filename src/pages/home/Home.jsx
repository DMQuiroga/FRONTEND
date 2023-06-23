import { useEffect, useState } from 'react';
import './Home.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const categories = [
  'Actualidad',
  'Sanidad',
  'Naturaleza',
  'Ciencia y tecnología',
  'Economía y negocios',
  'Deportes',
  'Entretenimiento',
  'Psicología',
  'Estilo de vida',
];

function Home() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const [news, setNews] = useState('');

  try {
    loadTodayNews(setNews);
  } catch (error) {
    alert(error);
    setNews();
  }

        const response = await fetch(url);
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
  }, [selectedCategory]);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <section>
      {/* {news?.map((n) => (
        <div key={n.id}>n.title</div>
      ))} */}
      {JSON.stringify(news)}
    </section>
  );
}

export default Home;
