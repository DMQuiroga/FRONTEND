import { useEffect, useState } from 'react';
import useAuthHttpCall from './useAuthHttpCall';

// OBTENER LA INFORMACIÓN DEL USUARIO QUE ESTÁ LOGUEADO
function useUserMe() {
  const [userMe, setUserMe] = useState([]);
  const { get, put } = useAuthHttpCall();

  useEffect(() => {
    const fetchUserMe = async () => {
      const url = '/user';
      const data = await get(url);
      console.log(data);
      setUserMe(data.data);
    };

    fetchUserMe();
  }, []);

  const updateUser = async (updatedUserData) => {
    console.log(userMe.id);
    try {
      const url = '/user';
      const updatedUser = await put(url, {
        userId: userMe.id,

        ...updatedUserData,
      });
      setUserMe(updatedUser);
      console.log('Usuario actualizado:', updatedUser);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return { userMe, updateUser };
}

export default useUserMe;
