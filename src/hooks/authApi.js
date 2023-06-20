import { useUser } from '../context/UserContext';
import useAuthHttpCall from './useAuthHttpCall';

const BACKEND_URL = 'http://localhost:8080';

export function useAuthentication() {
  const { post } = useAuthHttpCall();
  const [, setUser] = useUser();

  const login = (email, password) =>
    post(BACKEND_URL + '/login', { email, password }).then((response) =>
      setUser(response.data)
    );

  const signup = (name, surname, email, password) =>
    post(BACKEND_URL + '/user', {
      name,
      surname,
      email,
      password,
    });

  const logout = () => setUser();

  return { signup, login, logout };
}
