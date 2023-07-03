import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useVote } from '../hooks/newsApi';

function Scorer({ initial, newsId }) {
  const [valor, setValor] = useState(initial);
  const [user] = useUser();
  const vote = useVote(newsId);

  const handleIncrement = async () => {
    if (user) {
      setValor(valor + 1);
      await vote(newsId, 'likesss');
    }
  };

  const handleDecrement = async () => {
    if (user) {
      setValor(valor - 1);
      await vote(newsId, 'dislikesss');
    }
  };

  return (
    <div className="scorer">
      {user && (
        <>
          <button onClick={handleDecrement}>☠️</button>
          <span> Puntuación: {valor} </span>
          <button onClick={handleIncrement}>❤️</button>
        </>
      )}
      {!user && (
        <>
          <span>Puntuación noticia: {valor}</span>
        </>
      )}
    </div>
  );
}

export default Scorer;
