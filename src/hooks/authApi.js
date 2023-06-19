//import useFetch from 'fetch-suspense';
import { useUser } from '../context/UserContext';
import useAuthHttpCall from './useAuthHttpCall';

//export const useQuestions = () => useFetch('https://overflow.anxoso.com/questions')
//export const useQuestion = (id) => useFetch(`https://overflow.anxoso.com/questions/${id}`)

// ---
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

// ---

// export function useQAActions() {
//   const fetchPost = useFetchPost();

//   const sendQuestion = (title, question) =>
//     fetchPost('https://overflow.anxoso.com/questions', { title, question });

//   const sendAnswer = (id, answer) =>
//     fetchPost(`https://overflow.anxoso.com/questions/${id}/answer`, { answer });

//   return { sendQuestion, sendAnswer };
// }
