import { useState } from 'react';

import useAuthHttpCall from '../../hooks/useAuthHttpCall';
// import { BACKEND_URL } from '../../config';

function CreateNews() {
  const { post } = useAuthHttpCall();
  const [, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [introText, setIntrotext] = useState('');
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);

  // const imagenUrl = image && BACKEND_URL + '/' + URL.createObjectURL(image);

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
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="createnews">
      <label>
        <span>Titulo</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          required
        />
      </label>
      <label>
        <span>Introduccion</span>
        <input
          value={introText}
          onChange={(e) => setIntrotext(e.target.value)}
          name="introText"
          required
        />
      </label>
      <label>
        <span>Texto</span>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          required
        />
      </label>
      <label>
        <span>Categoria</span>
        <select
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
        <span>Imagen</span>
        <input
          name="file"
          type="file"
          onChange={(e) => {
            console.log(e.target.files);
            setImage(e.target.files[0]);
          }}
        />
      </label>
      <button>Crear noticia</button>
    </form>
  );
}

export default CreateNews;
