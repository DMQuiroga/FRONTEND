import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthHttpCall from '../../hooks/useAuthHttpCall';
// import { useHistory } from "react-router";
// import { BACKEND_URL } from '../../config';

function CreateNews({ show, setShow }) {
  const { post } = useAuthHttpCall();
  const [, setLoading] = useState(false);

  const navigate = useNavigate();
  // const history = useHistory();

  const [title, setTitle] = useState('');
  const [introText, setIntrotext] = useState('');
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('introText', introText);
    data.append('text', text);
    data.append('categoryId', categoryId);
    data.append('ImagenUrl', image);

    try {
      await post('/news', data);
      setTitle(``);
      setIntrotext(``);
      setText(``);
      setCategoryId(``);
      setImage(null);
      setLoading(false);
      setShow(!show);
      navigate(0);
      // if (res.ok) {
      //   const body = await res.json();
      //   history.push(`/app/experience/${body.id}`);
      // }
    } catch (error) {
      alert(error);
    } finally {
      // setForm(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`createnewscontainer color-change-2x `}
      id="createnews"
    >
      <h2 className="newnewstittle">Nueva noticia</h2>
      <label>
        <h3 className="newnewstittle">Titulo</h3>
        <input
          className="imput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          required
        />
      </label>
      <label>
        <h3 className="newnewstittle">Introduccion</h3>
        <input
          className="imput"
          value={introText}
          onChange={(e) => setIntrotext(e.target.value)}
          name="introText"
          required
        />
      </label>
      <label>
        <h3 className="newnewstittle">Texto</h3>
        <input
          className="imput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          required
        />
      </label>
      <label>
        <h3 className="newnewstittle">Categoria</h3>
        <select
          className="imput"
          defaultValue={``}
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
          className="imputfile"
          name="file"
          type="file"
          onChange={(e) => {
            console.log(e.target.files);
            setImage(e.target.files[0]);
          }}
        />
      </label>
      <button className="crearbtn">Crear noticia</button>
    </form>
  );
}

export default CreateNews;
