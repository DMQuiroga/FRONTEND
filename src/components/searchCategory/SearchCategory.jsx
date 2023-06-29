import { useState } from 'react';
import { NEWS_CATEGORIES } from '../../config';

function SearchCategory({ selectedCategory, setSelectedCategory }) {
  const [showCategories, setShowCategories] = useState(false);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const selectedStyle = (index) => {
    if (index === selectedCategory - 1) return 'active';
    return '';
  };

  return (
    <>
      <div className="category-dropdown">
        <button onClick={toggleCategories}>Categorías</button>
        {showCategories && (
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
        )}
      </div>
    </>
  );
}

export default SearchCategory;
