import { useState } from 'react';
import './Acordeon.css';

function Acordeon({ title, children, current }) {
  const [show, setShow] = useState(false);

  return (
    <div className={`acordeon ${show ? 'show' : 'hide'}`}>
      <button onClick={() => setShow(!show)}>
        {title} ({current})
      </button>
      {show && <div className="acordeon-body">{children}</div>}
    </div>
  );
}

export default Acordeon;
