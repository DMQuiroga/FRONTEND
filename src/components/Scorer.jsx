import { useState } from 'react';
import { useUser } from '../context/UserContext';

/* 
1- FRONTEND: 
            Coger del contexto el usuario y si no tengo usuario es decir no estoy logueado entonces 
            los botones de votar negativamente y positivamente no los muestro. Solo muestro el 
            numero de votaciones.
2- FRONTEND: Guardar el voto
      Usar nuestro post de hooks/useAuthHttpCall --- Para
      NewsApi.jsx => crear una nueva funcion que sea votar
      No crear dos, es la misma y pasarle por parametro que sea un +1 o un -1
      Volvemos al componente y hacer que se haga esa llamada al pulsar el botón.
3- BACKEND: Guardar de alguna forma que el usuario a votado a la noticia 55. Hacer más adelante.

*/

function Scorer({ initial = 0 }) {
  const [valor, setValor] = useState(initial);
  const [user] = useUser();

  const handleIncrement = () => {
    if (user) {
      setValor(valor + 1);
    }
  };

  const handleDecrement = () => {
    if (user && valor > 0) {
      setValor(valor - 1);
    }
  };

  return (
    <div className="scorer">
      {user && (
        <>
          <button onClick={handleDecrement}>☠️</button>
          <span>{valor}</span>
          <button onClick={handleIncrement}>❤️</button>
        </>
      )}
    </div>
  );
}

export default Scorer;
