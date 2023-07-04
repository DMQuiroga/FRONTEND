import { NEWS_CATEGORIES } from '../../config';
import './SearchCategory.css';

// SELECIONAR CATEGORIA DE NOTICIAS

function SearchCategory({ selectedCategory, setSelectedCategory }) {
  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  const selectedStyle = (index) => {
    if (index === selectedCategory - 1) return 'active animated';
    return 'animated';
  };

  return (
    <>
      <div className="category-dropdown">
        <div className="category-menu">
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
