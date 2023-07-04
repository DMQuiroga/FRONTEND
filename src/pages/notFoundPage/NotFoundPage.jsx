import { Link } from 'react-router-dom';

// GESTIÓN DE RUTA NO ENCONTRADA

function NotFoundPage() {
  return (
    <section>
      <h1>Not found</h1>
      <Link to={'/'}>Go to Home</Link>
    </section>
  );
}

export default NotFoundPage;
