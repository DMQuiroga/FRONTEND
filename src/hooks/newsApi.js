//import { useUser } from '../context/UserContext';
import useAuthHttpCall from './useAuthHttpCall';

const BACKEND_URL = 'http://localhost:8080';

export function useNews() {
  const { get } = useAuthHttpCall();

  const loadTodayNews = (callback) => {
    console.log('API CALL');
    get(BACKEND_URL + '/today-news').then((response) => callback(response));
  };

  return { loadTodayNews };
}
