import { useState, useRef, useEffect } from 'react';

import CreateNews from '../../pages/createNews/CreateNews';
import './addNewsButton.css';
import { useDark } from '../../context/DarkContext';
function AddNewsButton() {
  const [show, setShow] = useState(true);
  //   const [form, setForm] = useState(false);
  const newsCreate = useRef(null);
  const [dark] = useDark();
  const closeNewsMenu = (e) => {
    if (newsCreate.current.contains(e.target)) {
      return;
    } else setShow(!show);
  };
  useEffect(() => {
    if (newsCreate) {
      document.addEventListener('mousedown', closeNewsMenu);
    } else {
      document.removeEventListener('mousedown', closeNewsMenu);
    }

    return () => {
      document.removeEventListener('mousedown', closeNewsMenu);
    };
  }, [show]);

  const handleAddNewsButton = () => {
    setShow(!show);
    // setForm(!form);
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
