import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthHttpCall from '../hooks/useAuthHttpCall';
import Swal from 'sweetalert2';

function EditNews({ noticia, show, setShow }) {
  const [user] = useUser();
  const { put } = useAuthHttpCall();
  const [, setLoading] = useState(false);
  const [title, setTitle] = useState(noticia.noticia.title);
  const [introText, setIntrotext] = useState(noticia.noticia.introText);
  const [text, setText] = useState(noticia.noticia.text);
  const [categoryId, setCategoryId] = useState(noticia.noticia.categoryId);
  const [image, setImage] = useState(null);
  const [navigate, setNavigate] = useState(false); // Nuevo estado para la navegación

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('introText', introText);
    data.append('text', text);
    data.append('categoryId', categoryId);
    data.append('ImagenUrl', image);
    data.append(`newsId`, noticia.noticia.id);

    try {
      await put(`/edit`, data, user);
      setTitle(``);
      setIntrotext(``);
      setText(``);
      setCategoryId(``);
      setImage(null);
      setLoading(false);
      setShow(!show);
      setNavigate(true); // Establece el estado navigate en true después de que la petición se haya completado
    } catch (error) {
      Swal.fire({
        title: 'HB News',
        text: error,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Cerrar',
      });
    } finally {
      // setForm(false);
    }
  };

  if (navigate) {
    return <Navigate to="/route-to-navigate-to" replace />; // Cambia "/route-to-navigate-to" por la ruta a la que quieres navegar
  }

  return (
    <form
      onSubmit={handleEdit}
      className={`editnewscontainer color-change-2x `}
      id="editnews"
    >
      <h2 className="newnewstittle">Nueva noticia</h2>
      <label>
        <h3 className="newnewstittle">Titulo</h3>
        <textarea
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          required
          rows="1"
          cols="30"
        />
      </label>
      <label>
        <h3 className="newnewstittle">Introduccion</h3>
        <textarea
          className="input"
          value={introText}
          onChange={(e) => setIntrotext(e.target.value)}
          name="introText"
          required
          rows="2"
          cols="30"
        />
      </label>
      <label>
        <h3 className="newnewstittle">Texto</h3>
        <textarea
          className="input input-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          required
          rows="8"
          cols="30"
        />
      </label>
      <label>
        <h3 className="newnewstittle">Categoria</h3>
        <select
          className="input"
          defaultValue={categoryId}
          required
          name="select"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled>
            Elige categoria...
          </option>
          <option value="1">Actualidad </option>
          <option value="2">Sanidad </option>
          <option value="3">Naturaleza </option>
          <option value="4">Ciencia y tecnología </option>
          <option value="5">Economía y negocios</option>
          <option value="6">Deportes </option>
          <option value="7">Entretenimiento </option>
          <option value="8">Psicología </option>
          <option value="9">Estilo de vida </option>
        </select>
      </label>

      <label>
        <h3 className="newnewstittle">Imagen</h3>
        <input
          className="inputfile"
          name="file"
          type="file"
          onChange={(e) => {
            console.log(e.target.files);
            setImage(e.target.files[0]);
          }}
        />
      </label>
      <button className="crearbtn">Confirmar ✔️</button>
    </form>
  );
}

export default EditNews;
