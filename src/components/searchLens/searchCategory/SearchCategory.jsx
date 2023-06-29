import { useEffect, useState } from 'react';
import './SearchCategory.css';
import Scorer from '../../Scorer';

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
        let url = BACKEND_URL;
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
        <ul className="noticia">
          {news.map((noticia) => (
            <li className="newscard" key={noticia.id}>
              <h2 className="newstitle">{noticia.title}</h2>
              <h4 className="introtext">{noticia.introText} </h4>
              <p className="text">{noticia.text}</p>
              {noticia.imagenUrl && !noticia.imagenUrl.startsWith('http') ? (
                <img
                  className="imagen"
                  src={`${BACKEND_URL}/uploads/${noticia.imagenUrl}`}
                  alt={noticia.title}
                />
              ) : noticia.imagenUrl && noticia.imagenUrl.startsWith('http') ? (
                <img
                  className="imagen"
                  src={noticia.imagenUrl}
                  alt={noticia.title}
                />
              ) : null}
              <div className="scorer">
                <Scorer className="score" initial={noticia.score} />
              </div>
              <p className="date">
                Fecha de publicación:{' '}
                {new Date(noticia.publishDate).toLocaleDateString('es-ES')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SearchCategory;
