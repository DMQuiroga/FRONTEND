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
  const [imagenUrl, setImagenUrl] = useState('');

  // const imagenUrl = image && BACKEND_URL + '/' + URL.createObjectURL(image);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (title && introText && text && categoryId)
      try {
        await post('/news', {
          categoryId,
          title,
          introText,
          text,
          imagenUrl,
        });
        console.log(imagenUrl);
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
          required
          name="select"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled selected>
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
          onChange={(e) => setImagenUrl(e.target.files[0])}
        />
      </label>
      <button>Crear noticia</button>
    </form>
  );
}

export default CreateNews;
