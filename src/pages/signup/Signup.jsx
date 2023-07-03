import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../hooks/authApi';
import { useUser } from '../../context/UserContext';
import './Signup.css';

function Signup() {
  const [user] = useUser();
  const { signup } = useAuthentication();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [terms, setTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await signup(name, surname, email, password);
      alert('Usuario registrado correctamente');
      navigate('/login');
    } catch (error) {
      alert(error);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} id="signup">
      <label>
        <span>Nombre:</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          required
        />
      </label>
      <label>
        <span>Apellidos:</span>
        <input
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          name="surname"
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          required
        />
      </label>
      <label>
        <span>Contraseña:</span>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <label>
        <span>= Contraseña:</span>
        <input
          name="password-repeat"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
      </label>

      <label>
        <input
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          type="checkbox"
          required
        />
        Acepto los términos y condiciones
      </label>
      <button>Registro</button>

      <p>
        ¿Ya estás registrado?
        <Link to="/login">Inicia sesión</Link>
      </p>
      <p>
        <Link to={'/'}>Go to Home</Link>
      </p>
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div>
    </form>
  );
}

export default Signup;
