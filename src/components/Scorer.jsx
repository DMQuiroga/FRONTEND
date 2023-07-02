import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useVoteLike, useVoteDislike } from '../hooks/newsApi';

function Scorer({ initial, newsId }) {
  const [valor, setValor] = useState(initial);
  const [user] = useUser();
  const voteLike = useVoteLike(newsId);
  const voteDislike = useVoteDislike(newsId);

  const handleIncrement = async () => {
    if (user) {
      setValor(valor + 1);
      await voteLike();
    }
  };

  const handleDecrement = async () => {
    if (user) {
      setValor(valor - 1);
      await voteDislike(newsId);
    }
  };

  return (
    <div className="scorer">
      {user && (
        <>
          <button onClick={handleDecrement}>☠️Dislike</button>
          <span> Puntuación: {valor} </span>
          <button onClick={handleIncrement}>Like❤️</button>
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
