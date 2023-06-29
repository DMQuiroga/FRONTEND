import { useEffect, useState } from 'react';
import './SearchCategory.css';
import useAuthHttpCall from '../../../hooks/useAuthHttpCall';
import NewsCard from '../../NewsCard';

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
  const { get } = useAuthHttpCall();

  useEffect(() => {
    if (selectedCategory == null) return;

    const fetchNews = async () => {
      try {
        const data = await get(`/category-news/${selectedCategory}`);
        setNews(data.data);
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

      {!news || news.length === 0 ? (
        <p>No se encontraron noticias.</p>
      ) : (
        <ul className="noticia">
          {news.map((noticia) => (
            <li className="newscard" key={noticia.id}>
              <NewsCard noticia={noticia} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SearchCategory;
