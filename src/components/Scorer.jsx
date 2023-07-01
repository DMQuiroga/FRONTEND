import { useState } from 'react';

function Scorer({ initial = 0 }) {
  const [valor, setValor] = useState(initial);

  return (
    <div className="scorer">
      <button onClick={() => valor > 0 && setValor(valor - 1)}>-</button>
      <span>{valor}</span>
      <button onClick={() => setValor(valor + 1)}>+</button>
    </div>
  );
}

export default Scorer;

/*
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useVoteLike, useVoteDislike } from '../hooks/newsApi';

function Scorer({ initial = 0, newsId }) {
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
          <button onClick={handleDecrement}>☠️dislike</button>
          <span>{valor}</span>
          <button onClick={handleIncrement}>❤️like</button>
        </>
      )}
      {!user && (
        <>
          <span>Puntuación: {valor}</span>
        </>
      )}
    </div>
  );
}

export default Scorer;
*/
