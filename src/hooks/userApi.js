import { useEffect, useState } from 'react';
import useAuthHttpCall from './useAuthHttpCall';
// OBTENER LA INFORMACIÓN DEL USUARIO QUE ESTA LOGUEADO
export function useUserMe() {
  const [UserMe, setUserMe] = useState([]);
  const { get } = useAuthHttpCall();

  useEffect(() => {
    const fetchUserMe = async () => {
      try {
        const url = '/user';
        const data = await get(url);
        setUserMe(data.data);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchUserMe();
  });

  return UserMe;
}

export default useUserMe;
