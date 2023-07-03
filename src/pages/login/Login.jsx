import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthentication } from '../../hooks/authApi';
import { useUser } from '../../context/UserContext';
import './Login.css';

function Login() {
  const [user] = useUser();
  const { login } = useAuthentication();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert(error);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} id="login">
      <label>
        <span>Email:</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
        />
      </label>
      <label>
        <span>Contraseña:</span>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button>Entrar</button>
      <p>
        Todavía no tienes cuenta?
        <Link to="/signup">Regístrate</Link>
      </p>
      <p>
        <Link to={'/'}>Go to Home</Link>
      </p>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </form>
  );
}

export default Login;
