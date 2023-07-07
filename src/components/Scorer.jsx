import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useVote } from '../hooks/newsApi';
import Swal from 'sweetalert2';

// COMPONENTE PUNTUACIÓN DE NOTICIA

function Scorer({ initial, newsId }) {
  const [valor, setValor] = useState(initial);
  const [user] = useUser();
  const voteLike = useVote(newsId, 'like');
  const voteDislike = useVote(newsId, 'dislike');

  const handleLike = () => {
    handleVoteCall('like');
  };
  const handleDislike = () => {
    handleVoteCall('dislike');
  };
  const handleVoteCall = async (voteType) => {
    if (user) {
      try {
        if (voteType === 'like') {
          await voteLike();
          setValor(valor + 1);
        } else {
          await voteDislike();
          setValor(valor - 1);
        }
      } catch (e) {
        Swal.fire({
          title: 'HB News',
          text: e,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  return (
    <div className="scorer">
      {user && (
        <>
          <button onClick={handleDislike}>☠️</button>
          <span> Puntuación: {valor} </span>
          <button onClick={handleLike}>❤️</button>
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
