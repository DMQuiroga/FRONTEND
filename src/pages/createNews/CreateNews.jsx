// import { useState } from 'react';

// import useAuthHttpCall from '../../hooks/useAuthHttpCall';

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// console.log(BACKEND_URL);

// function CreateNews() {
//   const { post } = useAuthHttpCall();
//   const [, setLoading] = useState(false);

//   const [title, setTitle] = useState('');
//   const [introText, setIntrotext] = useState('');
//   const [text, setText] = useState('');
//   const [category, setCategory] = useState('');
//   const [imageUrl, setImageUrl] = useState('');

//   const handleSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();

//     if (title && introText && text && category)
//       try {
//         await post(BACKEND_URL + '/news', {
//           title,
//           introText,
//           text,
//           category,
//           imageUrl,
//         });
//       } catch (error) {
//         alert(error);
//       } finally {
//         setLoading(false);
//       }
//   };
//   return (
//     <form onSubmit={handleSubmit} id="createnews">
//       <label>
//         <span>Titulo</span>
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           name="title"
//           required
//         />
//       </label>
//       <label>
//         <span>Introduccion</span>
//         <input
//           value={introText}
//           onChange={(e) => setIntrotext(e.target.value)}
//           name="introText"
//           required
//         />
//       </label>
//       <label>
//         <span>Texto</span>
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           name="text"
//           required
//         />
//       </label>
//       <label>
//         <span>Categoria</span>
//         <input
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           name="category"
//           required
//         />
//       </label>

//       <label>
//         <span>Imagen</span>
//         <input
//           name="imageUrl"
//           type="file"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//         />
//       </label>
//       <button>Crear noticia</button>
//     </form>
//   );
// }

// export default CreateNews;
