import { useState } from 'react';
import NewsVisor from '../../components/NewsVisor';
import SearchCategory from '../../components/searchCategory/SearchCategory';
import { NEWS_CATEGORIES } from '../../config';
import './Home.css';

// VISUALIZAR DEL <Outlet /> de </main>
// 1. TODAS LAS NOTICIAS POR CATEGORIAS ORDENADAS POR FECHA
// 2. NOTICIAS DEL DÍA ORDENADAS POR PUNTUACIÓN

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
