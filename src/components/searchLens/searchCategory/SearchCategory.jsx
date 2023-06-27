import { useEffect, useState } from 'react';
import './SearchCategory.css';

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

function SearchCategory() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = BACKEND_URL + '/today-news';
        if (selectedCategory) {
          url = `${BACKEND_URL}/category-news/${selectedCategory}`;
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
    <>
      <div className="category-dropdown">
        <button onClick={toggleCategories}>Categorías</button>
        {showCategories && (
          <div className="category-menu">
            {categories.map((category, index) => (
              <button key={index} onClick={() => selectCategory(index + 1)}>
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

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

export default SearchCategory;
