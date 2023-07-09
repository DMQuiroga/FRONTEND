import { useState, useRef, useEffect } from 'react';

import CreateNews from '../../pages/createNews/CreateNews';
import './addNewsButton.css';
import { useDark } from '../../context/DarkContext';
function AddNewsButton() {
  const [show, setShow] = useState(true);
  const newsCreate = useRef(null);
  const [dark] = useDark();
  const closeNewsMenu =
    ((e) => {
      if (newsCreate.current && newsCreate.current.contains(e.target)) {
        return;
      } else {
        setShow(!show);
      }
    },
    [show]);
  useEffect(() => {
    if (newsCreate.current) {
      document.addEventListener('mousedown', closeNewsMenu);
    } else {
      document.removeEventListener('mousedown', closeNewsMenu);
    }

    return () => {
      document.removeEventListener('mousedown', closeNewsMenu);
    };
  }, [closeNewsMenu]);

  const handleAddNewsButton = () => {
    setShow(!show);
  };

  return (
    <section className={`addbtncontainer ${dark}`}>
      <div
        onClick={handleAddNewsButton}
        className={`addbutton" ${show ? 'show' : 'hide'}`}
      >
        +
      </div>
      {!show && (
        <section ref={newsCreate} className="color-change-2x">
          <CreateNews show={show} setShow={setShow} />
        </section>
      )}
    </section>
  );
}

export default AddNewsButton;
