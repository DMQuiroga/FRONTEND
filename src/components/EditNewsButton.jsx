import { useState, useRef, useEffect } from 'react';
// import { useUser } from '../../context/UserContext';
import { useDark } from '../context/DarkContext';
import { useNews } from '../hooks/newsApi';
import EditNews from './EditNews';

function EditNewsButton(noticia) {
  const { news } = useNews;
  const [show, setShow] = useState(true);
  const newsEdit = useRef(null);
  const [dark] = useDark(); // const [user] = useUser();
  const closeNewsMenu = (e) => {
    if (newsEdit.current.contains(e.target)) {
      return;
    } else setShow(!show);
  };
  useEffect(() => {
    if (newsEdit) {
      document.addEventListener('mousedown', closeNewsMenu);
    } else {
      document.removeEventListener('mousedown', closeNewsMenu);
    }

    return () => {
      document.removeEventListener('mousedown', closeNewsMenu);
    };
  }, [show]);

  const handleEditNewsButton = () => {
    setShow(!show);
    // setForm(!form);
  };
  return (
    <section id="editbtncontainer" className={`editbtncontainer ${dark}`}>
      <div
        onClick={handleEditNewsButton}
        className={`editbutton" ${show ? 'show' : 'hide'}`}
      >
        Editar
      </div>
      {!show && (
        <section
          ref={newsEdit}
          id="newseditor"
          className="newseditor color-change-2x"
        >
          <EditNews noticia={noticia} show={show} setShow={setShow} />
        </section>
      )}
    </section>
  );
}
export default EditNewsButton;
