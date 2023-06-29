import { useState } from 'react';
import NewsVisor from '../../components/NewsVisor';
import SearchCategory from '../../components/searchCategory/SearchCategory';
import useNews from '../../hooks/newsApi';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const news = useNews(selectedCategory);

  return (
    <>
      <SearchCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <h1>
        Mostrando noticias de {selectedCategory ? selectedCategory : 'Hoy'}
      </h1>
      <NewsVisor news={news} />
    </>
  );
}

export default Home;
