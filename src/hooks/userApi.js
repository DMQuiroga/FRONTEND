import { useEffect, useState } from 'react';
import useAuthHttpCall from './useAuthHttpCall';

// OBTENER LA INFORMACIÓN DEL USUARIO QUE ESTA LOGUEADO
export function useUserMe() {
  const [UserMe, setUserMe] = useState([]);
  const { get } = useAuthHttpCall();

  useEffect(() => {
    const fetchUserMe = async () => {
      const url = '/user';
      const data = await get(url);
      setUserMe(data.data);
    };

    fetchUserMe();
  }, []);

  return UserMe;
}

export default useUserMe;
