import { useUser } from '../context/UserContext';
import useAuthHttpCall from './useAuthHttpCall';

export function useAuthentication() {
  const { post } = useAuthHttpCall();
  const [, setUser] = useUser();

  const login = (email, password) =>
    post('/login', { email, password }).then((response) =>
      setUser(response.data)
    );

  const signup = (name, surname, email, password) =>
    post('/user', {
      name,
      surname,
      email,
      password,
    });

  const logout = () => setUser();

  return { signup, login, logout };
}
