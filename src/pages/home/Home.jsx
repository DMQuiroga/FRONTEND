//import { Navigate } from 'react-router-dom';
//import { useUser } from '../../context/UserContext';
import { useState } from 'react';
import { useNews } from '../../hooks/newsApi';
import './Home.css';

function Home() {
  const { loadTodayNews } = useNews();

  const [news, setNews] = useState('');

  try {
    loadTodayNews(setNews);
  } catch (error) {
    alert(error);
    setNews();
  }

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
