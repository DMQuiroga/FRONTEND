import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useVoteFake } from '../hooks/newsApi';

// COMPONENTE PUNTUACIÓN DE NOTICIA FAKE, VOTOS INFINITOS +1 o +100

function ScorerFake({ initial, newsId }) {
  const [valor, setValor] = useState(initial);
  const [user] = useUser();
  const voteFake = useVoteFake(newsId);

  const handleVoteCall = async (amount) => {
    if (user) {
      try {
        await voteFake(amount);
        setValor(valor + amount);
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <div className="scorerfake">
      {user && (
        <>
          <button onClick={() => handleVoteCall(1)}>+1</button>
          <span> FAKE NEW: {valor} </span>
          <button onClick={() => handleVoteCall(100)}>+100</button>
        </>
      )}
      {!user && (
        <>
          <span>FAKE NEW: {valor}</span>
        </>
      )}
    </div>
  );
}

export default ScorerFake;
