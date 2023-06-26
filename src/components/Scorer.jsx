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
