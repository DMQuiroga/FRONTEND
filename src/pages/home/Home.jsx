import { useState } from 'react';
import NewsVisor from '../../components/NewsVisor';
import SearchCategory from '../../components/searchCategory/SearchCategory';
import { NEWS_CATEGORIES } from '../../config';
import './Home.css';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <SearchCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <h1 className="titulonoticias">
        Mostrando noticias de{' '}
        {selectedCategory ? NEWS_CATEGORIES[selectedCategory - 1] : 'Hoy'}
      </h1>
      <NewsVisor selectedCategory={selectedCategory} />
    </>
  );
}

export default Home;
