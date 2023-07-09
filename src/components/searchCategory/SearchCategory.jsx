import { NEWS_CATEGORIES } from '../../config';
import { useDark } from '../../context/DarkContext';
import './SearchCategory.css';

// SELECIONAR CATEGORIA DE NOTICIAS

function SearchCategory({ selectedCategory, setSelectedCategory }) {
  const selectCategory = (category) => {
    setSelectedCategory(category);
  };
  const [dark] = useDark();
  const selectedStyle = (index) => {
    if (index === selectedCategory - 1) return `active animated ${dark}`;
    return `animated ${dark}`;
  };

  return (
    <>
      <div className={`category-dropdown ${dark}`}>
        <div className={`category-menu ${dark}`}>
          {NEWS_CATEGORIES.map((category, index) => (
            <button
              key={index}
              className={selectedStyle(index)}
              onClick={() => selectCategory(index + 1)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchCategory;
